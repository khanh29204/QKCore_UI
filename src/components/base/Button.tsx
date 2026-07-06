import React from 'react';

import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


import Text from './Text';
import View from './View';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useQKTheme } from '../../provider/QKProvider';

import { baseStyle } from '../../styles/base.style';
import { gapStyle } from '../../styles/gap.style';
import { paddingStyle } from '../../styles/padding.style';
import { radiusStyle } from '../../styles/radius.style';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

export interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  variant?: ButtonVariant;
  loading?: boolean;
  backgroundColor?: string;
  color?: string;
  labelStyle?: TextStyle;
  children?: React.ReactNode;
  primaryColor?: string;
  onPrimaryColor?: string;
  disableHaptic?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// const PRESS_IN_CONFIG = { damping: 100, stiffness: 1000, mass: 0.5 };
// const PRESS_OUT_CONFIG = { damping: 6, stiffness: 120, mass: 1 };

const PRESS_IN_CONFIG = { duration: 100 };
const PRESS_OUT_CONFIG = { duration: 100 };

// ─── Component ────────────────────────────────────────────────────────────────

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'solid',
  loading = false,
  backgroundColor,
  color,
  style,
  labelStyle,
  children,
  primaryColor,
  onPrimaryColor,
  disableHaptic = false,
  ...props
}) => {
  const theme = useQKTheme();
  const resolvedPrimaryColor = primaryColor ?? theme.primaryColor;
  const resolvedOnPrimaryColor = onPrimaryColor ?? theme.onPrimaryColor;

  const isDisabled = props.disabled || loading;
  const scale = useSharedValue(1);

  // ── Derived styles theo variant ──────────────────────────────────────────

  const containerVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'solid':
        return { backgroundColor: backgroundColor ?? resolvedPrimaryColor };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: backgroundColor ?? resolvedPrimaryColor,
        };
      case 'ghost':
        return { backgroundColor: 'transparent' };
    }
  };

  const resolvedTextColor = (): string => {
    if (color) return color;
    switch (variant) {
      case 'solid':
        return resolvedOnPrimaryColor;
      case 'outline':
      case 'ghost':
        return backgroundColor ?? resolvedPrimaryColor;
    }
  };

  // ── Animation ────────────────────────────────────────────────────────────

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePressIn = () => {
    if (isDisabled) return;
    scale.set(withTiming(0.96, PRESS_IN_CONFIG));
  };

  const handlePressOut = () => {
    scale.set(withTiming(1, PRESS_OUT_CONFIG));
  };

  const _onPress = (event: GestureResponderEvent) => {
    if (!disableHaptic) {
      RNReactNativeHapticFeedback.trigger('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
    props.onPress?.(event);
  };

  const _onLongPress = (event: GestureResponderEvent) => {
    if (!disableHaptic) {
      RNReactNativeHapticFeedback.trigger('impactHeavy', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
    props.onLongPress?.(event);
  };

  // ── Content ──────────────────────────────────────────────────────────────

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' ? '#fff' : backgroundColor}
        />
      );
    }

    // Có children → render trực tiếp (icon hoặc custom), ẩn label
    if (children) {
      return children;
    }

    return (
      <Text
        style={[styles.label, { color: resolvedTextColor() }, labelStyle]}
        numberOfLines={1}>
        {label}
      </Text>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        {...props}
        activeOpacity={1}
        onPress={props.onPress ? _onPress : undefined}
        onLongPress={props.onLongPress ? _onLongPress : undefined}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[
          styles.base,
          { backgroundColor: resolvedPrimaryColor },
          baseStyle.center,
          radiusStyle.full,
          paddingStyle.h[20],
          paddingStyle.v[12],
          containerVariantStyle(),
          isDisabled && styles.disabled,
          style,
        ]}>
        <View row style={[baseStyle.center, gapStyle[8]]}>
          {renderContent()}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    minWidth: 80,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default Button;
