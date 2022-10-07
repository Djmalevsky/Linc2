import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 25,
    height: 30,
    lineHeight: 28,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
