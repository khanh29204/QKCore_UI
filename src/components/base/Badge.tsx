import React from "react";

import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import Text from "./Text";
import View from "./View";
import { Props as BaseViewProps } from "./View/type";
import { paddingStyle } from "../../styles/padding.style";
import { radiusStyle } from "../../styles/radius.style";

type BadgeProps = BaseViewProps & {
  label: string;
  size: number;
  backgroundColor?: ColorValue | undefined;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  labelStyle,
  style,
  textColor = "#000000",
  ...props
}) => {
  return (
    <View
      {...props}
      center
      style={[styles.container, radiusStyle.full, paddingStyle.h[8], style]}
    >
      <Text color={textColor} style={labelStyle}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {},
});
