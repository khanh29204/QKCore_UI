import React, { forwardRef } from 'react';

import { View as RNView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Props } from './type';
import { baseStyle } from '../../../styles/base.style';

const View = forwardRef<RNView, Props>(
  (
    {
      useSafeArea = false,
      flex = false,
      center = false,
      centerV = false,
      centerH = false,
      row = false,
      spread = false,
      style,
      backgroundColor,
      width,
      height,
      ...props
    },
    ref,
  ) => {
    const componentStyle = [
      flex && baseStyle.flex,
      center && baseStyle.center,
      centerH && baseStyle.centerH,
      centerV && baseStyle.centerV,
      row && baseStyle.row,
      spread && baseStyle.spread,
      backgroundColor && { backgroundColor },
      width !== undefined && { width },
      height !== undefined && { height },
      style,
    ];

    if (useSafeArea) {
      return <SafeAreaView {...props} style={componentStyle} />;
    }

    return <RNView ref={ref} {...props} style={componentStyle} />;
  },
);

View.displayName = 'View';

export default View;
