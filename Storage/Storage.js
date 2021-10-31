//import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveState = async (attempts) => {
    const jsonAttempts = JSON.stringify(points);
    await AsyncStorage.setItem("attempts", jsonAttempts);
  };

export const loadState = async () => {
    AsyncStorage.clear();
    const result = await AsyncStorage.getItem("attempts");
    if (result) {
      return JSON.parse(result);
    } else {
      return [];
    }
};