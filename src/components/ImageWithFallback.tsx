import React, { useState } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

// local placeholder image (always works offline)
const PLACEHOLDER = require("../../assets/placeholder.png");

// If you don’t have one yet → create assets/placeholder.png
// (simple gray image or your logo)

type Props = {
  uri: string;
  style: StyleProp<ImageStyle>;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
};

export default function ImageWithFallback({
  uri,
  style,
  resizeMode = "contain",
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      source={failed ? PLACEHOLDER : { uri }}
      style={style}
      resizeMode={resizeMode}
      onError={() => setFailed(true)}
    />
  );
}