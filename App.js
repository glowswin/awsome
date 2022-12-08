import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setReady(true);
      }
    }
    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
