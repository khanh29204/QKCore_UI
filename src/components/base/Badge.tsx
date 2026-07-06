import React from 'react';

import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import Text from './Text';
import View from './View';
import { Props as BaseViewProps } from './View/type';
import { useQKCore } from '../../provider/QKProvider';
import { paddingStyle } from '../../styles/padding.style';
import { radiusStyle } from '../../styles/radius.style';

type BadgeProps = BaseViewProps & {
  label: string;
  size: number;
  backgroundColor?: ColorValue | undefined;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  labelStyle,
  style,
  ...props
}) => {
  const { colors } = useQKCore();
  return (
    <View
      {...props}
      center
      style={[styles.container, radiusStyle.full, paddingStyle.h[8], style]}>
      <Text color={colors.text} style={labelStyle}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {},
});
