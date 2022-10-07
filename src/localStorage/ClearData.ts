import AsyncStorage from "@react-native-async-storage/async-storage";

export default async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  }
    