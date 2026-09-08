import React, { useEffect, useState } from "react";

import {
  DimensionValue,
  Image as RNImage,
  ImageProps as RNImageProps,
} from "react-native";

import TurboImage, { TurboImageProps } from "react-native-turbo-image";

// Định nghĩa cấu trúc Props rõ ràng, giải quyết xung đột onLoad, onError, onLoadEnd...
export type IconProps = Omit<
  RNImageProps,
  "source" | "onLoad" | "onError" | "onLoadEnd"
> & {
  source: RNImageProps["source"] | TurboImageProps["source"];
  width?: DimensionValue;
  height?: DimensionValue;

  // Định nghĩa lại các event dùng chung dưới dạng hàm ẩn danh hoặc ép kiểu linh hoạt
  onLoad?: any;
  onError?: any;
  onLoadEnd?: any;

  [key: string]: any;
};

const Image: React.FC<IconProps> = ({
  width,
  height,
  source,
  style,
  onError,
  ...props
}) => {
  const imageStyle = [{ width, height }, style];

  const isRemoteImage =
    typeof source === "object" &&
    source !== null &&
    "uri" in source &&
    typeof source.uri === "string" &&
    /^https?:\/\//i.test(source.uri);

  // Khi nó báo lỗi thì fallback về RNImage để ảnh vẫn hiển thị được.
  const [fallback, setFallback] = useState(false);

  const uri = isRemoteImage ? (source as { uri?: string }).uri : undefined;

  // Reset trạng thái fallback khi source thay đổi
  useEffect(() => {
    setFallback(false);
  }, [uri]);

  if (isRemoteImage && !fallback) {
    return (
      <TurboImage
        {...(props as any)} // Ép kiểu any ở đây để triệt tiêu xung đột định nghĩa sự kiện của hệ thống
        source={source as TurboImageProps["source"]}
        style={imageStyle}
        cachePolicy="urlCache"
        onFailure={(e: any) => {
          setFallback(true);
          onError?.(e);
        }}
      />
    );
  }

  return (
    <RNImage
      {...(props as any)}
      source={source as RNImageProps["source"]}
      style={imageStyle}
      onError={onError}
    />
  );
};

export default Image;
