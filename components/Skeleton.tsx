import React from "react";
import { View } from "react-native";

const Skeleton = ({ width = 100, height = 20, borderRadius = 8, style = {} }) => (
  <View
    style={[
      {
        width,
        height,
        borderRadius,
        backgroundColor: "#3336",
        marginVertical: 4,
        marginHorizontal: 2,
      },
      style,
    ]}
  />
);

export default Skeleton;
