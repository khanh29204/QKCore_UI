import React, { createContext, useContext, useState, ReactNode } from "react";
import { HapticProvider } from "./HapticProvider";

export interface QKTheme {
  primaryColor: string;
  onPrimaryColor: string;
  activeColor: string;
  inactiveColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily?: string;
}

export const defaultQKTheme: QKTheme = {
  primaryColor: "#000000",
  onPrimaryColor: "#FFFFFF",
  activeColor: "#4A90E2",
  inactiveColor: "#C4C4C4",
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  fontFamily: undefined,
};

const QKThemeContext = createContext<{
  theme: QKTheme;
  setTheme: (theme: Partial<QKTheme>) => void;
}>({
  theme: defaultQKTheme,
  setTheme: () => {},
});

export interface QKProviderProps {
  theme?: Partial<QKTheme>;
  hapticEnabled?: boolean;
  children: ReactNode;
}

export const QKProvider: React.FC<QKProviderProps> = ({
  theme,
  hapticEnabled = true,
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<QKTheme>({
    ...defaultQKTheme,
    ...theme,
  });

  const setTheme = (newTheme: Partial<QKTheme>) => {
    setCurrentTheme((prev) => ({ ...prev, ...newTheme }));
  };

  return (
    <HapticProvider defaultEnabled={hapticEnabled}>
      <QKThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
        {children}
      </QKThemeContext.Provider>
    </HapticProvider>
  );
};

export const useQKTheme = () => useContext(QKThemeContext).theme;
export const useSetQKTheme = () => useContext(QKThemeContext).setTheme;
