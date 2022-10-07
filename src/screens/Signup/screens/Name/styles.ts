import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  inputContainer: {
    borderBottomWidth: "3 * $height",
    paddingBottom: "7 * $height",
    flexDirection: "row",
    alignItems: "center",
  },
  validInput: {
    borderBottomColor: "$uiBlack",
  },
  invalidInput: {
    borderBottomColor: "$red",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "30rem",
    flex: 1,
  },
});
