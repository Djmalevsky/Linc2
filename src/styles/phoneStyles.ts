import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  button: {
    padding: "10rem",
    marginLeft: "30rem",
    marginRight: "30rem",
    marginTop: "20rem",
    //height: "48rem",
    borderRadius: "30rem",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  inactiveButton: {
    backgroundColor: "gray",
  },
  buttonTitle: {
    color: "white",
    fontSize: "16rem",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    padding: "20rem",
    marginTop: "50rem",
  },
  title: {
    marginBottom: "15rem",
    fontSize: "29rem",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    marginTop: "10rem",
    fontWeight: "bold",
    color: "red",
  },
  loader: {
    marginTop: "10rem",
  },
});
