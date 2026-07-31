# Hướng dẫn Components

_Read in [English](COMPONENTS.md)_

Tài liệu này đi sâu vào giải thích tất cả các component UI được export từ `QKCore-ui`.

---

## 1. InputView

Một input nhập chữ hỗ trợ animation rất mượt với nhãn nổi (floating label), đa dạng kiểu viền và tùy chỉnh icon dễ dàng.

**Props:**

- `variant` (`'outlined' | 'filled' | 'underline'`): Kiểu dáng của ô nhập liệu. Mặc định là `outlined`.
- `label` (`string`): Văn bản sẽ nổi lên trên khi input được focus hoặc khi có chữ.
- `activeColor` (`string`): Màu của nhãn và viền khi đang focus. Sẽ ghi đè `primaryColor`.
- `idleColor` (`string`): Màu của nhãn và viền khi không focus. Mặc định là `#999`.
- `textColor` (`string`): Màu của chữ được nhập vào. Mặc định là `#000000`.
- `primaryColor` (`string`): Màu active dự phòng nếu không truyền `activeColor`.
- `backgroundColor` (`string`): Màu nền của nhãn nổi, dùng để đè lên đường viền (nên set trùng với màu nền của app).
- `fillColor` (`string`): Màu nền cho biến thể `filled`.
- `iconCancelSource` (`any`): Source hình ảnh cho icon xóa (dấu X) (chỉ hiện khi có chữ).
- `iconEyeSource` / `iconEyeHideSource` (`any`): Source hình ảnh cho icon ẩn/hiện mật khẩu (dùng khi `secureTextEntry` là true).
- `onFocus` (`(focus: boolean) => void`): Hàm gọi lại khi trạng thái focus thay đổi.
- Kế thừa tất cả các `TextInputProps` tiêu chuẩn (ví dụ: `onChangeText`, `value`, `secureTextEntry`).

---

## 2. Dialog

Một component modal/hộp thoại điều khiển bằng cử chỉ vuốt, sử dụng Reanimated và Worklets cho hiệu ứng mượt mà. Đã tích hợp sẵn Haptic feedback.

**Props:**

- `visible` (`boolean`): Điều khiển trạng thái ẩn/hiện của hộp thoại.
- `onDismiss` (`() => void`): Hàm gọi lại khi bấm ra ngoài nền hoặc khi vuốt để tắt.
- `position` (`'bottom' | 'top' | 'left' | 'right' | 'center'`): Vị trí xuất hiện và đứng yên của hộp thoại. Vị trí `center` dùng hiệu ứng phóng to (scale); các vị trí khác dùng hiệu ứng trượt (slide).
- `disableDrag` (`boolean`): Nếu là true, người dùng không thể vuốt để tắt hộp thoại.
- `dismissThreshold` (`number`): Tỷ lệ phần trăm kích thước hộp thoại cần phải vuốt qua để kích hoạt lệnh tắt (Mặc định `0.3`).
- `dismissVelocity` (`number`): Vận tốc vuốt (flick) cần đạt để tắt hộp thoại (Mặc định `800`).
- `backdropColor` (`string`): Màu của nền tối phía sau (Mặc định `#000`).
- `backdropOpacity` (`number`): Độ mờ của nền (Mặc định `0.5`).
- `disableHaptic` (`boolean`): Đặt thành `true` để tắt rung haptic khi hộp thoại xuất hiện.
- `hapticType` (`HapticType`): Kiểu rung khi hộp thoại xuất hiện. Mặc định là `'impactLight'`.
- `contentStyle` (`StyleProp<ViewStyle>`): Tùy chỉnh style cho phần chứa nội dung bên trong.

---

## 3. Button

Nút bấm tương tác có hiệu ứng thu nhỏ khi bấm và tự động rung (haptic).

**Props:**

- `label` (`string`): Chữ hiển thị bên trong nút.
- `variant` (`'solid' | 'outline' | 'ghost'`): Kiểu nút.
- `loading` (`boolean`): Hiển thị vòng xoay `ActivityIndicator` và vô hiệu hóa nút bấm.
- `primaryColor` (`string`): Dùng làm màu nền cho `solid`, và màu viền/chữ cho `outline`/`ghost`.
- `onPrimaryColor` (`string`): Màu chữ cho kiểu `solid`.
- `disableHaptic` (`boolean`): Tắt rung `impactLight` khi chạm nhanh và `impactHeavy` khi chạm giữ lâu.
- `labelStyle` (`TextStyle`): Tùy chỉnh style cho chữ bên trong.
- Kế thừa tất cả `TouchableOpacityProps`.

---

## 4. Slider

Thanh trượt (slider) mượt mà được build hoàn toàn bằng Reanimated và Gesture Handler (đạt chuẩn 60fps).

**Props:**

- `value` (`number`): Giá trị hiện tại.
- `min` / `max` (`number`): Giới hạn giá trị. Mặc định là `0` và `100`.
- `step` (`number`): Giới hạn thanh trượt nhảy theo từng bước `step`. Mặc định là `0` (trượt liên tục mượt mà).
- `onChange` (`(value: number) => void`): Hàm gọi liên tục khi đang kéo.
- `onChangeEnd` (`(value: number) => void`): Hàm gọi khi người dùng thả tay ra khỏi thanh trượt.
- `trackColor` (`string`): Màu của phần thanh chưa kéo tới.
- `fillColor` (`string`): Màu của phần thanh đã kéo qua.
- `thumbColor` (`string`): Màu của cục nắm kéo (thumb).
- `thumbSize` (`number`): Đường kính của cục nắm kéo.
- `trackHeight` (`number`): Độ dày của thanh trượt.
- `disabled` (`boolean`): Vô hiệu hóa kéo và giảm độ mờ (opacity).

---

## 5. Progressbar

Cung cấp 2 component là `ProgressLinear` (thanh ngang/dọc) và `ProgressCircular` (vòng tròn). Tự động chạy animation khi giá trị thay đổi.

**LinearProgressProps (`ProgressLinear`):**

- `value` (`number`): `0-100`.
- `direction` (`'horizontal' | 'vertical'`): Hướng của thanh (ngang hoặc dọc).
- `notSmooth` (`boolean`): Tắt hiệu ứng mượt (spring) khi giá trị thay đổi.
- `color` / `trackColor` (`string`): Màu của thanh tiến trình và màu nền sau nó.
- `thickness` (`number`): Độ dày của thanh.
- `length` (`number | string`): Tổng chiều dài (là width nếu ngang, là height nếu dọc).
- `label` (`'inside' | 'outside' | 'none'`): Vị trí hiển thị số phần trăm.

**CircularProgressProps (`ProgressCircular`):**

- `value` (`number`): `0-100`.
- `radius` (`number`): Bán kính vòng tròn.
- `strokeWidth` (`number`): Độ dày của đường viền tròn.
- `color` / `trackColor` (`string`).
- `label` (`'inside' | 'outside' | 'none'`).

---

## 6. Switch

Nút gạt bật/tắt có animation.

**Props:**

- `value` (`boolean`): Trạng thái hiện tại.
- `onValueChange` (`(value: boolean) => void`): Hàm gọi lại khi thay đổi.
- `onColor` / `offColor` (`string`): Màu của nút khi Bật / Tắt.
- `disabled` (`boolean`).

---

## 7. Avatar

Component ảnh bo tròn sử dụng `@d11/react-native-fast-image` để tối ưu tải ảnh.

**Props:**

- `source` (`Source | ImageRequireSource`): Nguồn ảnh.
- `size` (`number`): Tự động set cho cả `width`, `height` và bo tròn hoàn toàn.
- `onPress` (`() => void`): Nếu được truyền vào, Avatar sẽ biến thành một nút bấm `TouchableOpacity`.

---

## 8. Badge

Một thành phần UI siêu nhỏ dùng để hiện số đếm thông báo hoặc trạng thái.

**Props:**

- `label` (`string` | `number`).
- `textColor` (`string`).
- `backgroundColor` (`ColorValue`).

---

## 9. TouchableOpacity

Một phiên bản `TouchableOpacity` tùy biến, cung cấp hiệu ứng thu nhỏ nhẹ khi nhấn và tự động rung (haptic).

**Props:**

- `disableHaptic` (`boolean`): Tắt rung `impactLight` khi chạm.
- `center` (`boolean`): Tự động set `alignItems: 'center'` và `justifyContent: 'center'`.
- Kế thừa `TouchableOpacityProps`.

---

## 10. Radio & RadioGroup

Component Radio có animation mượt mà, hỗ trợ tùy chỉnh hướng bố cục (`row` hoặc `column`), vị trí nhãn/label (`right`, `left`, `top`, `bottom`) và cho phép tùy chỉnh style linh hoạt (container, label, radio circle, dot inner).

**RadioGroup Props:**

- `value` (`string`): Giá trị được chọn hiện tại.
- `onChange` (`(value: string) => void`): Hàm gọi lại khi người dùng chọn một option.
- `direction` (`'column' | 'row'`): Hướng bố cục sắp xếp các RadioButton trong nhóm (Mặc định: `'column'`).
- `labelPosition` (`'right' | 'left' | 'top' | 'bottom'`): Vị trí nhãn mặc định so với nút radio tròn cho các RadioButton con.
- `activeColor` / `inactiveColor` (`string`): Màu sắc khi active và inactive.
- `labelStyle` (`StyleProp<TextStyle>`): Style mặc định cho tất cả nhãn của RadioButton con.
- `style` (`StyleProp<ViewStyle>`): Style tùy chỉnh cho container chứa nhóm radio.

**RadioButton Props:**

- `label` (`string`): Chữ hiển thị của nhãn.
- `value` (`string`): Giá trị của option.
- `selected` (`boolean`): Đè trạng thái chọn nếu dùng RadioButton đứng độc lập ngoài RadioGroup.
- `color` (`string`): Đè màu active cho riêng option này.
- `labelPosition` (`'right' | 'left' | 'top' | 'bottom'`): Vị trí của nhãn so với nút radio tròn (Mặc định: `'right'`).
- `disabled` (`boolean`): Vô hiệu hóa tương tác.
- `numberOfLines` (`number`): Giới hạn số dòng hiển thị của nhãn chữ (tránh bị tràn màn hình).
- `style` (`StyleProp<ViewStyle>`): Style tùy chỉnh cho khung chứa RadioButton.
- `labelStyle` (`StyleProp<TextStyle>`): Style tùy chỉnh cho chữ nhãn.
- `radioStyle` (`StyleProp<ViewStyle>`): Style tùy chỉnh cho vòng tròn radio bên ngoài.
- `innerStyle` (`StyleProp<ViewStyle>`): Style tùy chỉnh cho chấm tròn animation bên trong.
