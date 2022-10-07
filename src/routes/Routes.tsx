import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import StoreData from "../localStorage/StoreData";
import { LoadScreen } from "../screens";
import { HomeStack, SignupStack } from "./index";
import { decode, encode } from "base-64";
import GetData from "../localStorage/GetData";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Routes = () => {
  const { state } = useContext(Context);
  const user = state.user;
  const loading = state.loading;
  const [initialState, setInitialState] = useState();

  // make sure hook of loading is right
  useEffect(() => {
    (async () => {
      try {
        const navState = await GetData("navState");
        const navData = navState ? JSON.parse(navState) : undefined;

        const pageName = navData.routes[navData.index].name;
        const routes = ["Login", "Help", "Phone", "CodeInput"];

        if (navData !== undefined) {
          if (routes.includes(pageName) === false) {
            setInitialState(navData);
          }
        }
      } catch (e) {}
    })();
  }, []);

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <NavigationContainer
      // ENABLE LOGIN STATE SAVE HERE
      initialState={user ? undefined : initialState}
      onStateChange={(state) => {
        user && StoreData("navState", JSON.stringify(state));
      }}
    >
      {user ? <HomeStack /> : <SignupStack />}
    </NavigationContainer>
  );
};

export default Routes;
