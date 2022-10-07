import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { Context } from "../../../../context/authContext";

const SettingsScreen = () => {
  const { logout, deleteAccount } = useContext(Context);

  const deleteAccountAlert = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be reversed",
      [
        {
          text: "Cancel",
          // onPress: do nothing,
          style: "cancel",
        },
        {
          text: "Delete Account",
          onPress: () => deleteAccount(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={deleteAccountAlert}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
