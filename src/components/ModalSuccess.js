import React, { useEffect } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { COLORS, FONTS, SIZES } from "../constants"

const ModalSuccess = ({ setModalSuccess, success }) => {
  useEffect(() => {
    const clear = setTimeout(() => setModalSuccess(false), 2000)
    return () => clearTimeout(clear)
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Image
          source={
            success
              ? require("../assets/icons/checked.png")
              : require("../assets/icons/failed.png")
          }
          style={{ height: 180, width: 180 }}
        />
        {success ? (
          <Text style={styles.modalText}>Xuất kho thành công !</Text>
        ) : (
          <Text style={[styles.modalText, { color: "red" }]}>
            Xuất kho thất bại !
          </Text>
        )}
      </View>
    </View>
  )
}

export default ModalSuccess

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: SIZES.padding,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: SIZES.padding,
    textAlign: "center",
    ...FONTS.h2,
    color: COLORS.success,
  },
})
