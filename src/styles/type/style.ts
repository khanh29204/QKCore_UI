import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const sizes = [
  -12, -8, -4, -2, 0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40,
] as const;
export type UniversalStyle = ViewStyle & ImageStyle & TextStyle;
export type Size = (typeof sizes)[number];

type StyleGroup = Record<Size, UniversalStyle>;

export type SpacingSystem = StyleGroup & {
  h: StyleGroup;
  v: StyleGroup;
  t: StyleGroup;
  b: StyleGroup;
  l: StyleGroup;
  r: StyleGroup;
};

export function createSpacingStyle(
  prefix: 'padding' | 'margin',
): SpacingSystem {
  const raw: Record<string, Record<string, any>> = {
    all: {},
    h: {},
    v: {},
    t: {},
    b: {},
    l: {},
    r: {},
  };

  const map: Record<string, string> = {
    all: prefix,
    h: `${prefix}Horizontal`,
    v: `${prefix}Vertical`,
    t: `${prefix}Top`,
    b: `${prefix}Bottom`,
    l: `${prefix}Left`,
    r: `${prefix}Right`,
  };

  sizes.forEach(s => {
    const key = s.toString();
    Object.keys(map).forEach(prop => {
      raw[prop][key] = { [map[prop]]: s };
    });
  });

  const result = {
    ...(StyleSheet.create(raw.all) as any),
    h: StyleSheet.create(raw.h),
    v: StyleSheet.create(raw.v),
    t: StyleSheet.create(raw.t),
    b: StyleSheet.create(raw.b),
    l: StyleSheet.create(raw.l),
    r: StyleSheet.create(raw.r),
  };

  return result as unknown as SpacingSystem;
}

export function createGapStyle(): StyleGroup {
  const raw: Record<string, ViewStyle> = {};
  sizes.forEach(s => {
    raw[s.toString()] = { gap: s };
  });
  return StyleSheet.create(raw) as any;
}
