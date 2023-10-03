import { StatusBar } from "react-native";
import { useEffect } from "react";
import { OneSignal } from "react-native-onesignal";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";

import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

OneSignal.initialize("ec574238-acef-43c2-ad69-7e78bb3e051b");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  tagUserInfoCreate();
  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "click",
      (response) => {
        const { url } = response.result;
      }
    );
    return () => unsubscribe;
  }, []);
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
