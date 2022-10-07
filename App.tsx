import { Routes } from "./src/routes";
import React from "react";
import { Provider } from "./src/context/authContext";
import * as Sentry from "sentry-expo";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import {
  WHITE,
  UI_WHITE,
  UI_GRAY_20,
  UI_GRAY_40,
  UI_GRAY_60,
  UI_BLACK,
  RED,
} from "./src/colors";

const App = () => {
  Sentry.init({
    dsn:
      "https://550626c11c5447dc8846d69571d46432@o490530.ingest.sentry.io/5554608",
    enableInExpoDevelopment: true,
    debug: true,
  });
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  EStyleSheet.build({
    // adjustable padding and font size
    $rem: screenWidth / 375,
    $height: screenHeight / 812,

    // set global color constants here (dark mode?)
    $white: WHITE,
    $red: RED,

    $uiWhite: UI_WHITE,
    $uiGray20: UI_GRAY_20,
    $uiGray40: UI_GRAY_40,
    $uiGray60: UI_GRAY_60,
    $uiBlack: UI_BLACK,

    // cards
    $card: {
      borderRadius: "12rem",
      backgroundColor: "$white",
    },

    // Typography
    $h1: {
      fontFamily: "Bold",
      fontSize: "40rem",
      color: "$uiBlack",
    },
    $h1_alt: {
      fontFamily: "Bold",
      fontSize: "36rem",
      color: "$uiBlack",
    },

    $h3: {
      fontFamily: "Bold",
      fontSize: "28rem",
      color: "$uiBlack",
    },

    $h4: {
      fontFamily: "Bold",
      fontSize: "20rem",
      color: "$uiBlack",
    },

    $h5: {
      fontFamily: "Black",
      fontSize: "16rem",
      color: "$uiBlack",
    },

    $buttonTitle: {
      fontFamily: "Bold",
      fontSize: "18rem",
    },

    $bodyLg: {
      fontFamily: "Regular",
      fontSize: "20rem",
    },

    $bodyReg: {
      fontFamily: "Regular",
      fontSize: "16rem",
    },

    // iconography
    // back button and x for signup
    $icon: {
      fontSize: "24rem",
      marginLeft: "19rem",
      color: UI_GRAY_20,
    },

    // shadows
    $cardShadow: {
      shadowOffset: {
        width: 0,
        height: "7 * $height",
      },
      shadowColor: UI_BLACK,
      shadowOpacity: 0.15,
      shadowRadius: 7,
      // elevation: (android)
    },

    $buttonShadow: {
      shadowOffset: {
        width: 0,
        height: "5 * $height",
      },
      shadowColor: UI_BLACK,
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },

    $topShadow: {
      shadowOffset: {
        width: 0,
        height: "-2 * $height",
      },
      shadowColor: UI_BLACK,
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
  });

  const [loaded, error] = useFonts({
    Black: require("./src/fonts/Lato-Black.ttf"),
    BlackItalic: require("./src/fonts/Lato-BlackItalic.ttf"),
    Bold: require("./src/fonts/Lato-Bold.ttf"),
    BoldItalic: require("./src/fonts/Lato-BoldItalic.ttf"),
    Hairline: require("./src/fonts/Lato-Hairline.ttf"),
    HairlineItalic: require("./src/fonts/Lato-HairlineItalic.ttf"),
    Heavy: require("./src/fonts/Lato-Heavy.ttf"),
    HeavyItalic: require("./src/fonts/Lato-HeavyItalic.ttf"),
    Italic: require("./src/fonts/Lato-Italic.ttf"),
    Light: require("./src/fonts/Lato-Light.ttf"),
    LightItalic: require("./src/fonts/Lato-LightItalic.ttf"),
    Medium: require("./src/fonts/Lato-Medium.ttf"),
    MediumItalic: require("./src/fonts/Lato-MediumItalic.ttf"),
    Regular: require("./src/fonts/Lato-Regular.ttf"),
    Semibold: require("./src/fonts/Lato-Semibold.ttf"),
    SemiboldItalic: require("./src/fonts/Lato-SemiboldItalic.ttf"),
    Thin: require("./src/fonts/Lato-Thin.ttf"),
    ThinItalic: require("./src/fonts/Lato-ThinItalic.ttf"),
  });

  // wait here for fonts to load (splash screen?)
  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <Routes />
    </Provider>
  );
};

export default App;
