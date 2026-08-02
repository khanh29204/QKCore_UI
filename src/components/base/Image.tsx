import React from "react";

import {
  DimensionValue,
  Image as RNImage,
  ImageProps as RNImageProps,
} from "react-native";

import FastImage, { FastImageProps } from "@d11/react-native-fast-image";

// Định nghĩa cấu trúc Props rõ ràng, giải quyết xung đột onLoad, onError, onLoadEnd...
export type IconProps = Omit<
  RNImageProps,
  "source" | "onLoad" | "onError" | "onLoadEnd"
> & {
  source: RNImageProps["source"] | FastImageProps["source"];
  width?: DimensionValue;
  height?: DimensionValue;

  // Định nghĩa lại các event dùng chung dưới dạng hàm ẩn danh hoặc ép kiểu linh hoạt
  onLoad?: any;
  onError?: any;
  onLoadEnd?: any;

  // Cho phép nhận các props đặc thù khác của FastImage nếu có
  [key: string]: any;
};

const Image: React.FC<IconProps> = ({
  width,
  height,
  source,
  style,
  ...props
}) => {
  const imageStyle = [{ width, height }, style];

  const isRemoteImage =
    typeof source === "object" &&
    source !== null &&
    "uri" in source &&
    typeof source.uri === "string" &&
    /^https?:\/\//i.test(source.uri);

  if (isRemoteImage) {
    return (
      <FastImage
        {...(props as any)} // Ép kiểu any ở đây để triệt tiêu xung đột định nghĩa sự kiện của hệ thống
        source={source as FastImageProps["source"]}
        style={imageStyle}
      />
    );
  }

  return (
    <RNImage
      {...(props as any)}
      source={source as RNImageProps["source"]}
      style={imageStyle}
    />
  );
};

export default Image;
