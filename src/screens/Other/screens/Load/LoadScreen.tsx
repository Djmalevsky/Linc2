import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { db, firebase } from "../../../../config/firebaseConfig";
import { Context } from "../../../../context/authContext";
import { GetData } from "../../../../localStorage";

const LoadScreen = () => {
  const { finishLoad } = useContext(Context);

  useEffect(() => {
    const usersRef = db.collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(async (document) => {
            const userData = document.data();
            const profiles = await GetData("profiles");
            finishLoad(userData, false, profiles);
          })
          .catch((e) => {
            finishLoad(user, false, null);
          });
      } else {
        finishLoad(user, false, null);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#7FDCA5" />
    </View>
  );
};

export default LoadScreen;
