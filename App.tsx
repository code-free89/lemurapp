import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { useOrientation } from "./src/hooks/useOrientation";
import AquariumVideoScreen from "./src/pages/AquariumVideo";
import CategoryListScreen from "./src/pages/CategoryList";
import ModelListScreen from "./src/pages/ModelList";
import ModelViewScreen from "./src/pages/ModelView";
import VideoPlayerScreen from "./src/pages/VideoPlayer";
import { RootStackParamList } from "./src/types/StackParams";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isLandScapeMode = useOrientation();

  return (
    <NavigationContainer>
      <StatusBar style="light" translucent hidden={isLandScapeMode} />
      <Stack.Navigator>
        <Stack.Screen
          name="CategoryList"
          component={CategoryListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModelView"
          component={ModelViewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModelList"
          component={ModelListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AquariumMode"
          component={AquariumVideoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
