import React from "react";
import { View, Image } from "react-native";
import { Video } from "expo-av";
import EStyleSheet from "react-native-extended-stylesheet";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { UI_GRAY_40, PHOTO_BG } from "../../../../colors";
import { SIZE, ICON_SIZE, ICON_OFFSET } from "./Config";
import Plus from "./svg/Plus";
import X from "./svg/X";

const styles = EStyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
  photoShadow: () => EStyleSheet.value("$cardShadow"),
});
interface TileProps {
  id: string;
  localUri: string;
  type: string;
  onLongPress: () => void;
  callback: (arg0: string) => void;
}

const Tile = ({ id, localUri, callback, type }: TileProps) => {
  const Cancel = () => {
    return (
      <X
        style={{
          position: "absolute",
          right: ICON_OFFSET,
          top: ICON_OFFSET,
        }}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
    );
  };

  return (
    <TouchableWithoutFeedback
      style={[styles.container, styles.photoShadow]}
      onPress={() => callback(id)}
    >
      {localUri === "" ? (
        <>
          <View
            style={{
              flex: 1,
              borderRadius: ICON_SIZE,
              borderColor: UI_GRAY_40,
              borderWidth: 3,
              backgroundColor: PHOTO_BG,
            }}
          />
          <Plus
            style={{
              position: "absolute",
              right: ICON_OFFSET,
              top: ICON_OFFSET,
            }}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        </>
      ) : (
        <>
          {type === "image" ? (
            <>
              <Image
                source={{
                  uri: localUri,
                }}
                style={{ flex: 1, borderRadius: ICON_SIZE }}
              />
              <Cancel />
            </>
          ) : (
            <>
              <Video
                source={{ uri: localUri }}
                style={{ flex: 1, borderRadius: ICON_SIZE }}
                resizeMode="cover"
              />
              <Cancel />
            </>
          )}
        </>
      )}
    </TouchableWithoutFeedback>
  );
};

export default Tile;
