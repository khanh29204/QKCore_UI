# QKCore-ui

*Đọc bằng [Tiếng Việt](README.vi.md)*

A standalone, framework-agnostic React Native UI library extracted for modularity, performance, and a premium haptic feel.

## Installation

```bash
# If using npm
npm install https://github.com/khanh2924/QKCore_UI.git

# If using yarn
yarn add https://github.com/khanh2924/QKCore_UI.git
```

## Setup

This library requires no extra setup or Provider wrappers! All components are designed to accept style properties (like colors or assets) directly via plain React props, maximizing modularity and keeping the dependency footprint minimal. Haptic feedback is integrated natively.

---

## Documentation

For a comprehensive guide on all available properties and utilities, please refer to the detailed documentation files:

- 📘 [**Components Guide**](./docs/COMPONENTS.md): Detailed props, variants, and behaviors for `Button`, `Dialog`, `InputView`, `Slider`, `Progressbar`, and more.
- 🎨 [**Utility Styles Guide**](./docs/STYLES.md): How to use `baseStyle`, `paddingStyle`, `marginStyle`, `radiusStyle`, and other pre-defined CSS-like style objects for rapid UI layout.

---

## Dependencies
Ensure your project has the following peer dependencies installed:
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-svg`
- `react-native-worklets`
- `@d11/react-native-fast-image`
- `react-native-haptic-feedback`
