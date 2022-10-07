import React, { ReactElement } from "react";
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";
import FixedItem from "./FixedItem";

interface ListProps {
  children: ReactElement<{ id: string }>[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}

const List = ({ children, editing, onDragEnd }: ListProps) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map(
        (child, index) => child.props.uri !== "" && { [child.props.id]: index }
      )
    )
  );
  const fixedPositions = Object.assign(
    {},
    ...children.map(
      (child, index) => child.props.uri === "" && { [child.props.id]: index }
    )
  );

  return (
    <Animated.View
      style={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
    >
      {children.map((child) => {
        return child.props.uri === "" ? (
          <FixedItem
            positions={fixedPositions}
            key={child.props.id}
            id={child.props.id}
          >
            {child}
          </FixedItem>
        ) : (
          <Item
            key={child.props.id}
            positions={positions}
            id={child.props.id}
            editing={editing}
            onDragEnd={onDragEnd}
            scrollView={scrollView}
            scrollY={scrollY}
          >
            {child}
          </Item>
        );
      })}
    </Animated.View>
  );
};

export default List;
