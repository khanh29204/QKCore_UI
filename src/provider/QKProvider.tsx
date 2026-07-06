import React, { createContext, useContext } from 'react';

export interface QKTheme {
  palette: {
    primary: string;
    onPrimary: string;
    background: string;
    [key: string]: string;
  };
  gradient?: string[];
  backgroundImage?: {
    src: string;
    blur?: number;
  };
  [key: string]: any;
}

export interface QKAssets {
  ic_cancel?: any;
  ic_eye?: any;
  ic_eye_hide?: any;
  [key: string]: any;
}

export interface QKColors {
  text: string;
  background: string;
  primary: string;
  white: string;
  [key: string]: string;
}

export interface QKCoreConfig {
  theme: QKTheme;
  assets: QKAssets;
  colors: QKColors;
  hapticFeedback?: (type: 'tap' | 'heavy' | 'light' | string) => void;
}

const defaultConfig: QKCoreConfig = {
  theme: {
    palette: {
      primary: '#000000',
      onPrimary: '#FFFFFF',
      background: '#FFFFFF',
    },
  },
  assets: {},
  colors: {
    text: '#000000',
    background: '#FFFFFF',
    primary: '#000000',
    white: '#FFFFFF',
  },
  hapticFeedback: () => {},
};

const QKCoreContext = createContext<QKCoreConfig>(defaultConfig);

export const useQKCore = () => useContext(QKCoreContext);

export const QKProvider: React.FC<{
  config: Partial<QKCoreConfig>;
  children: React.ReactNode;
}> = ({ config, children }) => {
  return (
    <QKCoreContext.Provider value={{ ...defaultConfig, ...config }}>
      {children}
    </QKCoreContext.Provider>
  );
};
