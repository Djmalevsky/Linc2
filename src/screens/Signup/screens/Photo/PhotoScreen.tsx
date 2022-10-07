import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StoreData } from "../../../../localStorage";
import {
  GradientButton,
  Header,
  Container,
  ContentContainer,
} from "../../components";
import Chrome from "./Chrome";
import { emptyTiles } from "./Config";

const PhotoScreen = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [tiles, setTiles] = useState(emptyTiles);

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.7)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
    return null;
  };

  const onButtonPress = async () => {
    const finalPhotos = [];
    for (let i in tiles) {
      // if they selected a photo at that location
      if (tiles[i].uri !== "") {
        finalPhotos.push(tiles[i].uri);
      }
    }
    await StoreData("photos", JSON.stringify(finalPhotos));
    navigation.navigate("Location");
  };

  return (
    <>
      <Container usingKeyboardIOS={false}>
        <Header header="My photos" alt={false} />
        <ContentContainer>
          <Chrome
            setUploading={setUploading}
            tiles={tiles}
            setTiles={setTiles}
          />
        </ContentContainer>
        <GradientButton
          callback={onButtonPress}
          isDisabled={false}
          buttonTitle="Continue"
        />
      </Container>
      {_maybeRenderUploadingOverlay()}
    </>
  );
};

export default PhotoScreen;
