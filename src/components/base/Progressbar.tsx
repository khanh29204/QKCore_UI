import React, { useEffect } from "react";

import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import Text from "./Text";
import View from "./View";
import { baseStyle } from "../../styles/base.style";
import { marginStyle } from "../../styles/margin.style";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressBarDirection = "horizontal" | "vertical";
export type ProgressLabelPosition = "inside" | "outside" | "none";

export interface LinearProgressProps {
  /** 0–100 */
  value: number;
  direction?: ProgressBarDirection;
  /** Tắt animation khi value thay đổi */
  notSmooth?: boolean;
  /** Màu thanh progress */
  color?: string;
  /** Màu nền track */
  trackColor?: string;
  /** Chiều dày track (height nếu horizontal, width nếu vertical) */
  thickness?: number;
  /** Chiều dài track (width nếu horizontal, height nếu vertical) */
  length?: number | string;
  label?: ProgressLabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export interface CircularProgressProps {
  /** 0–100 */
  value: number;
  /** Tắt animation khi value thay đổi */
  notSmooth?: boolean;
  /** Màu vòng progress */
  color?: string;
  /** Màu nền track */
  trackColor?: string;
  /** Radius vòng tròn */
  radius?: number;
  /** Độ dày stroke */
  strokeWidth?: number;
  label?: ProgressLabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SPRING_CONFIG = {
  damping: 22,
  stiffness: 180,
  mass: 0.7,
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Linear Progress ──────────────────────────────────────────────────────────

export const ProgressLinear: React.FC<LinearProgressProps> = ({
  value,
  direction = "horizontal",
  notSmooth = false,
  color = "#4A90E2",
  trackColor = "#E0E0E0",
  thickness = 8,
  length,
  label = "none",
  labelStyle,
  style,
}) => {
  const isHorizontal = direction === "horizontal";
  const progress = useSharedValue(0);

  useEffect(() => {
    const clamped = Math.min(100, Math.max(0, value));
    if (notSmooth) {
      progress.value = clamped;
    } else {
      progress.value = withSpring(clamped, SPRING_CONFIG);
    }
  }, [value, notSmooth, progress]);

  // Fill bar animate theo đúng trục
  const fillStyle = useAnimatedStyle(() => {
    if (isHorizontal) {
      return {
        width: `${progress.value}%` as any,
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      };
    }
    return {
      height: `${progress.value}%` as any,
      width: "100%",
      position: "absolute",
      bottom: 0,
      left: 0,
    };
  });

  const trackStyle: ViewStyle = isHorizontal
    ? {
        width: (length as DimensionValue) ?? "100%",
        height: thickness,
        backgroundColor: trackColor,
        borderRadius: thickness / 2,
        overflow: "hidden",
      }
    : {
        height: (length as DimensionValue) ?? 200,
        width: thickness,
        backgroundColor: trackColor,
        borderRadius: thickness / 2,
        overflow: "hidden",
      };

  const fillColor: ViewStyle = {
    backgroundColor: color,
    borderRadius: thickness / 2,
  };

  const percentText = `${Math.round(value)}%`;

  return (
    <View row={isHorizontal} style={[baseStyle.center, style]}>
      {/* Label outside – trước track */}
      {label === "outside" && (
        <Text
          style={[
            styles.labelOutside,
            isHorizontal ? marginStyle.r[8] : marginStyle.b[8],
            labelStyle,
          ]}
        >
          {percentText}
        </Text>
      )}

      {/* Track */}
      <View style={trackStyle}>
        <Animated.View style={[fillColor, fillStyle]} />

        {/* Label inside */}
        {label === "inside" && (
          <View
            style={[StyleSheet.absoluteFill, baseStyle.center]}
            pointerEvents="none"
          >
            <Text style={[styles.labelInsideText, labelStyle]}>
              {percentText}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// ─── Circular Progress ────────────────────────────────────────────────────────

export const ProgressCircular: React.FC<CircularProgressProps> = ({
  value,
  notSmooth = false,
  color = "#4A90E2",
  trackColor = "#E0E0E0",
  radius = 48,
  strokeWidth = 8,
  label = "none",
  labelStyle,
  style,
}) => {
  const progress = useSharedValue(0);
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const size = radius * 2;

  useEffect(() => {
    const clamped = Math.min(100, Math.max(0, value));
    if (notSmooth) {
      progress.value = clamped;
    } else {
      progress.value = withSpring(clamped, SPRING_CONFIG);
    }
  }, [value, notSmooth, progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (progress.value / 100) * circumference;
    return { strokeDashoffset };
  });

  return (
    <View style={[styles.circularWrapper, style]}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress – bắt đầu từ 12 giờ */}
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>

      {/* Label */}
      {label !== "none" && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View flex center>
            <Text style={[styles.circularLabelText, labelStyle]}>
              {`${Math.round(value)}%`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  circularLabelText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "700",
  },
  circularWrapper: {
    position: "relative",
  },
  labelInsideText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  labelOutside: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
});
