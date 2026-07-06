import React from "react";

import {
  StyleSheet,
  Text as RNText,
  TextProps,
  ColorValue,
} from "react-native";

import { baseStyle } from "../../styles/base.style";
import { TypographyStyle } from "../../styles/typography.style";

export type CustomTextProps = TextProps & {
  color?: ColorValue;
  typography?: TypographyStyle;
  center?: boolean;
};

const Text: React.FC<CustomTextProps> = ({ center = false, ...props }) => {
  return (
    <RNText
      {...props}
      style={[
        center && baseStyle.center,
        styles.container,
        { color: props.color },
        props.typography,
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  container: {},
});
