import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { COLORS, FONTS, SIZES } from "../constants"
import { TextInput } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import firebase from "../config/firebase"

const Login = ({ navigation }) => {
  const [hide, setHide] = useState(true)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const handleSubmit = () => {
    if (Email.trim() != "" && Password.trim() != 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(Email, Password)
        .then((response) => {
          const uid = response.user.uid
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
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(txt) => setEmail(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            placeholder="Bạn cần nhập Password"
            secureTextEntry={hide}
            onChangeText={(txt) => setPassword(txt)}
            right={
              <TextInput.Icon
                name="eye"
                color={COLORS.text}
                onPress={() => setHide(!hide)}
              />
            }
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <LinearGradient
              colors={["#73dcee", "#26bfd9", "#2b93a6"]}
              style={styles.button}
            >
              <Text style={styles.txtButton}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.textBottom}>
            <Text style={styles.textBtn}>Bạn đã có tài khoản chưa?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("Register")}
            >
              <Text style={styles.signUp}> Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.padding2,
  },
  cardContent: {
    width: "100%",
    padding: SIZES.padding,
    alignSelf: "center",
    backgroundColor: "white",
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
  input: {
    marginTop: SIZES.padding,
    backgroundColor: "#eafafc",
  },
  button: {
    padding: SIZES.radius,
    marginTop: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
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
    ...FONTS.h1,
    color: COLORS.white,
  },
  textBottom: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    ...FONTS.body3,
    // color:COLORS.text
  },
  signUp: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  txtErrorEmail: {
    ...FONTS.body3,
    color: COLORS.header,
    marginTop: SIZES.base,
  },
})
