import React from 'react';

import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import View from './View';

import type { Props as CustomViewProps } from './View/type';

type CardProps = CustomViewProps & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
  enableShadow?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
};

const Card: React.FC<CardProps> = ({
  enableShadow = true,
  backgroundColor,
  borderRadius = 20,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        styles.card,
        enableShadow && styles.shadow,
        backgroundColor && { backgroundColor },
        borderRadius && { borderRadius },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {},
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
