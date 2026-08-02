# Hướng dẫn Utility Styles

_Read in [English](STYLES.md)_

`QKCore-ui` cung cấp các object style tiện ích (lấy cảm hứng từ các framework utility-first CSS như Tailwind) để giúp bạn xây dựng bố cục (layout) giao diện cực nhanh trực tiếp trong component mà không cần phải viết lặp đi lặp lại các khối `StyleSheet.create`.

## Cách sử dụng

Import các object style cần thiết trực tiếp từ thư viện:

```tsx
import { baseStyle, paddingStyle, gapStyle, radiusStyle } from "qkcore-ui";

<View
  style={[baseStyle.row, baseStyle.center, paddingStyle.all[16], gapStyle[8]]}
>
  {/* Nội dung */}
</View>;
```

---

## 1. `baseStyle`

Các tiện ích về Layout, flexbox và căn chỉnh.

- **Đặc tính Flex:**
  - `baseStyle.flex`: `{ flex: 1 }`
  - `baseStyle.flexG`: `{ flexGrow: 1 }`
  - `baseStyle.flexS`: `{ flexShrink: 1 }`
- **Hướng Flex (Direction):**
  - `baseStyle.row`: `{ flexDirection: 'row', flexShrink: 1 }`
- **Căn chỉnh (Trục phụ - Cross Axis):**
  - `baseStyle.alignStart`: `{ alignItems: 'flex-start' }`
  - `baseStyle.alignEnd`: `{ alignItems: 'flex-end' }`
  - `baseStyle.centerH`: `{ alignItems: 'center' }` (cho Column)
  - `baseStyle.centerVRow`: `{ alignItems: 'center' }` (cho Row)
- **Căn chỉnh (Trục chính - Main Axis):**
  - `baseStyle.flexStart`: `{ justifyContent: 'flex-start' }`
  - `baseStyle.flexEnd`: `{ justifyContent: 'flex-end' }`
  - `baseStyle.centerV`: `{ justifyContent: 'center' }` (cho Column)
  - `baseStyle.centerHRow`: `{ justifyContent: 'center' }` (cho Row)
  - `baseStyle.spread`: `{ justifyContent: 'space-between' }`
  - `baseStyle.spreadAround`: `{ justifyContent: 'space-around' }`
  - `baseStyle.evenly`: `{ justifyContent: 'space-evenly' }`
- **Kết hợp:**
  - `baseStyle.center`: `{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }`
- **Hiển thị (Visibility):**
  - `baseStyle.none`: `{ display: 'none' }`
  - `baseStyle.hidden`: `{ opacity: 0, zIndex: -1 }`
- **Kích thước (Sizing):**
  - `baseStyle.fullWidth`: `{ width: '100%' }`
  - `baseStyle.fullHeight`: `{ height: '100%' }`

---

## 2. `paddingStyle` & `marginStyle`

Tiện ích khoảng cách. Các kích thước có sẵn thường theo thang đo chẵn: `2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 120`.

**Cấu trúc:** `paddingStyle.[hướng][kích_thước]`

- **Các hướng (Directions):**
  - `all`: Tất cả các mặt (ví dụ: `padding: 16`)
  - `h`: Chiều ngang (Trái & Phải)
  - `v`: Chiều dọc (Trên & Dưới)
  - `t`: Trên (Top)
  - `b`: Dưới (Bottom)
  - `l`: Trái (Left)
  - `r`: Phải (Right)

**Ví dụ:**

- `marginStyle.t[20]` = `{ marginTop: 20 }`
- `paddingStyle.h[16]` = `{ paddingHorizontal: 16 }`
- `paddingStyle.all[8]` = `{ padding: 8 }`

---

## 3. `gapStyle`

Tạo khoảng cách giữa các phần tử bên trong một container Flexbox (yêu cầu React Native 0.71+).

**Cấu trúc:** `gapStyle[kích_thước]`

- Ví dụ: `gapStyle[12]` = `{ gap: 12 }`

---

## 4. `radiusStyle` & `borderStyle`

Tiện ích bo góc (`borderRadius`) và độ dày viền (`borderWidth`).

**Các kích cỡ `radiusStyle`:** `2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 120, 'full'`
(`full` tương đương `9999` cho hình tròn hoàn hảo/hình viên thuốc).

- **Các hướng:**
  - `all`: Tất cả các góc (Mặc định nếu gọi trực tiếp: `radiusStyle[8]`)
  - `t`: 2 góc trên
  - `b`: 2 góc dưới
  - `l`: 2 góc bên trái
  - `r`: 2 góc bên phải
  - `tl`, `tr`, `bl`, `br`: Từng góc cụ thể.

**Ví dụ sử dụng:**

- `radiusStyle[16]` hoặc `radiusStyle.all[16]` = `{ borderRadius: 16, overflow: 'hidden' }`
- `radiusStyle.t[20]` = `{ borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }`
- `radiusStyle.full` = `{ borderRadius: 9999, overflow: 'hidden' }`

**`borderStyle` (Độ dày viền):**

- `borderStyle.s1` = `{ borderWidth: 1 }`
- `borderStyle.s2` = `{ borderWidth: 2 }`
- `borderStyle.b1` = `{ borderBottomWidth: 1 }`
- _(Ngoài ra còn có `l1`, `r1`, `t1`, `s3`, `s4`)_

---

## 5. `typographyStyle`

Các tiện ích định dạng văn bản (text) quy định sẵn font size, độ đậm (weight), và line heights.

**Các Style có sẵn:**

- `typographyStyle.display`: `{ fontSize: 56, fontWeight: '700', lineHeight: 64 }`
- `typographyStyle.h0`: `{ fontSize: 48, fontWeight: '700' }`
- `typographyStyle.h1`: `{ fontSize: 32, fontWeight: '700' }`
- `typographyStyle.h2`: `{ fontSize: 24, fontWeight: '700' }`
- `typographyStyle.h3`: `{ fontSize: 20, fontWeight: '600' }`
- `typographyStyle.h4`: `{ fontSize: 18, fontWeight: '600' }`
- `typographyStyle.bodyLarge`: `{ fontSize: 17, fontWeight: '400' }`
- `typographyStyle.body`: `{ fontSize: 15, fontWeight: '400' }`
- `typographyStyle.bodyLight`: `{ fontSize: 15, fontWeight: '300' }`
- `typographyStyle.bodySmall`: `{ fontSize: 13, fontWeight: '400' }`
- `typographyStyle.label`: `{ fontSize: 14, fontWeight: '500' }`
- `typographyStyle.caption`: `{ fontSize: 12, fontWeight: '400' }`
- `typographyStyle.overline`: `{ fontSize: 11, textTransform: 'uppercase' }`
- `typographyStyle.font`: Đặt `fontFamily: 'proxima_soft_bold'`

---

## 6. `absStyle`

Tiện ích định vị tuyệt đối (Absolute positioning).

- `absStyle.fill`: `{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }`
- `absStyle.center`: Canh giữa tuyệt đối sử dụng tỷ lệ phần trăm và transforms.
- `absStyle.top`: `{ position: 'absolute', top: 0 }`
- `absStyle.bottom`: `{ position: 'absolute', bottom: 0 }`
- `absStyle.left`: `{ position: 'absolute', left: 0 }`
- `absStyle.right`: `{ position: 'absolute', right: 0 }`
