import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import Constants from "expo-constants"
import { Dimensions } from "react-native"
import BarcodeMask from "react-native-barcode-mask"
import { Ionicons } from "@expo/vector-icons"
const qrSize = width * 0.7
const finderWidth = 280
const finderHeight = 250
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const viewMinX = (width - finderWidth) / 2
const viewMinY = (height - finderHeight) / 2
export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [Type, setType] = useState(BarCodeScanner.Constants.Type.back)
  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data, bounds }) => {
    const { x, y } = bounds.origin
    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth / 2 &&
      y <= viewMinY + finderHeight / 2
    ) {
      setScanned(true)
      navigation.navigate("Bill", { dataQrCode: data })
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        type={Type}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <Text style={styles.description}>Quét mã QR code</Text>
        <TouchableOpacity
          onPress={() =>
            setType(
              Type === BarCodeScanner.Constants.Type.back
                ? BarCodeScanner.Constants.Type.front
                : BarCodeScanner.Constants.Type.back
            )
          }
          style={styles.flip}
        >
          <Ionicons name="md-camera-reverse-outline" size={46} color="white" />
        </TouchableOpacity>
        <BarcodeMask
          width={280}
          height={250}
          edgeWidth={40}
          edgeHeight={40}
          // edgeColor="#3ab4c5"
          edgeBorderWidth={4}
          edgeRadius={20}
          outerMaskOpacity={0.4}
          showAnimatedLine
          // animatedLineColor="#3ab4c5"
          animatedLineHeight={2}
          animatedLineWidth="90%"
          lineAnimationDuration={1600}
          // onLayoutMeasured={param}
        />
        <Text onPress={() => navigation.goBack()} style={styles.cancel}>
          Hủy
        </Text>
      </BarCodeScanner>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    // padding: 8,
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "20%",
    textAlign: "center",
    // width: "70%",
    color: "white",
    zIndex: 1,
  },
  cancel: {
    fontSize: width * 0.06,
    textAlign: "center",
    // width: "70%",
    color: "white",
    marginBottom: "20%",
    position: "absolute",
    bottom: 0,
  },
  flip: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 48,
    zIndex: 1000,
    position: "absolute",
    bottom: 20,
    right: 48,
  },
})
