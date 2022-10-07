import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Platform,
  View,
  StatusBar as AndroidStatusBar,
} from "react-native";
import ListItem from "./components/ListItem";
import { generateData } from "./data";
import { getCloser } from "./utils";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "expo-status-bar";

const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight() : AndroidStatusBar.currentHeight;
const SEARCH_BAR_HEIGHT = 50;

const StatusBarBackground = () => {
  return (
    <View
      style={{
        width: "100%",
        height: STATUS_BAR_HEIGHT,
        backgroundColor: "#FFF",
        position: "absolute",
        zIndex: 2,
      }}
    >
      <StatusBar style="dark" />
    </View>
  );
};

const { diffClamp } = Animated;

const TestScreen = () => {
  const data = generateData(50);

  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, SEARCH_BAR_HEIGHT);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, SEARCH_BAR_HEIGHT],
    outputRange: [0, -SEARCH_BAR_HEIGHT],
  });

  const translateYNumber = useRef();

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const handleSnap = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -SEARCH_BAR_HEIGHT
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -SEARCH_BAR_HEIGHT, 0) ===
            -SEARCH_BAR_HEIGHT
              ? offsetY + (SEARCH_BAR_HEIGHT + translateYNumber.current)
              : offsetY + translateYNumber.current,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarBackground />
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <View style={{ backgroundColor: "#000", height: SEARCH_BAR_HEIGHT }} />
      </Animated.View>
      <Animated.FlatList
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: STATUS_BAR_HEIGHT + SEARCH_BAR_HEIGHT,
        }}
        onScroll={handleScroll}
        ref={ref}
        onScrollEndDrag={handleSnap}
        //onMomentumScrollEnd={handleSnap}
        data={data}
        renderItem={ListItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: STATUS_BAR_HEIGHT,
    position: "absolute",
    backgroundColor: "#FFF",
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default TestScreen;
