import React from 'react';

import { ImageRequireSource } from 'react-native';

import { FastImageProps, Source } from '@d11/react-native-fast-image';

import Image from './Image';
import TouchableOpacity from './TouchableOpacity';
import { radiusStyle } from '../../styles/radius.style';

type AvatarProps = FastImageProps & {
  source: Source | ImageRequireSource;
  size?: number;
  onPress?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({ source, size, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Image
        {...props}
        style={radiusStyle.full}
        source={source}
        width={size}
        height={size}
      />
    </TouchableOpacity>
  );
};

export default Avatar;
