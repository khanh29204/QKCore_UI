import React from 'react';

import {
  ColorValue,
  DimensionValue,
  GestureResponderEvent,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { baseStyle } from '../../styles/base.style';
import { useQKCore } from '../../provider/QKProvider';

// ─── Constants ────────────────────────────────────────────────────────────────

// const PRESS_IN_CONFIG = { damping: 100, stiffness: 1000, mass: 0.5 };
// const PRESS_OUT_CONFIG = { damping: 6, stiffness: 120, mass: 1 };
const PRESS_IN_CONFIG = { duration: 100 };
const PRESS_OUT_CONFIG = { duration: 100 };

// ─── Component ────────────────────────────────────────────────────────────────
type Props = TouchableOpacityProps & {
  backgroundColor?: ColorValue;
  center?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
};

const TouchableOpacity: React.FC<Props> = ({
  children,
  center = false,
  ...props
}) => {
  const { hapticFeedback } = useQKCore();
  const isDisabled = props.disabled;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePressIn = (event: GestureResponderEvent) => {
    if (isDisabled) return;
    scale.set(withTiming(0.94, PRESS_IN_CONFIG));
    props?.onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.set(withTiming(1, PRESS_OUT_CONFIG));
    props?.onPressOut?.(event);
  };

  const _onPress = (event: GestureResponderEvent) => {
    if (isDisabled) return;
    hapticFeedback?.('tap');
    props.onPress?.(event);
  };

  const _onLongPress = (event: GestureResponderEvent) => {
    if (isDisabled) return;
    hapticFeedback?.('heavy');
    props.onLongPress?.(event);
  };

  return (
    <Animated.View style={animatedStyle}>
      <RNTouchableOpacity
        {...props}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          center && baseStyle.center,
          { backgroundColor: props.backgroundColor },
          { width: props.width },
          { height: props.height },
          { ...props.style },
        ]}
        onPress={_onPress}
        onLongPress={_onLongPress}>
        {children}
      </RNTouchableOpacity>
    </Animated.View>
  );
};

export default TouchableOpacity;
