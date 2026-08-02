/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";

export const baseStyle = StyleSheet.create({
  flex: { flex: 1 },
  flexG: { flexGrow: 1 },
  flexS: { flexShrink: 1 },
  alignStart: { alignItems: "flex-start" },
  alignEnd: { alignItems: "flex-end" },
  flexEnd: { justifyContent: "flex-end" },
  flexStart: { justifyContent: "flex-start" },
  row: { flexDirection: "row", flexShrink: 1 },
  spread: { justifyContent: "space-between" },
  spreadAround: { justifyContent: "space-around" },
  evenly: { justifyContent: "space-evenly" },
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  centerV: { justifyContent: "center" },
  centerH: { alignItems: "center" },
  centerVRow: { alignItems: "center" },
  centerHRow: { justifyContent: "center" },
  none: { display: "none" },
  hidden: {
    opacity: 0,
    zIndex: -1,
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
});
