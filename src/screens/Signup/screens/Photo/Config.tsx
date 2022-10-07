import { Easing } from "react-native-reanimated";
import { Dimensions } from "react-native";

export interface Positions {
  [id: string]: number;
}

export const PEPE =
  "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj";

//get value $rem giving trouble, calculate instead
const screenWidth = Dimensions.get("window").width;
const scaleVal = screenWidth / 375;

export const MARGIN = 20 * scaleVal;
export const SIZE = 128 * scaleVal;
export const COL = 2;

export const ICON_SIZE = 32 * scaleVal;
export const ICON_OFFSET = -6 * scaleVal;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number) => {
  "worklet";

  return {
    x: position % COL === 0 ? 0 : SIZE + MARGIN,
    y: Math.floor(position / COL) * (SIZE + MARGIN),
  };
};

export const getOrder = (tx: number, ty: number, max: number) => {
  "worklet";

  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};

export const emptyTiles = [
  {
    uri: "",
    localUri: "",
    type: "",
  },
  {
    uri: "",
    localUri: "",
    type: "",
  },
  {
    uri: "",
    localUri: "",
    type: "",
  },
  {
    uri: "",
    localUri: "",
    type: "",
  },
  {
    uri: "",
    localUri: "",
    type: "",
  },
  {
    uri: "",
    localUri: "",
    type: "",
  },
];
