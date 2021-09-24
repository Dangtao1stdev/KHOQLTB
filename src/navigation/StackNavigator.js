import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Loading from "../screens/Loading"
import Login from "../screens/Login"
import Register from "../screens/Register"
import DrawerNavigator from "./DrawerNavigator"
const Stack = createStackNavigator()
const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Loading">
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default StackNavigator
