import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  icon: {
    fontSize: "24rem",
    color: "$uiBlack",
    marginRight: "10rem",
  },
  bulletContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: () => EStyleSheet.value("$h5"),
  bodyRegular: () => EStyleSheet.value("$bodyReg"),
  subheaderText: {
    color: "$uiGray60",
    marginBottom: "18 * $height",
  },
});
