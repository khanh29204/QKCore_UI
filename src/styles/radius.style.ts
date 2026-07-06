import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type UniversalStyle = ViewStyle & ImageStyle & TextStyle;

const radiusSizes = [2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 120] as const;
type RadiusSize = (typeof radiusSizes)[number] | 'full';

// 2. Cập nhật Interface
type StyleGroup = Record<RadiusSize, any>; // Dùng any ở đây là an toàn nhất cho StyleSheet ID

export interface RadiusSystem extends StyleGroup {
  t: StyleGroup;
  b: StyleGroup;
  l: StyleGroup;
  r: StyleGroup;
  tl: StyleGroup;
  tr: StyleGroup;
  bl: StyleGroup;
  br: StyleGroup;
}

function createRadiusStyle(): RadiusSystem {
  const raw: Record<string, Record<string, ViewStyle>> = {
    all: {},
    t: {},
    b: {},
    l: {},
    r: {},
    tl: {},
    tr: {},
    bl: {},
    br: {},
  };

  const map: Record<string, (keyof ViewStyle)[]> = {
    all: ['borderRadius'],
    t: ['borderTopLeftRadius', 'borderTopRightRadius'],
    b: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    l: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    r: ['borderTopRightRadius', 'borderBottomRightRadius'],
    tl: ['borderTopLeftRadius'],
    tr: ['borderTopRightRadius'],
    bl: ['borderBottomLeftRadius'],
    br: ['borderBottomRightRadius'],
  };

  const allSizes = [...radiusSizes, 'full'] as const;

  allSizes.forEach(s => {
    const value = s === 'full' ? 9999 : s;
    const key = s.toString();

    Object.keys(map).forEach(prop => {
      const styleObj: any = {
        overflow: 'hidden',
      }; // Dùng any tạm thời bên trong vòng lặp
      map[prop].forEach(styleKey => {
        styleObj[styleKey] = value;
      });
      raw[prop][key] = styleObj;
    });
  });

  const result = {
    ...(StyleSheet.create(raw.all) as any),
    t: StyleSheet.create(raw.t),
    b: StyleSheet.create(raw.b),
    l: StyleSheet.create(raw.l),
    r: StyleSheet.create(raw.r),
    tl: StyleSheet.create(raw.tl),
    tr: StyleSheet.create(raw.tr),
    bl: StyleSheet.create(raw.bl),
    br: StyleSheet.create(raw.br),
  };

  return result as unknown as RadiusSystem;
}

export const radiusStyle = createRadiusStyle() as unknown as RadiusSystem &
  Record<RadiusSize, UniversalStyle>;

export const borderStyle = StyleSheet.create({
  b1: { borderBottomWidth: 1 },
  l1: { borderLeftWidth: 1 },
  r1: { borderRightWidth: 1 },
  s1: { borderWidth: 1 },
  s2: { borderWidth: 2 },
  s3: { borderWidth: 3 },
  s4: { borderWidth: 4 },
  t1: { borderTopWidth: 1 },
});
