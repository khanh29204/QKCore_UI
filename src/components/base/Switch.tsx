import React, { useEffect } from 'react';

import { Pressable, StyleSheet } from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useQKTheme } from '../../provider/QKProvider';


// ─── Types ────────────────────────────────────────────────────────────────────

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onColor?: string;
  offColor?: string;
  disabled?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRACK_W = 50;
const TRACK_H = 28;
const THUMB_SIZE = 22;
const THUMB_PADDING = (TRACK_H - THUMB_SIZE) / 2;
const THUMB_ON = TRACK_W - THUMB_SIZE - THUMB_PADDING;
const THUMB_OFF = THUMB_PADDING;

const SPRING = { damping: 18, stiffness: 280, mass: 0.6 };

// ─── Component ────────────────────────────────────────────────────────────────

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  onColor,
  offColor,
  disabled = false,
}) => {
  const theme = useQKTheme();
  const resolvedOnColor = onColor ?? theme.activeColor;
  const resolvedOffColor = offColor ?? theme.inactiveColor;

  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.set(withSpring(value ? 1 : 0, SPRING));
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [resolvedOffColor, resolvedOnColor],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [THUMB_OFF, THUMB_ON]),
      },
    ],
    // Thumb nhỏ lại khi đang kéo — pill effect
    width: THUMB_SIZE,
  }));

  return (
    <Pressable
      onPress={() => {
        if (!disabled) onValueChange(!value);
      }}
      disabled={disabled}
      style={disabled ? styles.opacity_disabled : styles.opacity_enabled}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  opacity_disabled: {
    opacity: 0.4,
  },
  opacity_enabled: {
    opacity: 1,
  },
  thumb: {
    backgroundColor: '#fff',
    borderRadius: THUMB_SIZE / 2,
    elevation: 3,
    height: THUMB_SIZE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  track: {
    borderRadius: TRACK_H / 2,
    height: TRACK_H,
    justifyContent: 'center',
    width: TRACK_W,
  },
});
