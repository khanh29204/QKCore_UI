import React from "react";

import { ImageRequireSource } from "react-native";

import { Source } from "react-native-turbo-image";

import Image, { IconProps } from "./Image";
import TouchableOpacity from "./TouchableOpacity";
import { radiusStyle } from "../../styles/radius.style";

type AvatarProps = Omit<IconProps, "source"> & {
  source: IconProps["source"] | ImageRequireSource;
  size?: number;
  onPress?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({ source, size, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Image
        {...props}
        style={radiusStyle.full}
        source={source as IconProps["source"]}
        width={size}
        height={size}
      />
    </TouchableOpacity>
  );
};

export default Avatar;
