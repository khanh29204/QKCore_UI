# QKCore-ui

*Read in [English](README.md)*

Một thư viện UI React Native độc lập, không phụ thuộc framework, được tách ra để tối ưu hóa tính module, hiệu suất và mang lại cảm giác phản hồi haptic cao cấp.

## Cài đặt

```bash
# Nếu dùng npm
npm install https://github.com/khanh2924/QKCore_UI.git

# Nếu dùng yarn
yarn add qkcore-ui@https://github.com/khanh2924/QKCore_UI.git
```

## Thiết lập

Thư viện này không yêu cầu bất kỳ thiết lập phức tạp hay Provider nào bọc bên ngoài! Tất cả các component đều được thiết kế để nhận trực tiếp các thuộc tính style (như màu sắc, icon) thông qua React props thông thường, giúp tối đa hóa tính module và giữ cho dependency cực kỳ nhỏ gọn. Haptic feedback cũng đã được tích hợp sẵn (Native).

---

## Tài liệu (Documentation)

Để xem hướng dẫn toàn diện về tất cả các thuộc tính và công cụ hỗ trợ, vui lòng tham khảo các file tài liệu chi tiết sau:

- 📘 [**Hướng dẫn Components**](./docs/COMPONENTS.vi.md): Giải thích chi tiết props, biến thể, và cách hoạt động của `Button`, `Dialog`, `InputView`, `Slider`, `Progressbar`, v.v.
- 🎨 [**Hướng dẫn Utility Styles**](./docs/STYLES.vi.md): Cách sử dụng `baseStyle`, `paddingStyle`, `marginStyle`, `radiusStyle`, và các object style tiện ích giống CSS để xây dựng giao diện nhanh chóng.

---

## Các thư viện phụ thuộc (Dependencies)
Đảm bảo dự án của bạn đã cài đặt sẵn các thư viện ngang hàng (peer dependencies) sau:
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-svg`
- `react-native-worklets`
- `@d11/react-native-fast-image`
- `react-native-haptic-feedback`
