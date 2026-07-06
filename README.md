# QKCore-ui

A standalone, framework-agnostic React Native UI library extracted for modularity and performance.

## Installation

You can install this library locally in your project:
```bash
yarn add file:../QKCore-ui
# OR
npm install ../QKCore-ui
```

## Setup

This library requires a `QKProvider` to inject your app's specific `theme`, `colors`, `assets`, and `hapticFeedback` methods. Wrap your application's root component with it.

```tsx
import React from 'react';
import { QKProvider } from 'qkcore-ui';
import { hapticFeedback } from './src/utils/device/haptic';
import Colors from './src/config/colors';
import Assets from './src/config/assets';

// Inside your root app component:
export default function App() {
  const currentTheme = {
    palette: {
      primary: '#000000',
      onPrimary: '#FFFFFF',
      background: '#FFFFFF',
    }
    // ... any other theme configs
  };

  return (
    <QKProvider 
      config={{
        theme: currentTheme,
        colors: Colors,
        assets: Assets,
        hapticFeedback: hapticFeedback,
      }}
    >
      <YourAppContent />
    </QKProvider>
  );
}
```

## Usage

Import components directly from the library:

```tsx
import { Button, InputView, Dialog } from 'qkcore-ui';

<Button label="Submit" onPress={() => console.log('Pressed')} />
```

## Dependencies
Ensure your project has the following peer dependencies installed:
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-svg`
- `react-native-worklets`
- `@d11/react-native-fast-image`
