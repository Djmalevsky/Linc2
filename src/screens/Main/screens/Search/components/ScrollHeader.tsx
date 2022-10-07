import React from "react";
import { BookOpen } from "./../svg";
import { UI_BLACK, UI_GRAY_20 } from "../../../../../colors";
import searchStyles from "../styles";
import { ScrollView, Text, View } from "react-native";

const ScrollHeader = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={searchStyles.scrollableHeader}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View>
            <BookOpen stroke={UI_BLACK} />
          </View>
          <Text style={searchStyles.headerText}>University of Florida</Text>
          <View
            style={{
              height: 20,
              borderWidth: 1,
              borderColor: UI_GRAY_20,
              marginLeft: 11.04,
            }}
          />
          <View style={{ marginLeft: 11.04 }}>
            <BookOpen stroke={UI_BLACK} />
          </View>
          <Text style={searchStyles.headerText}>University of Florida</Text>
          <View
            style={{
              height: 20,
              borderWidth: 1,
              borderColor: UI_GRAY_20,
              marginLeft: 11.04,
            }}
          />
          <View style={{ marginLeft: 11.04 }}>
            <BookOpen stroke={UI_BLACK} />
          </View>
          <Text style={searchStyles.headerText}>University of Florida</Text>
          <View
            style={{
              height: 20,
              borderWidth: 1,
              borderColor: UI_GRAY_20,
              marginLeft: 11.04,
            }}
          />
          <View style={{ marginLeft: 11.04 }}>
            <BookOpen stroke={UI_BLACK} />
          </View>
          <Text style={searchStyles.headerText}>University of Florida</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScrollHeader;
