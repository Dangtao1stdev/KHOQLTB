import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Entypo } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
export default function ScannerQRCode({ onScannerCode, setModalPosition }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [flashMode, setFlashMode] = useState(false)
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    onScannerCode(data)
    setModalPosition(false)
  }

  return (
    <View style={styles.container}>
      <Camera
        whiteBalance="auto"
        flashMode={flashMode && Camera.Constants.FlashMode.torch}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        type={type ? Camera.Constants.Type.front : Camera.Constants.Type.back}
        style={styles.camera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setFlashMode(!flashMode)}
            style={[
              styles.flash,
              { backgroundColor: flashMode ? "#424242" : "#fff" },
            ]}
          >
            <Entypo
              name="flashlight"
              size={30}
              color={flashMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType(!type), setFlashMode(false)
            }}
            style={[
              styles.flip,
              { backgroundColor: type ? "#424242" : "#fff" },
            ]}
          >
            <MaterialIcons
              name="flip-camera-ios"
              size={30}
              color={type ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => setModalPosition(false)}
        >
          <MaterialIcons name="cancel" size={48} color="white" />
        </TouchableOpacity>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flash: {
    position: "absolute",
    left: "10%",
    top: "8%",
    borderRadius: 40,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  flip: {
    position: "absolute",
    right: "10%",
    top: "8%",
    borderRadius: 40,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    position: "absolute",
    bottom: "15%",
    alignSelf: "center",
  },
})
