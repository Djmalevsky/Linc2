import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  card: () => EStyleSheet.value("$card"),
  cardShadow: () => EStyleSheet.value("$cardShadow"),
  h3: () => EStyleSheet.value("$h3"),
  bodyReg: () => EStyleSheet.value("$bodyReg"),
});
