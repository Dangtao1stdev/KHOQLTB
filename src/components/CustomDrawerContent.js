import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS, FONTS, SIZES } from "../constants"
import firebase from "../config/firebase"
const CustomDrawerContent = ({ navigation }) => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((err) => console.log(err))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => signOut()}>
        <LinearGradient
          colors={["#73dcee", "#26bfd9", "#2b93a6"]}
          style={styles.button}
        >
          <Text style={styles.txtButton}>Đăng Xuất</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    marginHorizontal: SIZES.base,
  },
  button: {
    padding: SIZES.radius,
    marginTop: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  txtButton: {
    ...FONTS.h2,
    color: COLORS.white,
  },
})
