import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  mileDistance: {
    color: "$uiGray60",
  },
  headerDivider: {
    marginTop: "10 * $height",
    borderWidth: "1rem",
    borderColor: "$uiGray20",
    marginLeft: "22rem",
  },
  scrollableHeader: {
    paddingHorizontal: "22rem",
    alignItems: "center",
    paddingVertical: "15.5 * $height",
  },
  headerText: {
    fontFamily: "Regular",
    fontSize: "15rem",
    color: "$uiBlack",
    paddingLeft: "10rem",
    textAlign: "center",
  },
  verified: {
    marginLeft: "7rem",
  },
  photoCard: {
    //height: "263 * $height",

    borderRadius: "12rem",
  },
  headerSpacer: {
    height: "12 * $height",
  },
});
