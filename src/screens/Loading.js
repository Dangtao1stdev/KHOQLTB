import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { COLORS, FONTS } from "../constants/theme"
import firebase from "../config/firebase"
const Loading = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        const usersRef = firebase.firestore().collection("users")
        usersRef
          .doc(uid)
          .get()
          .then((data) => {
            const user = data.data()
            navigation.replace("Drawer", {
              screen: "Bill",
              params: { dataName: user.Name },
            })
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        navigation.replace("Login")
      }
    })
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
      <ActivityIndicator size="large" animating={true} color={COLORS.header} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loading: {
    ...FONTS.h2,
    color: COLORS.header,
  },
})
