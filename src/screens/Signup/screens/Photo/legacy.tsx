import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { storage } from "../../../../config/firebaseConfig";
import uuid from "uuid";
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
const { width } = Dimensions.get("window");
import { DragSortableView } from "react-native-drag-sort";
import styles from "./styles";
import StoreData from "../../../../localStorage/StoreData";

const parentWidth = width;
const childrenWidth = 200;
const childrenHeight = 200;
const marginChildrenTop = 7;
const marginChildrenBottom = 0;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;

const TEST_DATA = [{ txt: 0 }, { txt: 1 }, { txt: 2 }, { txt: 3 }, { txt: 4 }];
const currOrder = [];

export default class PhotoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: TEST_DATA,
      // for photos
      uploading: false,
    };

    //this.index = 5;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sort}>
          <DragSortableView
            dataSource={this.state.data}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            childrenHeight={childrenHeight}
            marginChildrenTop={marginChildrenTop}
            marginChildrenBottom={marginChildrenBottom}
            marginChildrenLeft={marginChildrenLeft}
            marginChildrenRight={marginChildrenRight}
            onClickItem={(data, item, index) => this._pickImage(index)}
            keyExtractor={(item, index) => item.txt}
            renderItem={(item, index) => this.renderItem(item, index)}
          />
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
            <Text style={styles.buttonTitle}>Continue</Text>
          </TouchableOpacity>
        </View>
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }

  onButtonPress = async () => {
    const finalOrder = [];
    for (let i in currOrder) {
      // if they selected a photo at that location
      if (Object.keys(currOrder[i]).length > 1) {
        finalOrder.push(currOrder[i].image);
      }
    }
    // no images have been selected
    if (finalOrder.length === 0) {
      alert("Select an image to continue.");
      return;
    }
    await StoreData("photos", JSON.stringify(finalOrder));
    this.props.navigation.navigate("Location");
  };

  renderItem(item, index) {
    currOrder[index] = item;
    if (Object.keys(item).length > 1) {
      return (
        <View style={styles.item}>
          <View style={styles.item_children}>
            <Image style={styles.item_icon} source={{ uri: item.image }} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <View style={styles.item_children}>
            <Text style={{ fontSize: 24, color: "#000" }}>+</Text>
          </View>
        </View>
      );
    }
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  /*
  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };
  */
  _pickImage = async (number) => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Image library status not granted, enable in settings to continue");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    this._handleImagePicked(pickerResult, number);
  };

  _handleImagePicked = async (pickerResult, number) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        // Save upload URL to access image later!
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        const newData = [...this.state.data];
        if (newData[number].length > 1) {
          const oldUrl = newData[number].image;
        }
        newData[number] = { image: uploadUrl, txt: number };
        this.setState({ data: newData });
        // remove oldUrl here
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

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
