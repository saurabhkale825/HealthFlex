import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigation />
    </GestureHandlerRootView>
  );
}
