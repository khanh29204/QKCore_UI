import { StyleSheet } from "react-native";

const Typography = StyleSheet.create({
  body: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
  },

  bodyLarge: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 26,
  },
  bodyLight: {
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 22,
  },

  bodySmall: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
  },

  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },

  captionB: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },

  captionL: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 16,
  },

  display: {
    fontSize: 56,
    fontWeight: "700",
    letterSpacing: -1,
    lineHeight: 64,
  },
  font: {
    fontFamily: "proxima_soft_bold",
  },
  h0: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -0.5,
    lineHeight: 56,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.3,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.2,
    lineHeight: 32,
  },

  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },

  overline: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.8,
    lineHeight: 16,
    textTransform: "uppercase",
  },
});

export default Typography;
export type TypographyConfig = typeof Typography;
export type TypographyStyle = (typeof Typography)[keyof typeof Typography];
