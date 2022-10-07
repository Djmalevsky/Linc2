import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  cellRoot: {
    width: "38rem",
    //height: "53 * $height",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "$uiGray20",
    borderBottomWidth: "3 * $height",
    //paddingBottom: ,
  },
  cellText: {
    fontFamily: "Regular",
    fontSize: "40rem",
  },
  focusCell: {
    borderBottomColor: "$uiBlack",
  },
  resendContainer: {
    marginTop: "10 * $height",
  },
  resendText: () => EStyleSheet.value("$h5"),
});
