import React from "react";
import { View } from "react-native";
import Tile from "./Tile";
import SortableList from "./SortableList";

import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import { storage } from "../../../../config/firebaseConfig";
import { GetData, StoreData } from "../../../../localStorage";

const Chrome = ({ setUploading, tiles, setTiles }) => {
  //const [tiles, setTiles] = useState(emptyTiles);

  /*
  useEffect(() => {
    (async () => {
      const stringifiedPhotos = await GetData("photos");
      if (stringifiedPhotos) {
        const photos = JSON.parse(stringifiedPhotos);
        setTiles(photos);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await StoreData("photos", JSON.stringify(tiles));
    })();
  }, [tiles]);
  */

  const _pickImage = async (id: string) => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Image library status not granted, enable in settings to continue");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [331, 263],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    _handleImagePicked(pickerResult, id);
  };

  const _handleImagePicked = async (pickerResult, id) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        console.log(pickerResult);
        // Save upload URL to access image later!
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        const newTiles = [...tiles];
        if (newTiles[id].uri !== "") {
          const oldUrl = newTiles[id].uri;
          // delete old url image
        }
        newTiles[id].type = pickerResult.type;
        newTiles[id].localUri = pickerResult.uri;
        newTiles[id].uri = uploadUrl;
        setTiles(newTiles);
      }
    } catch (e) {
      alert(e);
    } finally {
      setUploading(false);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = storage.ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  return (
    <View style={{ flex: 1 }}>
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={index}
            id={index.toString()}
            localUri={tile.localUri}
            type={tile.type}
            callback={_pickImage}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default Chrome;

/*
  const onImageSelect = (_id: string) => {
    const newTiles = tiles;
    const id = parseInt(_id);
    if (newTiles[id].uri === "") {
      newTiles[id].uri = PEPE;
    } else {
      newTiles[id].uri = "";
    }
    setTiles(newTiles);
    setUpdate(!update);
  };
  */
