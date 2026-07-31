import React, { createContext, useContext } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Text from "../base/Text";
import TouchableOpacity from "../base/TouchableOpacity";
import { useQKTheme } from "../../provider/QKProvider";
import { baseStyle } from "../../styles/base.style";
import { gapStyle } from "../../styles/gap.style";
import { paddingStyle } from "../../styles/padding.style";
import { radiusStyle } from "../../styles/radius.style";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioLabelPosition = "right" | "left" | "top" | "bottom";
export type RadioGroupDirection = "row" | "column";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonProps extends RadioOption {
  /** Override context selection — dùng khi RadioButton nằm ngoài RadioGroup */
  selected?: boolean;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
  labelPosition?: RadioLabelPosition;
  style?: StyleProp<ViewStyle>;
  radioStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  numberOfLines?: number;
}

export interface RadioGroupProps {
  value?: string;
  onChange: (value: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  labelPosition?: RadioLabelPosition;
  direction?: RadioGroupDirection;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

interface RadioContextValue {
  selected: string | undefined;
  activeColor: string;
  inactiveColor: string;
  onSelect: (value: string) => void;
  labelStyle?: StyleProp<TextStyle>;
  labelPosition?: RadioLabelPosition;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RadioContext = createContext<RadioContextValue>({
  selected: undefined,
  activeColor: "#4A90E2",
  inactiveColor: "#C4C4C4",
  onSelect: () => {},
});

// ─── Constants ────────────────────────────────────────────────────────────────

const OUTER_SIZE = 20;
const INNER_SIZE = 10;
const SPRING = { damping: 18, stiffness: 280, mass: 0.6 };

// ─── Helper ───────────────────────────────────────────────────────────────────

const getContainerFlexStyle = (position: RadioLabelPosition) => {
  switch (position) {
    case "left":
      return [styles.containerCommon, styles.rowReverse, gapStyle[10]];
    case "top":
      return [styles.containerCommon, styles.columnReverse, gapStyle[6]];
    case "bottom":
      return [styles.containerCommon, styles.column, gapStyle[6]];
    case "right":
    default:
      return [styles.containerCommon, styles.row, gapStyle[10]];
  }
};

// ─── RadioButton ──────────────────────────────────────────────────────────────

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  disabled = false,
  selected: selectedProp,
  color,
  labelStyle: labelStyleProp,
  labelPosition: labelPositionProp,
  style,
  radioStyle,
  innerStyle: customInnerStyle,
  numberOfLines,
}) => {
  const {
    selected,
    activeColor,
    inactiveColor,
    onSelect,
    labelStyle: groupLabelStyle,
    labelPosition: groupLabelPosition,
  } = useContext(RadioContext);

  const resolvedActive = color ?? activeColor;
  const resolvedLabelStyle = labelStyleProp ?? groupLabelStyle;
  const resolvedLabelPosition =
    labelPositionProp ?? groupLabelPosition ?? "right";
  const isSelected =
    selectedProp !== undefined ? selectedProp : selected === value;
  const progress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    progress.set(withSpring(isSelected ? 1 : 0, SPRING));
  }, [isSelected, progress]);

  const outerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveColor, resolvedActive],
    ),
    borderWidth: interpolate(progress.value, [0, 1], [1.5, 2]),
  }));

  const innerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [0, 1]) }],
    opacity: progress.value,
  }));

  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled && !isSelected) onSelect(value);
      }}
      disabled={disabled}
      style={[
        getContainerFlexStyle(resolvedLabelPosition),
        disabled && styles.disabled,
        style,
      ]}
    >
      {/* Outer circle */}
      <Animated.View style={[styles.outer, outerAnimatedStyle, radioStyle]}>
        {/* Inner dot */}
        <Animated.View
          style={[
            styles.inner,
            { backgroundColor: resolvedActive },
            innerAnimatedStyle,
            customInnerStyle,
          ]}
        />
      </Animated.View>

      {/* Label */}
      <Text
        numberOfLines={numberOfLines}
        style={[styles.label, resolvedLabelStyle]}
      >
        {label}
      </Text>
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
  labelPosition,
  direction = "column",
  style,
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
        labelPosition,
      }}
    >
      <View
        style={[
          direction === "row"
            ? [styles.groupRow, gapStyle[16]]
            : [styles.groupColumn, gapStyle[12]],
          style,
        ]}
      >
        {children}
      </View>
    </RadioContext.Provider>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  containerCommon: {
    alignSelf: "flex-start",
    ...baseStyle.centerH,
    ...paddingStyle.v[4],
  },
  disabled: {
    opacity: 0.4,
  },
  groupColumn: {
    flexDirection: "column",
  },
  groupRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inner: {
    ...radiusStyle.full,
    height: INNER_SIZE,
    width: INNER_SIZE,
  },
  label: {
    ...baseStyle.flexS,
    color: "#111",
    fontSize: 15,
  },
  outer: {
    ...baseStyle.center,
    ...radiusStyle.full,
    height: OUTER_SIZE,
    width: OUTER_SIZE,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
