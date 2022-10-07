import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  buttonTitle: () => EStyleSheet.value("$buttonTitle"),
  activeTitle: {
    color: "$uiBlack",
  },
  inactiveTitle: {
    color: "$uiGray20",
  },
  container: {
    width: "100%",
    // increase margin
    marginBottom: "36 * $height",
    alignSelf: "center",
  },
  buttonContainer: { borderRadius: "22 * $height" },
  button: {
    height: "44 * $height",
  },
  buttonShadow: () => EStyleSheet.value("$buttonShadow"),
});
