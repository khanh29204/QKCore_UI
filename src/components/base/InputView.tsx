import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from './Icon';
import { useQKCore } from '../../provider/QKProvider';
import { baseStyle } from '../../styles/base.style';
import { paddingStyle } from '../../styles/padding.style';
import { borderStyle, radiusStyle } from '../../styles/radius.style';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputVariant = 'outlined' | 'filled' | 'underline';

export interface InputViewProps extends Omit<TextInputProps, 'onFocus'> {
  label?: string;
  variant?: InputVariant;
  /** Màu active (focus + label nổi) */
  activeColor?: string;
  /** Màu idle */
  idleColor?: string;
  /** Màu text */
  textColor?: string;
  /** Màu nền (chỉ dùng cho filled) */
  fillColor?: string;
  containerStyle?: ViewStyle;
  onFocus?: (focus: boolean) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIMING = { duration: 180 };

const LABEL_IDLE_SIZE = 15;
const LABEL_FLOAT_SIZE = 12;

const LABEL_IDLE_Y = 0;
const LABEL_FLOAT_Y = -22;

// ─── Component ────────────────────────────────────────────────────────────────

const InputView = forwardRef<TextInput, InputViewProps>(
  (
    {
      label,
      variant = 'outlined',
      activeColor,
      idleColor = '#999',
      textColor,
      fillColor = 'transparent',
      containerStyle,
      secureTextEntry,
      onFocus,
      onChangeText,
      value,
      ...props
    },
    ref,
  ) => {
    const { theme, colors, assets } = useQKCore();
    const current = theme;
    const resolvedTextColor = textColor ?? colors.text;

    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState(value ?? '');
    const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);

    const isPassword = secureTextEntry === true;
    const hasText = text.length > 0;
    const isFloating = isFocused || hasText;

    const floatAnim = useSharedValue(isFloating ? 1 : 0);
    const focusAnim = useSharedValue(0);

    // ── Handlers ──────────────────────────────────────────────────────────

    const handleFocus: TextInputProps['onFocus'] = useCallback(() => {
      setIsFocused(true);
      floatAnim.set(withTiming(1, TIMING));
      focusAnim.set(withTiming(1, TIMING));
      onFocus?.(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onFocus]);

    const handleBlur: TextInputProps['onBlur'] = useCallback(() => {
      setIsFocused(false);
      focusAnim.set(withTiming(0, TIMING));
      if (!hasText) {
        floatAnim.set(withTiming(0, TIMING));
      }
      onFocus?.(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasText, onFocus]);

    const handleChangeText = useCallback(
      (t: string) => {
        setText(t);
        if (t.length > 0) {
          floatAnim.set(withTiming(1, TIMING));
        } else if (!isFocused) {
          floatAnim.set(withTiming(0, TIMING));
        }
        onChangeText?.(t);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isFocused, onChangeText],
    );

    const handleClear = useCallback(() => {
      setText('');
      // Dùng ref được forward từ ngoài nếu có
      if (typeof ref === 'object' && ref?.current) {
        ref.current.clear();
      }
      onChangeText?.('');
      if (!isFocused) {
        floatAnim.set(withTiming(0, TIMING));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused, onChangeText, ref]);

    const focusInput = useCallback(() => {
      if (typeof ref === 'object' && ref?.current) {
        ref.current.focus();
      }
    }, [ref]);

    // ── Animated styles ────────────────────────────────────────────────────

    const labelStyle = useAnimatedStyle(() => ({
      fontSize: interpolate(
        floatAnim.get(),
        [0, 1],
        [LABEL_IDLE_SIZE, LABEL_FLOAT_SIZE],
      ),
      transform: [
        {
          translateY: interpolate(
            floatAnim.get(),
            [0, 1],
            [LABEL_IDLE_Y, LABEL_FLOAT_Y],
          ),
        },
      ],
      color: interpolateColor(
        focusAnim.get(),
        [0, 1],
        [idleColor, activeColor ?? current.palette.primary],
      ),
    }));

    const borderAnimStyle = useAnimatedStyle(() => {
      const borderColor = interpolateColor(
        focusAnim.get(),
        [0, 1],
        [idleColor, activeColor ?? current.palette.primary],
      );

      if (variant === 'outlined') {
        return {
          borderColor,
          borderWidth: interpolate(focusAnim.get(), [0, 1], [1, 1.8]),
        };
      }
      return {
        borderBottomColor: borderColor,
        borderBottomWidth: interpolate(focusAnim.get(), [0, 1], [1, 2]),
      };
    });

    const notchStyle = useAnimatedStyle(() => ({
      opacity: floatAnim.get(),
    }));

    // ── Container style theo variant ───────────────────────────────────────

    const variantContainerStyle = useMemo(() => {
      const style = {
        outlined: styles.outlinedContainer,
        filled: { ...styles.filledContainer, backgroundColor: fillColor },
        underline: styles.underlineContainer,
      };
      return style;
    }, [fillColor]);

    // ── Icons ──────────────────────────────────────────────────────────────

    const renderRightIcons = useCallback(() => {
      const icons: React.ReactNode[] = [];

      if (hasText) {
        icons.push(
          <Pressable
            key="clear"
            onPress={handleClear}
            style={styles.iconBtn}
            hitSlop={8}>
            <Icon source={assets.ic_cancel} size={18} tintColor={idleColor} />
          </Pressable>,
        );
      }

      if (isPassword) {
        icons.push(
          <Pressable
            key="eye"
            onPress={() => setIsSecure(prev => !prev)}
            style={styles.iconBtn}
            hitSlop={8}>
            <Icon
              source={isSecure ? assets.ic_eye : assets.ic_eye_hide}
              size={18}
              tintColor={idleColor}
            />
          </Pressable>,
        );
      }

      if (icons.length === 0) return true;
      return <View style={styles.rightIcons}>{icons}</View>;
    }, [handleClear, hasText, idleColor, isPassword, isSecure]);

    // ── Render ─────────────────────────────────────────────────────────────

    return (
      <View style={[styles.wrapper, containerStyle]}>
        <Pressable onPress={focusInput} style={paddingStyle.v[10]}>
          <Animated.View
            style={[
              styles.container,
              variantContainerStyle[variant],
              borderAnimStyle,
            ]}>
            {(label || props.placeholder) && (
              <>
                {variant === 'outlined' && (
                  <Animated.View style={[styles.notch, notchStyle]} />
                )}
                <Animated.Text
                  style={[
                    styles.label,
                    baseStyle.center,
                    labelStyle,
                    radiusStyle[8],
                    (hasText || isFocused) && {
                      backgroundColor: current.palette.background,
                    },
                    (isFocused || hasText) && borderStyle.s1,
                    hasText && { borderColor: idleColor },
                    isFocused && { borderColor: current.palette.primary },
                  ]}
                  numberOfLines={1}>
                  {label || props.placeholder}
                </Animated.Text>
              </>
            )}

            <View style={styles.inputRow}>
              <TextInput
                ref={ref}
                style={[styles.font, styles.input, { color: resolvedTextColor }]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                value={text}
                secureTextEntry={isSecure}
                placeholderTextColor={idleColor}
                {...props}
                placeholder=""
              />
              {renderRightIcons()}
            </View>
          </Animated.View>
        </Pressable>
      </View>
    );
  },
);

InputView.displayName = 'InputView';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: 'relative',
  },
  filledContainer: {
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  font: {
    fontFamily: 'proxima_soft_bold',
  },
  iconBtn: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    minHeight: 24,
    paddingVertical: 0,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    left: 14,
    paddingHorizontal: 2,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
  },
  notch: {
    // backgroundColor: '#fff',
    height: 3,
    left: 10,
    position: 'absolute',
    top: -1,
    width: 60,
    zIndex: 0,
  },
  outlinedContainer: {
    borderRadius: 99,
    borderWidth: 1,
  },
  rightIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginLeft: 4,
  },
  underlineContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  wrapper: {
    width: '100%',
  },
});

export default InputView;
