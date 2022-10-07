import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  cell: {
    width: "20rem",
    height: "30 * $height",
    borderBottomWidth: "3 * $height",
  },
  activeBorder: {
    borderColor: "$uiBlack",
  },
  inactiveBorder: {
    borderColor: "$uiGray20",
  },
  invalidBorder: {
    borderColor: "$red",
  },
  placeholderText: () => EStyleSheet.value("$h4"),
  active: {
    color: "$uiBlack",
  },
  inactive: {
    color: "$uiGray20",
  },
  invalid: {
    color: "$red",
  },
  // fix: inside of separator wrong color
  separator: {
    //position: "absolute",
    //top: 0,
    //left: 90,
    height: 0,
    width: "25 * $height",
    borderWidth: 2,
    transform: [{ rotate: "108.43deg" }],
    alignSelf: "center",
  },
});
