import { functions } from "../../../config/firebaseConfig";
import ClearData from "../../../localStorage/ClearData";
import { StackActions, StackActionType } from "@react-navigation/native";

const cancelSignup = async (navigation: {
  dispatch: (arg0: StackActionType) => void;
}) => {
  try {
    const response = await functions.httpsCallable("cancelSignup")();
    console.log(response);
    ClearData();
    navigation.dispatch(StackActions.popToTop());
  } catch (e) {
    console.log("error: ", e);
  }
};

export default cancelSignup;
