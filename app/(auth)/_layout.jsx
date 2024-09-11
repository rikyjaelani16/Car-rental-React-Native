import { Stack } from "expo-router";
import Constants from "expo-constants";
import { View } from "react-native";
export default function () {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Register" />
      </Stack>
    </View>
  );
}
