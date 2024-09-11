import { Stack } from "expo-router";

import React from "react";

export default function ListCarlayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
