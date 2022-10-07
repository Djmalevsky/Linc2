import AsyncStorage from "@react-native-async-storage/async-storage";

export default async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {}
};
