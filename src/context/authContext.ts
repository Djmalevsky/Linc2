import createDataContext from "./createDataContext";
import { auth, db, functions } from "../config/firebaseConfig";
import * as Location from "expo-location";
import ClearData from "../localStorage/ClearData";

const authReducer = (
  state: any,
  action: {
    type: string;
    payload: {
      user: {};
      loading: boolean;
      recaptchaVerifier: any;
      profiles: any;
    };
  }
) => {
  switch (action.type) {
    case "FINISH_LOAD":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        profiles: action.payload.profiles,
      };
    case "LOGOUT":
      return { ...state, user: null };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "CREATE_ACCOUNT":
      return {
        ...state,
        user: action.payload.user,
      };
    case "RECAPTCHA":
      return {
        ...state,
        recaptcha: action.payload.recaptchaVerifier,
      };
    default:
      return state;
  }
};

const logout = (dispatch: (arg0: { type: string }) => void) => {
  return () => {
    auth
      .signOut()
      .then(function () {
        dispatch({ type: "LOGOUT" });
      })
      .catch(function (error: any) {
        alert(error);
      });
  };
};

const login = (dispatch: (arg0: { type: string; payload: any }) => void) => {
  return (uid: any) => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((firestoreDocument: { exists: any; data: () => any }) => {
        if (!firestoreDocument.exists) {
          alert("User does not exist anymore.");
        }
        dispatch({ type: "LOGIN", payload: firestoreDocument.data() });
      })
      .catch((error: any) => {
        alert(error);
      });
  };
};

const finishLoad = (
  dispatch: (arg0: {
    type: string;
    payload: {
      user: any;
      profiles: any;
    };
  }) => void
) => {
  return async (user: { id: string }, profiles: any) => {
    dispatch({
      type: "FINISH_LOAD",
      payload: {
        user,
        profiles,
      },
    });
  };
};

const createAccount = (
  dispatch: (arg0: { type: string; payload: { user: any } }) => void
) => {
  return async (userData: any) => {
    const id = await auth.currentUser.uid;
    const finalData = { id, ...userData };

    db.collection("users")
      .doc(id)
      .set(finalData)
      .then(() => {
        ClearData();
        dispatch({
          type: "CREATE_ACCOUNT",
          payload: {
            user: userData,
          },
        });
      })
      .catch((error: any) => {
        alert(error);
        return;
      });
  };
};

const deleteAccount = (dispatch: (arg0: { type: string }) => void) => {
  // future: delete user data extention to delete photos: https://firebase.google.com/products/extensions/delete-user-data

  return async () => {
    try {
      await functions.httpsCallable("deleteCurrentUser")();
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.log(e);
    }
  };
};

const saveRecaptchaVerifier = (
  dispatch: (arg0: {
    type: string;
    payload: { recaptchaVerifier: any };
  }) => void
) => {
  return (recaptcha: any) =>
    dispatch({ type: "RECAPTCHA", payload: { recaptchaVerifier: recaptcha } });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    logout,
    login,
    finishLoad,
    createAccount,
    deleteAccount,
    saveRecaptchaVerifier,
  },
  {
    user: null,
    loading: true,
    location: null,
    recaptcha: null,
    profiles: null,
  }
);

export const getUserLoc = async () => {
  try {
    const id = await auth.currentUser.uid;
    const newPos = await Location.getLastKnownPositionAsync({});
    if (newPos) {
      const location = `${newPos.coords.longitude},${newPos.coords.latitude}`;
      const userRef = db.collection("users").doc(id);

      const userDoc = await userRef.get();
      if (userDoc.exists) {
        userRef.update({ location: location });
      }
      return location;
    }
    return null;
  } catch (e) {
    alert(e);
    return null;
  }
};
