import { ColorValue, DimensionValue, ViewProps } from "react-native";

export type Props = ViewProps & {
  children?: React.ReactNode;
  flex?: boolean;
  useSafeArea?: boolean;
  center?: boolean;
  centerV?: boolean;
  centerH?: boolean;
  spread?: boolean;
  row?: boolean;
  backgroundColor?: ColorValue;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: DimensionValue;
};
