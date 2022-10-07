import React from "react";
import { Text, View } from "react-native";
import { ContentContainer } from "../../../components";
import searchStyles from "../styles";
import { styles } from "../../../styles";
import EStyleSheet from "react-native-extended-stylesheet";
import Verified from "../../svg/Verified";
import { ScrollHeader } from ".";

const HeaderCard = ({ name, isVerified, distance, renderScrolling }) => {
  const rem = Math.floor(EStyleSheet.value("$rem") * 16);

  return (
    <View style={[styles.card, styles.cardShadow]}>
      <ContentContainer>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[styles.h3, { maxWidth: "60%" }]}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            {name}
          </Text>
          {isVerified && (
            <View style={searchStyles.verified}>
              <Verified width={rem} height={rem} />
            </View>
          )}
          {distance && (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={[styles.bodyReg, searchStyles.mileDistance]}>
                {distance} mi.
              </Text>
            </View>
          )}
        </View>
      </ContentContainer>
      {renderScrolling ? (
        <>
          <View style={searchStyles.headerDivider} />
          <ScrollHeader />
        </>
      ) : (
        <View style={searchStyles.headerSpacer} />
      )}
    </View>
  );
};

export default HeaderCard;
