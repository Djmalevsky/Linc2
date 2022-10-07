import AsyncStorage from "@react-native-async-storage/async-storage";

export default async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {}
  return null;
};
