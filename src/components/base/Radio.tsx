import React, { createContext, useContext } from 'react';

import { StyleSheet, TextStyle } from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Text from '../base/Text';
import TouchableOpacity from '../base/TouchableOpacity';
import { useQKTheme } from '../../provider/QKProvider';


// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonProps extends RadioOption {
  /** Override context selection — dùng khi RadioButton nằm ngoài RadioGroup */
  selected?: boolean;
  color?: string;
  labelStyle?: TextStyle;
}

export interface RadioGroupProps {
  value?: string;
  onChange: (value: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: TextStyle;
  children: React.ReactNode;
}

interface RadioContextValue {
  selected: string | undefined;
  activeColor: string;
  inactiveColor: string;
  onSelect: (value: string) => void;
  labelStyle?: TextStyle;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RadioContext = createContext<RadioContextValue>({
  selected: undefined,
  activeColor: '#4A90E2',
  inactiveColor: '#C4C4C4',
  onSelect: () => {},
});

// ─── Constants ────────────────────────────────────────────────────────────────

const OUTER_SIZE = 20;
const INNER_SIZE = 10;
const SPRING = { damping: 18, stiffness: 280, mass: 0.6 };

// ─── RadioButton ──────────────────────────────────────────────────────────────

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  disabled = false,
  selected: selectedProp,
  color,
  labelStyle: labelStyleProp,
}) => {
  const { selected, activeColor, inactiveColor, onSelect, labelStyle } =
    useContext(RadioContext);

  const resolvedActive = color ?? activeColor;
  const resolvedLabelStyle = labelStyleProp ?? labelStyle;
  const isSelected =
    selectedProp !== undefined ? selectedProp : selected === value;
  const progress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    progress.set(withSpring(isSelected ? 1 : 0, SPRING));
  }, [isSelected, progress]);

  const outerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveColor, resolvedActive],
    ),
    borderWidth: interpolate(progress.value, [0, 1], [1.5, 2]),
  }));

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [0, 1]) }],
    opacity: progress.value,
  }));

  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled && !isSelected) onSelect(value);
      }}
      disabled={disabled}
      style={[styles.row, disabled && styles.rowDisabled]}>
      {/* Outer circle */}
      <Animated.View style={[styles.outer, outerStyle]}>
        {/* Inner dot */}
        <Animated.View
          style={[
            styles.inner,
            { backgroundColor: resolvedActive },
            innerStyle,
          ]}
        />
      </Animated.View>

      {/* Label */}
      <Text style={[styles.label, resolvedLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  activeColor,
  inactiveColor,
  labelStyle,
  children,
}) => {
  const theme = useQKTheme();
  const resolvedActiveColor = activeColor ?? theme.activeColor;
  const resolvedInactiveColor = inactiveColor ?? theme.inactiveColor;

  return (
    <RadioContext.Provider
      value={{
        selected: value,
        activeColor: resolvedActiveColor,
        inactiveColor: resolvedInactiveColor,
        onSelect: onChange,
        labelStyle,
      }}>
      {children}
    </RadioContext.Provider>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  inner: {
    borderRadius: INNER_SIZE / 2,
    height: INNER_SIZE,
    width: INNER_SIZE,
  },
  label: {
    color: '#111',
    fontSize: 15,
  },
  outer: {
    alignItems: 'center',
    borderRadius: OUTER_SIZE / 2,
    height: OUTER_SIZE,
    justifyContent: 'center',
    width: OUTER_SIZE,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  rowDisabled: {
    opacity: 0.4,
  },
});
