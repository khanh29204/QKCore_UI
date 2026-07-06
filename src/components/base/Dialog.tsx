import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Dimensions,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useHaptic, QKHapticType } from "../../provider/HapticProvider";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DialogPosition = "bottom" | "top" | "left" | "right" | "center";

export interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  position?: DialogPosition;
  disableDrag?: boolean;
  dismissThreshold?: number;
  dismissVelocity?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  hapticType?: QKHapticType;
  disableHaptic?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.8,
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

function getInitialTranslate(position: DialogPosition) {
  switch (position) {
    case "bottom":
      return { x: 0, y: SCREEN_H };
    case "top":
      return { x: 0, y: -SCREEN_H };
    case "left":
      return { x: -SCREEN_W, y: 0 };
    case "right":
      return { x: SCREEN_W, y: 0 };
    case "center":
      return { x: 0, y: 0 };
  }
}

function getDragAxis(position: DialogPosition) {
  switch (position) {
    case "bottom":
    case "top":
      return "y";
    case "left":
    case "right":
      return "x";
    case "center":
      return null;
  }
}

function getContainerStyle(position: DialogPosition): ViewStyle {
  const base: ViewStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  switch (position) {
    case "bottom":
      return { ...base, justifyContent: "flex-end", alignItems: "center" };
    case "top":
      return { ...base, justifyContent: "flex-start", alignItems: "center" };
    case "left":
      return { ...base, justifyContent: "center", alignItems: "flex-start" };
    case "right":
      return { ...base, justifyContent: "center", alignItems: "flex-end" };
    case "center":
      return { ...base, justifyContent: "center", alignItems: "center" };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

const Dialog: React.FC<DialogProps> = ({
  visible,
  onDismiss,
  position = "bottom",
  disableDrag = false,
  dismissThreshold = 0.3,
  dismissVelocity = 800,
  backdropColor = "#000",
  backdropOpacity = 0.5,
  contentStyle,
  children,
  hapticType = "tap",
  disableHaptic = false,
}) => {
  const { hapticFeedback } = useHaptic();
  // localVisible giữ Modal mount cho đến khi animation out kết thúc
  const [localVisible, setLocalVisible] = useState(visible);
  const isVisible = useRef(visible);

  const dialogWidth = useSharedValue(0);
  const dialogHeight = useSharedValue(0);

  const initial = useMemo(() => getInitialTranslate(position), [position]);

  const translateX = useSharedValue(initial.x);
  const translateY = useSharedValue(initial.y);
  const scale = useSharedValue(position === "center" ? 0.85 : 1);
  const backdropAnim = useSharedValue(0);
  const axis = useMemo(() => getDragAxis(position), [position]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const animateIn = useCallback(() => {
    backdropAnim.set(
      withTiming(1, { duration: 250 }, (finished?: boolean) => {
        if (finished && !disableHaptic) {
          scheduleOnRN(hapticFeedback, hapticType);
        }
      }),
    );
    if (position === "center") {
      scale.set(withSpring(1, SPRING_CONFIG));
    } else {
      translateX.set(withSpring(0, SPRING_CONFIG));
      translateY.set(withSpring(0, SPRING_CONFIG));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const animateOut = useCallback(
    (callback: () => void) => {
      backdropAnim.set(withTiming(0, { duration: 200 }));

      if (position === "center") {
        scale.set(
          withTiming(0.85, { duration: 200 }, (finished?: boolean) => {
            if (finished) scheduleOnRN(callback);
          }),
        );
      } else {
        const targetX = axis === "x" ? initial.x : 0;
        const targetY = axis === "y" ? initial.y : 0;

        if (axis === "x") {
          translateX.set(
            withTiming(targetX, { duration: 280 }, (finished?: boolean) => {
              if (finished) scheduleOnRN(callback);
            }),
          );
        } else {
          translateY.set(
            withTiming(targetY, { duration: 280 }, (finished?: boolean) => {
              if (finished) scheduleOnRN(callback);
            }),
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [position, axis, initial],
  );

  // ── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const run = () => {
      if (visible) {
        // Reset vị trí về trạng thái ẩn
        if (position === "center") {
          scale.set(0.85);
        } else {
          translateX.set(initial.x);
          translateY.set(initial.y);
        }
        backdropAnim.set(0);

        setLocalVisible(true);
        isVisible.current = true;
        requestAnimationFrame(() => animateIn());
      } else {
        if (isVisible.current) {
          isVisible.current = false;
          animateOut(() => {
            setLocalVisible(false);
          });
        }
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // ── Gesture ────────────────────────────────────────────────────────────────

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .enabled(!disableDrag && axis !== null)
      .activeOffsetX(axis === "x" ? [-10, 10] : [-9999, 9999])
      .activeOffsetY(axis === "y" ? [-10, 10] : [-9999, 9999])
      .runOnJS(true) // Giữ runOnJS(true) cho Pan vì bạn đang dùng nó để call onDismiss trực tiếp
      .onUpdate((e) => {
        const isForward =
          position === "bottom"
            ? e.translationY > 0
            : position === "top"
              ? e.translationY < 0
              : position === "left"
                ? e.translationX < 0
                : position === "right"
                  ? e.translationX > 0
                  : false;

        if (axis === "x") {
          translateX.set(isForward ? e.translationX : e.translationX * 0.15);
        } else if (axis === "y") {
          translateY.set(isForward ? e.translationY : e.translationY * 0.15);
        }
      })
      .onEnd((e) => {
        const isForward =
          position === "bottom"
            ? e.translationY > 0
            : position === "top"
              ? e.translationY < 0
              : position === "left"
                ? e.translationX < 0
                : position === "right"
                  ? e.translationX > 0
                  : false;

        const dimSize = axis === "x" ? dialogWidth.get() : dialogHeight.get();
        const translation = axis === "x" ? e.translationX : e.translationY;
        const velocity = axis === "x" ? e.velocityX : e.velocityY;

        const shouldDismiss =
          isForward &&
          (Math.abs(translation) > dimSize * dismissThreshold ||
            Math.abs(velocity) > dismissVelocity);

        if (shouldDismiss) {
          onDismiss();
        } else {
          if (axis === "x") {
            translateX.set(withSpring(0, SPRING_CONFIG));
          } else {
            translateY.set(withSpring(0, SPRING_CONFIG));
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableDrag, axis, position, onDismiss]);

  // ── Animated styles ────────────────────────────────────────────────────────

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(backdropAnim.value, [0, 1], [0, backdropOpacity]),
  }));

  const dialogStyle = useAnimatedStyle(() => {
    if (position === "center") {
      return {
        transform: [{ scale: scale.value }],
        opacity: interpolate(scale.value, [0.85, 1], [0, 1]),
      };
    }
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Modal
      transparent
      visible={localVisible}
      animationType="none"
      statusBarTranslucent={false}
      onRequestClose={onDismiss}
    >
      <GestureHandlerRootView style={StyleSheet.absoluteFill}>
        {/* Backdrop */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: backdropColor },
            backdropStyle,
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (isVisible.current) onDismiss();
            }}
          />
        </Animated.View>

        {/* Dialog container */}
        <Animated.View
          style={getContainerStyle(position)}
          pointerEvents="box-none"
        >
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[styles.dialog, contentStyle, dialogStyle]}
              onLayout={(e: any) => {
                dialogWidth.set(e.nativeEvent.layout.width);
                dialogHeight.set(e.nativeEvent.layout.height);
              }}
            >
              {children}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
    elevation: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
});

export default Dialog;
