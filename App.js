import React from "react"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"
import AppNavigator from "./src/navigation"

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./src/assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./src/assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./src/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./src/assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./src/assets/fonts/Roboto-ThinItalic.ttf"),
  })
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <>
      <AppNavigator />
    </>
  )
}
