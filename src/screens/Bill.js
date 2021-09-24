import React, { useState, useEffect, useCallback } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native"
import { COLORS, FONTS, SIZES } from "../constants"
import RNPickerSelect from "react-native-picker-select"
import { Entypo } from "@expo/vector-icons"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ScannerQRCode from "../components/ScannerQRCode"
import ModalSuccess from "../components/ModalSuccess"
import { BlurView } from "expo-blur"
const Bill = ({ route }) => {
  const name = route.params?.dataName
  const [Time, setTime] = useState("")
  const [Name, setName] = useState(name)
  const [Position, setPosition] = useState("")
  const dateTime = new Date().toString()
  const [Amount, setAmount] = useState(0)
  const [Pb, setPb] = useState("")
  const [Reason, setReason] = useState("")
  const data = { Time, Name, Position, Amount, Pb, Reason }
  const [modalPosition, setModalPosition] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)
  const [success, setSuccess] = useState(null)

  const onScannerCode = (data) => {
    setPosition(data)
  }
  const submit = async () => {
    if (Position.trim() && Amount !== 0 && Pb.trim()) {
      axios
        .post(
          "https://sheet.best/api/sheets/eab5b657-4595-4d2b-9609-af68c2cd2d0d",
          data
        )
        .then(() => {
          setPosition("")
          setAmount(0)
          setModalSuccess(true)
          setSuccess(true)
        })
        .catch(() => {
          setModalSuccess(true)
          setSuccess(false)
        })
    }
  }
  useEffect(() => {
    const clearTime = setTimeout(() => setTime(dateTime), 1000)
    return () => clearTimeout(clearTime)
  }, [submit])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.cardContent}>
          <Text style={styles.titleHeader}>Phiếu Xuất Kho</Text>
          <View style={styles.wrapperContent}>
            <Text style={styles.titleInput}>Người lấy:</Text>
            <Text style={styles.textName}>{Name}</Text>
            {/* <RNPickerSelect
              onValueChange={(value) => setName(value)}
              style={{
                ...pickerSelectStyles,
                iconContainer: { top: "25%", right: 8 },
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: "",
                value: null,
                color: COLORS.header,
              }}
              items={[
                { label: "Chung", value: "Chung" },
                { label: "Hiệp", value: "Hiệp" },
                { label: "Diễn", value: "Diễn" },
                { label: "Đ.Tuân", value: "Đ.Tuân" },
                { label: "P.Tuân", value: "P.Tuân" },
                { label: "Hiếu", value: "Hiếu" },
                { label: "Hưng", value: "Hưng" },
                { label: "Huy", value: "Huy" },
                { label: "Quý", value: "Quý" },
                { label: "Tạo", value: "Tạo" },
                { label: "Ninh", value: "Ninh" },
                { label: "Dương", value: "Dương" },
                { label: "Thanh", value: "Thanh" },
                { label: "Khánh", value: "Khánh" },
                { label: "Hường", value: "Hường" },
              ]}
              Icon={() => (
                <Entypo name="chevron-down" size={24} color={COLORS.text} />
              )}
            /> */}
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.titleInput}>Vị trí:</Text>
            <View style={styles.rightPosition}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalPosition(true)}
              >
                <View style={[styles.shadow, { height: 45, width: 45 }]}>
                  <LinearGradient
                    style={styles.linearGradient}
                    colors={["#73dcee", "#26bfd9", "#2b93a6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={24}
                      color="white"
                    />
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                autoCapitalize="characters"
                maxLength={6}
                textAlign="center"
                value={Position}
                onChangeText={(txt) => setPosition(txt)}
              />
            </View>
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.titleInput}>Số lượng:</Text>
            <View style={styles.amount}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAmount((prev) => prev - 1)}
              >
                <LinearGradient
                  colors={["#73dcee", "#26bfd9", "#2b93a6"]}
                  style={styles.btnAmount}
                >
                  <Text style={styles.txtBtn}>-</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.txtAmount}>{Amount}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAmount((prev) => prev + 1)}
              >
                <LinearGradient
                  colors={["#73dcee", "#26bfd9", "#2b93a6"]}
                  style={styles.btnAmount}
                >
                  <Text style={styles.txtBtn}>+</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.titleInput}>Phân bổ:</Text>
            <RNPickerSelect
              onValueChange={(value) => setPb(value)}
              style={{
                ...pickerSelectStyles,
                iconContainer: { top: "25%", right: 8 },
              }}
              placeholder={{
                label: "",
                value: null,
                color: COLORS.header,
              }}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: "Đúc", value: "Đ" },
                { label: "Hoàn Thiện", value: "HT" },
                { label: "Khuôn", value: "K" },
                { label: "Quản Lý", value: "QL" },
              ]}
              Icon={() => (
                <Entypo name="chevron-down" size={24} color={COLORS.text} />
              )}
            />
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.titleInput} onPress={() => setReason("")}>
              Lý do:
            </Text>
            <TextInput
              style={styles.reason}
              multiline={true}
              value={Reason}
              onChangeText={(txt) => setReason(txt)}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => submit()}>
            <LinearGradient
              colors={["#73dcee", "#26bfd9", "#2b93a6"]}
              style={styles.button}
            >
              <Text style={styles.txtButton}>Xuất Kho</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* Modal Position */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPosition}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
            setModalPosition(!modalPosition)
          }}
        >
          <ScannerQRCode
            onScannerCode={onScannerCode}
            setModalPosition={setModalPosition}
          />
        </Modal>
        {/* Modal Success */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSuccess}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
            setModalSuccess(!modalSuccess)
          }}
        >
          <BlurView tint="dark" intensity={55} style={styles.blurView}>
            <TouchableOpacity
              onPress={() => setModalSuccess(false)}
              style={styles.absolute}
            ></TouchableOpacity>
            <ModalSuccess setModalSuccess={setModalSuccess} success={success} />
          </BlurView>
        </Modal>
      </ScrollView>
    </View>
  )
}

export default Bill

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
  titleHeader: {
    ...FONTS.h1,
    color: COLORS.header,
    alignSelf: "center",
  },
  wrapperContent: {
    marginTop: SIZES.padding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleInput: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  input: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.text,
    width: 100,
    color: COLORS.text,
    padding: SIZES.base,
    ...FONTS.h2,
  },
  textName: {
    // borderRadius: SIZES.radius,
    // borderWidth: 1,
    // borderColor: COLORS.text,
    // width: 120,
    color: COLORS.text,
    // padding: SIZES.base,
    ...FONTS.h2,
    textAlign: "center",
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
  reason: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.text,
    flex: 1,
    height: 100,
    marginLeft: SIZES.base,
    padding: SIZES.base,
    ...FONTS.body3,
    color: COLORS.text,
  },
  amount: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnAmount: {
    paddingHorizontal: 16,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  txtAmount: {
    ...FONTS.h2,
    color: COLORS.text,
    marginHorizontal: SIZES.base,
  },
  shadow: {
    marginRight: SIZES.base,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    elevation: 4,
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  rightPosition: {
    flexDirection: "row",
    alignItems: "center",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...FONTS.h2,
    color: COLORS.text,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    padding: 10,
    width: 160,
    textAlign: "center",
  },
  inputAndroid: {
    ...FONTS.h2,
    color: COLORS.text,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    padding: 10,
    width: 160,
    textAlign: "center",
  },
})
