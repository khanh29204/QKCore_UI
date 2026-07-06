# Utility Styles Guide

*Đọc bằng [Tiếng Việt](STYLES.vi.md)*

`QKCore-ui` offers predefined utility style objects (inspired by utility-first CSS frameworks) to help you rapidly build layouts directly in your components without writing repetitive `StyleSheet.create` blocks.

## How to use

Import the needed style objects directly from the library:

```tsx
import { baseStyle, paddingStyle, gapStyle, radiusStyle } from 'qkcore-ui';

<View style={[baseStyle.row, baseStyle.center, paddingStyle.all[16], gapStyle[8]]}>
  {/* Content */}
</View>
```

---

## 1. `baseStyle`
Layout, flexbox, and alignment utilities.

- **Flex Behaviors:**
  - `baseStyle.flex`: `{ flex: 1 }`
  - `baseStyle.flexG`: `{ flexGrow: 1 }`
  - `baseStyle.flexS`: `{ flexShrink: 1 }`
- **Flex Direction:**
  - `baseStyle.row`: `{ flexDirection: 'row', flexShrink: 1 }`
- **Alignment (Cross Axis):**
  - `baseStyle.alignStart`: `{ alignItems: 'flex-start' }`
  - `baseStyle.alignEnd`: `{ alignItems: 'flex-end' }`
  - `baseStyle.centerH`: `{ alignItems: 'center' }`
- **Justification (Main Axis):**
  - `baseStyle.flexStart`: `{ justifyContent: 'flex-start' }`
  - `baseStyle.flexEnd`: `{ justifyContent: 'flex-end' }`
  - `baseStyle.centerV`: `{ justifyContent: 'center' }`
  - `baseStyle.spread`: `{ justifyContent: 'space-between' }`
  - `baseStyle.spreadAround`: `{ justifyContent: 'space-around' }`
  - `baseStyle.evenly`: `{ justifyContent: 'space-evenly' }`
- **Combined:**
  - `baseStyle.center`: `{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }`
- **Visibility:**
  - `baseStyle.none`: `{ display: 'none' }`
  - `baseStyle.hidden`: `{ opacity: 0, zIndex: -1 }`
- **Sizing:**
  - `baseStyle.fullWidth`: `{ width: '100%' }`
  - `baseStyle.fullHeight`: `{ height: '100%' }`

---

## 2. `paddingStyle` & `marginStyle`
Spacing utilities. The available sizes generally follow a scale: `2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 120`.

**Structure:** `paddingStyle.[direction][size]`

- **Directions:**
  - `all`: All sides (e.g. `padding: 16`)
  - `h`: Horizontal (Left & Right)
  - `v`: Vertical (Top & Bottom)
  - `t`: Top
  - `b`: Bottom
  - `l`: Left
  - `r`: Right

**Examples:**
- `marginStyle.t[20]` = `{ marginTop: 20 }`
- `paddingStyle.h[16]` = `{ paddingHorizontal: 16 }`
- `paddingStyle.all[8]` = `{ padding: 8 }`

---

## 3. `gapStyle`
Applies spacing between items within a Flexbox container (React Native 0.71+).

**Usage:** `gapStyle[size]`
- Example: `gapStyle[12]` = `{ gap: 12 }`

---

## 4. `radiusStyle` & `borderStyle`
Utilities for `borderRadius` and `borderWidth`.

**`radiusStyle` sizes:** `2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 120, 'full'`
(`full` equals `9999` for perfect circles/pills).

- **Directions:**
  - `all`: All corners (Default if accessed directly: `radiusStyle[8]`)
  - `t`: Top corners
  - `b`: Bottom corners
  - `l`: Left corners
  - `r`: Right corners
  - `tl`, `tr`, `bl`, `br`: Specific corners.

**Usage:**
- `radiusStyle[16]` or `radiusStyle.all[16]` = `{ borderRadius: 16, overflow: 'hidden' }`
- `radiusStyle.t[20]` = `{ borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }`
- `radiusStyle.full` = `{ borderRadius: 9999, overflow: 'hidden' }`

**`borderStyle`:**
- `borderStyle.s1` = `{ borderWidth: 1 }`
- `borderStyle.s2` = `{ borderWidth: 2 }`
- `borderStyle.b1` = `{ borderBottomWidth: 1 }`
- *(Also includes `l1`, `r1`, `t1`, `s3`, `s4`)*

---

## 5. `typographyStyle`
Text styling utilities defining standard font sizes, weights, and line heights.

**Available Styles:**
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
- `typographyStyle.font`: Sets `fontFamily: 'proxima_soft_bold'`

---

## 6. `absStyle`
Absolute positioning constraints.

- `absStyle.fill`: `{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }`
- `absStyle.center`: Absolute centered using percentages and transforms.
- `absStyle.top`: `{ position: 'absolute', top: 0 }`
- `absStyle.bottom`: `{ position: 'absolute', bottom: 0 }`
- `absStyle.left`: `{ position: 'absolute', left: 0 }`
- `absStyle.right`: `{ position: 'absolute', right: 0 }`
