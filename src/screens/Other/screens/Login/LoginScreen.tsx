import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { loginStyles as styles, colors } from "../../../../styles";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { firebase, auth } from "../../../../config/firebaseConfig";
import { Context } from "../../../../context/authContext";
import { LinearGradient } from "expo-linear-gradient";
import useStatusBar from "../../../../hooks/useStatusBar";

const LoginScreen = ({ navigation }) => {
  useStatusBar("light-content");
  const { login } = useContext(Context);

  const loginWithPhone = () => {
    navigation.navigate("Phone");
  };

  const loginWithGoogle = async () => {
    try {
      const { type, accessToken, idToken } = await Google.logInAsync({
        androidClientId:
          "1023753991461-01q6c1huhe1p0t6ef1pnar6rcujdkh6h.apps.googleusercontent.com",
        iosClientId:
          "1023753991461-55c046vj5e984tn33dhih7jaq5snn8pr.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        // code similar to codeInputScreen
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = provider.credential(idToken, accessToken);
        finishLogin(credential);
      }
    } catch (e) {
      alert(e);
    }
  };

  const loginWithFacebook = async () => {
    try {
      Facebook.initializeAsync({ appId: "771595577033872", appName: "Linc" });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        appId: "771595577033872",
      });
      if (type === "success") {
        const provider = new firebase.auth.FacebookAuthProvider();
        const credential = provider.credential({ accessToken: token });
        finishLogin(credential);
      }
    } catch (e) {
      alert(e);
    }
  };

  const finishLogin = async (credential) => {
    try {
      const authResult = await auth.signInWithCredential(credential);
      // not a new user, so sign them in
      if (!authResult.additionalUserInfo.isNewUser) {
        login(authResult.user.uid);
        return;
      }
      // new user, send them to phone screen and link the email credential
      else {
        navigation.navigate("Phone");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <LinearGradient
      colors={colors}
      style={styles.container}
      start={{ x: 0.5, y: -0.25 }}
      end={{ x: 0.5, y: 2 }}
    >
      <View style={styles.top}>
        <Text style={styles.title}>Linc</Text>
        <Text style={styles.subheader}>Make College Friends</Text>
      </View>
      <View style={styles.middle}>
        <Image
          style={styles.logo}
          source={require("../../../../../assets/futureIcon.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={loginWithFacebook}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={loginWithGoogle}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={loginWithPhone}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={styles.buttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Help")}>
          <Text style={[styles.subheader, { marginTop: 5 }]}>Login Help</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
