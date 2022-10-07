import EStyleSheet from "react-native-extended-stylesheet";

// align text vertically
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  middle: {
    height: "50%",
    justifyContent: "center",
  },
  bottom: {
    height: "30%",
    justifyContent: "center",
    width: "80%",
  },
  title: {
    fontSize: "40rem",
    fontWeight: "bold",
    color: "black",
  },
  subheader: {
    fontSize: "16rem",
    color: "#FFF",
    textAlign: "center",
  },
  logo: {
    height: "150rem",
  },
  signupButton: {
    backgroundColor: "#FFF",
    padding: "10rem",
    borderRadius: "30rem",
    marginTop: "10rem",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderWidth: "1rem",
    borderColor: "#FFF",
    padding: "10rem",
    borderRadius: "30rem",
    marginTop: "10rem",
  },
  buttonText: {
    textAlign: "center",
    fontSize: "18rem",
    color: "#FFF",
  },
  signupTextColor: {
    color: "black",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5rem",
  },
});
