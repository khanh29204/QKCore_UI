# Components Guide

*Đọc bằng [Tiếng Việt](COMPONENTS.vi.md)*

This document provides an in-depth look at all the UI components exported by `QKCore-ui`.

---

## 1. InputView
A highly animated text input supporting floating labels, multi-variant borders, and custom icons.

**Props:**
- `variant` (`'outlined' | 'filled' | 'underline'`): Determines the container style. Default is `outlined`.
- `label` (`string`): The text that floats to the top when focused or when text is entered.
- `activeColor` (`string`): Color of the label and border when focused. Overrides `primaryColor`.
- `idleColor` (`string`): Color of the label and border when unfocused. Default is `#999`.
- `textColor` (`string`): Color of the entered text. Default is `#000000`.
- `primaryColor` (`string`): Fallback active color.
- `backgroundColor` (`string`): Background color of the floating label to match your app's background.
- `fillColor` (`string`): Background color for the `filled` variant.
- `iconCancelSource` (`any`): Image source for the clear (X) icon (only appears when text exists).
- `iconEyeSource` / `iconEyeHideSource` (`any`): Image sources for the password visibility toggle (used if `secureTextEntry` is true).
- `onFocus` (`(focus: boolean) => void`): Callback triggered on focus state changes.
- Inherits all standard `TextInputProps` (e.g. `onChangeText`, `value`, `secureTextEntry`).

---

## 2. Dialog
A fully animated, gesture-driven modal component using Reanimated and Worklets. Native haptic feedback is integrated natively.

**Props:**
- `visible` (`boolean`): Controls whether the dialog is shown.
- `onDismiss` (`() => void`): Callback triggered when the backdrop is pressed, or when dismissed via swipe gesture.
- `position` (`'bottom' | 'top' | 'left' | 'right' | 'center'`): Where the dialog originates and rests. Center position uses a scale animation; others use a slide (translation) animation.
- `disableDrag` (`boolean`): If true, prevents dismissing the dialog via swipe gesture.
- `dismissThreshold` (`number`): The fraction of the dialog's size that must be dragged to trigger a dismiss (Default `0.3`).
- `dismissVelocity` (`number`): The velocity threshold for a flick to dismiss (Default `800`).
- `backdropColor` (`string`): Color of the backdrop (Default `#000`).
- `backdropOpacity` (`number`): Opacity of the backdrop (Default `0.5`).
- `disableHaptic` (`boolean`): Set to `true` to disable haptic feedback when the dialog enters.
- `hapticType` (`HapticType`): Type of haptic to trigger on enter. Default is `'impactLight'`.
- `contentStyle` (`StyleProp<ViewStyle>`): Custom style for the inner container.

---

## 3. Button
An interactive button with a scale-down animation on press and native haptic integration.

**Props:**
- `label` (`string`): Text displayed.
- `variant` (`'solid' | 'outline' | 'ghost'`): Button style variant.
- `loading` (`boolean`): Shows an `ActivityIndicator` and disables the button.
- `primaryColor` (`string`): Used as the background for `solid`, and border/text for `outline`/`ghost`.
- `onPrimaryColor` (`string`): Text color for `solid` variant.
- `disableHaptic` (`boolean`): Disables the `impactLight` on tap and `impactHeavy` on long press.
- `labelStyle` (`TextStyle`): Style for the inner text.
- Inherits all `TouchableOpacityProps`.

---

## 4. Slider
A continuous slider component built entirely with Reanimated and Gesture Handler for 60fps performance.

**Props:**
- `value` (`number`): Current value.
- `min` / `max` (`number`): Boundaries. Defaults are `0` and `100`.
- `step` (`number`): Snaps the value to multiples of `step`. Defaults to `0` (continuous).
- `onChange` (`(value: number) => void`): Triggers constantly while dragging.
- `onChangeEnd` (`(value: number) => void`): Triggers when the user releases the thumb.
- `trackColor` (`string`): Inactive track color.
- `fillColor` (`string`): Active track (filled) color.
- `thumbColor` (`string`): Color of the draggable thumb.
- `thumbSize` (`number`): Diameter of the thumb.
- `trackHeight` (`number`): Thickness of the track.
- `disabled` (`boolean`): Disables interaction and reduces opacity.

---

## 5. Progressbar
Provides both `ProgressLinear` and `ProgressCircular` components. Smoothly animates value changes.

**LinearProgressProps (`ProgressLinear`):**
- `value` (`number`): `0-100`.
- `direction` (`'horizontal' | 'vertical'`).
- `notSmooth` (`boolean`): Disables the spring animation when value changes.
- `color` / `trackColor` (`string`): Fill and background colors.
- `thickness` (`number`): Thickness of the bar.
- `length` (`number | string`): Total length (width if horizontal, height if vertical).
- `label` (`'inside' | 'outside' | 'none'`): Where to render the percentage text.

**CircularProgressProps (`ProgressCircular`):**
- `value` (`number`): `0-100`.
- `radius` (`number`): Radius of the circle.
- `strokeWidth` (`number`): Thickness of the circular stroke.
- `color` / `trackColor` (`string`).
- `label` (`'inside' | 'outside' | 'none'`).

---

## 6. Switch
An animated boolean toggle switch.

**Props:**
- `value` (`boolean`): Current state.
- `onValueChange` (`(value: boolean) => void`): Callback.
- `onColor` / `offColor` (`string`): Track colors.
- `disabled` (`boolean`).

---

## 7. Avatar
A rounded image component powered by `@d11/react-native-fast-image`.

**Props:**
- `source` (`Source | ImageRequireSource`): Image source.
- `size` (`number`): Automatically applies to both `width` and `height`, and applies a full border radius.
- `onPress` (`() => void`): If provided, the Avatar is wrapped in a `TouchableOpacity`.

---

## 8. Badge
A small UI element typically used for notification counts.

**Props:**
- `label` (`string` | `number`).
- `textColor` (`string`).
- `backgroundColor` (`ColorValue`).

---

## 9. TouchableOpacity
A custom touchable wrapper that provides a subtle scale animation on press and integrates native haptics.

**Props:**
- `disableHaptic` (`boolean`): Disables `impactLight` on tap.
- `center` (`boolean`): Automatically applies `alignItems: 'center'` and `justifyContent: 'center'`.
- Inherits `TouchableOpacityProps`.
