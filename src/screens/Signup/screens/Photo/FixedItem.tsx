import React, { ReactNode } from "react";
import { View } from "react-native";

import { getPosition, Positions, SIZE } from "./Config";

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: Positions;
}

const FixedItem = ({ children, positions, id }: ItemProps) => {
  const position = getPosition(positions[id]);
  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    transform: [{ translateX: position.x }, { translateY: position.y }],
  };
  return <View style={style}>{children}</View>;
};

export default FixedItem;
