import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Platform } from "react-native";
import ReactNativeHapticFeedback, {
  HapticOptions,
} from "react-native-haptic-feedback";

const options: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export type QKHapticType =
  "tap" | "tick" | "heavy" | "success" | "error" | "warning";

type NativeHapticType = Parameters<typeof ReactNativeHapticFeedback.trigger>[0];

const HAPTIC_MAP: Record<QKHapticType, NativeHapticType> = {
  tap: Platform.OS === "android" ? "effectClick" : "impactLight",
  tick: Platform.OS === "android" ? "effectTick" : "selection",
  heavy: Platform.OS === "android" ? "effectHeavyClick" : "impactHeavy",
  success: "notificationSuccess",
  error: "notificationError",
  warning: "notificationWarning",
};

export interface HapticContextType {
  isHapticEnabled: boolean;
  setHapticEnabled: (enabled: boolean) => void;
  hapticFeedback: (type?: QKHapticType) => void;
}

const HapticContext = createContext<HapticContextType | undefined>(undefined);

export interface HapticProviderProps {
  children: ReactNode;
  defaultEnabled?: boolean;
}

export const HapticProvider: React.FC<HapticProviderProps> = ({
  children,
  defaultEnabled = true,
}) => {
  const [isHapticEnabled, setHapticEnabled] = useState<boolean>(defaultEnabled);

  const hapticFeedback = useCallback(
    (type: QKHapticType = "tap") => {
      if (__DEV__) {
        console.log(
          `[Haptic] Triggering: ${type}, enabled: ${isHapticEnabled}`,
        );
      }

      if (!isHapticEnabled) return;

      const triggerType = HAPTIC_MAP[type] || HAPTIC_MAP.tap;
      ReactNativeHapticFeedback.trigger(triggerType, options);
    },
    [isHapticEnabled],
  );

  return (
    <HapticContext.Provider
      value={{
        isHapticEnabled,
        setHapticEnabled,
        hapticFeedback,
      }}
    >
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptic = () => {
  const context = useContext(HapticContext);
  if (context === undefined) {
    throw new Error("useHaptic must be used within a HapticProvider");
  }
  return context;
};
