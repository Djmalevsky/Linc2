import EStyleSheet from "react-native-extended-stylesheet";

const primaryColor = "#4CB";

export default EStyleSheet.create({
  scrollView: {
    height: "60%",
    alignSelf: "center",
  },
  fadeout: {
    height: "70%",
    width: "100%",
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: 1,
  },
  contentContainer: {
    paddingHorizontal: "20rem",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  passionText: {
    fontSize: "14rem",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#4CB",
  },
  passionButton: {
    borderRadius: "17rem",
    borderColor: primaryColor,
    borderWidth: "1.4rem",
    marginHorizontal: "3rem",
    marginVertical: "3rem",
    alignItems: "center",
    paddingHorizontal: "10rem",
    paddingVertical: "5rem",
  },
  activeButton: {
    backgroundColor: primaryColor,
  },
  inactiveButton: {
    backgroundColor: "white",
  },
});
