import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { LogBox } from "react-native";

export const firebaseConfig = {
  apiKey: "AIzaSyBBdyNdveZZQRjX9DZKFs_S94BRljojmCs",
  authDomain: "linc-43cfa.firebaseapp.com",
  projectId: "linc-43cfa",
  storageBucket: "linc-43cfa.appspot.com",
  messagingSenderId: "1023753991461",
  appId: "1:1023753991461:web:5858b9c7c326eea6ea16cc",
  measurementId: "G-QC1SZHBR33",
};

let fireApp;
if (!firebase.apps.length) {
  fireApp = firebase.initializeApp(firebaseConfig);
}

const db = fireApp.firestore();
const functions = fireApp.functions("us-east1");
const auth = fireApp.auth();
const storage = fireApp.storage();

export { db, functions, auth, storage, firebase };

LogBox.ignoreLogs([
  "Cannot update a component from inside the function body of a different component",
  "Non-serializable values were found in the navigation state",
  "Setting a timer for a long period of time",
  "Can't perform a React state update on an unmounted component",
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
]);
