# QKCore-ui

A standalone, framework-agnostic React Native UI library extracted for modularity and performance.

## Installation

You can install this library locally in your project:
```bash
# If using npm
npm install https://github.com/khanh2924/QKCore_UI.git

# If using yarn
yarn add https://github.com/khanh2924/QKCore_UI.git
```

## Setup

This library requires no extra setup or Provider wrappers! All components are designed to accept style properties (like colors or assets) directly via plain React props, maximizing modularity and keeping the dependency footprint minimal.

## Usage

Import components directly from the library and pass necessary props:

```tsx
import { Button, InputView, Dialog } from 'qkcore-ui';

// Example: Passing colors directly as props
<Button 
  label="Submit" 
  primaryColor="#007AFF"
  onPrimaryColor="#FFFFFF"
  onPress={() => console.log('Pressed')} 
/>

<InputView 
  placeholder="Username"
  primaryColor="#007AFF"
  iconCancelSource={require('./assets/ic_cancel.png')}
/>
```

## Dependencies
Ensure your project has the following peer dependencies installed:
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-svg`
- `react-native-worklets`
- `@d11/react-native-fast-image`
- `react-native-haptic-feedback`
