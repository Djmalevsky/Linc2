import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  button: {
    marginVertical: "6.5 * $height",
    borderRadius: "40 * $height",
    alignItems: "center",
    justifyContent: "center",
    height: "48 * $height",
  },
  activeButton: {
    backgroundColor: "$uiBlack",
  },
  inactiveButton: {
    borderWidth: "3 * $height",
    borderColor: "$uiBlack",
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: "20rem",
  },
  activeText: {
    color: "$uiWhite",
  },
  inactiveText: {
    color: "$uiBlack",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "6.5 * $height",
  },
  radio: {
    width: "32rem",
    height: "32rem",
    borderRadius: "16rem",
    borderWidth: "3 * $height",
    marginRight: "20rem",
    alignItems: "center",
    justifyContent: "center",
  },
  // color of outside ring of button
  activeRadio: {
    borderColor: "rgb(88, 230, 179)",
  },
  inactiveRadio: {
    borderColor: "$uiGray40",
  },
  radioFill: {
    width: "16rem",
    height: "16rem",
    borderRadius: "8rem",
    backgroundColor: "rgb(88, 230, 179)",
  },
  radioText: () => EStyleSheet.value("$bodyLg"),
  icon: {
    fontSize: "24rem",
    color: "$uiBlack",
    position: "absolute",
    right: "16rem",
  },
  divider: {
    height: "62 * $height",
  },
});
