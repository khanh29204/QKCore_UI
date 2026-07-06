import React, { useCallback, useEffect } from 'react';

import { LayoutChangeEvent, StyleSheet, ViewStyle } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import View from './View';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  trackColor?: string;
  fillColor?: string;
  thumbColor?: string;
  thumbSize?: number;
  trackHeight?: number;
  disabled?: boolean;
  style?: ViewStyle;
  thumbStyle?: ViewStyle;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const THUMB_SPRING = { damping: 18, stiffness: 300, mass: 0.5 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function snapToStep(value: number, step: number): number {
  'worklet';
  if (step <= 0) return value;
  return Math.round(value / step) * step;
}

function toPercent(value: number, min: number, max: number): number {
  'worklet';
  return (value - min) / (max - min);
}

function fromPercent(percent: number, min: number, max: number): number {
  'worklet';
  return min + percent * (max - min);
}

// ─── Component ────────────────────────────────────────────────────────────────

const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 0,
  onChange,
  onChangeEnd,
  trackColor = '#E0E0E0',
  fillColor = '#4A90E2',
  thumbColor = '#fff',
  thumbSize = 22,
  trackHeight = 4,
  disabled = false,
  style,
  thumbStyle,
}) => {
  const trackWidth = useSharedValue(0);
  const thumbScale = useSharedValue(1);
  const percent = useSharedValue(toPercent(value, min, max));

  useEffect(() => {
    percent.set(toPercent(clamp(value, min, max), min, max));
  }, [value, min, max, percent]);

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidth.set(e.nativeEvent.layout.width);
    percent.set(toPercent(clamp(value, min, max), min, max));
  };

  // ── Gesture ────────────────────────────────────────────────────────────────

  const notifyChange = useCallback(
    (p: number) => {
      const raw = fromPercent(p, min, max);
      const snapped = step > 0 ? snapToStep(raw, step) : raw;
      const clamped = Math.round(clamp(snapped, min, max) * 1000) / 1000;
      onChange?.(clamped);
    },
    [min, max, step, onChange],
  );

  const notifyChangeEnd = useCallback(
    (p: number) => {
      const raw = fromPercent(p, min, max);
      const snapped = step > 0 ? snapToStep(raw, step) : raw;
      const clamped = Math.round(clamp(snapped, min, max) * 1000) / 1000;
      onChangeEnd?.(clamped);
    },
    [min, max, step, onChangeEnd],
  );

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .runOnJS(false)
    .onBegin(e => {
      const w = trackWidth.value;
      if (w <= 0) return;
      const p = clamp(e.x / w, 0, 1);
      percent.set(p);
      thumbScale.value = withSpring(1.2, THUMB_SPRING);
      scheduleOnRN(notifyChange, p);
    })
    .onUpdate(e => {
      const w = trackWidth.value;
      if (w <= 0) return;
      const p = clamp(e.x / w, 0, 1);
      if (percent.value === p) return;
      percent.set(p);
      scheduleOnRN(notifyChange, p);
    })
    .onEnd(e => {
      const w = trackWidth.value;
      const p = clamp(e.x / w, 0, 1);
      thumbScale.value = withSpring(1, THUMB_SPRING);
      scheduleOnRN(notifyChangeEnd, p);
    });

  // ── Animated styles ────────────────────────────────────────────────────────

  const fillStyle = useAnimatedStyle(() => ({
    width: `${percent.value * 100}%`,
  }));

  const localThumbStyle = useAnimatedStyle(() => ({
    left: percent.value * trackWidth.value - thumbSize / 2,
    transform: [{ scale: thumbScale.value }],
  }));

  // ── Render ─────────────────────────────────────────────────────────────────

  const hitSlop = { top: 12, bottom: 12 };

  // Các giá trị phụ thuộc vào props được tính toán tại đây để code trông gọn hơn
  const dynamicTrackStyle = {
    height: trackHeight,
    backgroundColor: trackColor,
    borderRadius: trackHeight / 2,
    opacity: disabled ? 0.4 : 1,
  };

  const dynamicFillStyle = {
    height: trackHeight,
    backgroundColor: fillColor,
    borderRadius: trackHeight / 2,
  };

  const dynamicThumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: thumbColor,
    top: -(thumbSize - trackHeight) / 2,
    borderColor: fillColor,
  };

  return (
    <View style={[styles.root, style]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={handleLayout}
          hitSlop={hitSlop}
          style={[styles.track, dynamicTrackStyle]}>
          {/* Fill */}
          <Animated.View style={[styles.fill, dynamicFillStyle, fillStyle]} />

          {/* Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              dynamicThumbStyle,
              localThumbStyle,
              thumbStyle,
            ]}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  fill: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  root: {
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  thumb: {
    borderWidth: 1.5,
    elevation: 4,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  track: {
    position: 'relative',
    width: '100%',
  },
});

export default Slider;
