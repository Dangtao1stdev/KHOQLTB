import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Bill from "../screens/Bill"
import CustomDrawerContent from "../components/CustomDrawerContent"
const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Bill" component={Bill} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
