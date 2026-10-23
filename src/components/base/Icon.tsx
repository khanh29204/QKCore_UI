import React from "react";

import Image, { IconProps as CustomImageProps } from "./Image";

type IconProps = CustomImageProps & {
  size?: number;
};

const Icon: React.FC<IconProps> = ({ size, ...props }) => {
  return (
    <Image {...props} style={[{ width: size, height: size }, props.style]} icon={true} />
  );
};

export default Icon;
