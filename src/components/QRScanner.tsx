import WoodButton from "@/components/Button";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Se necesita permiso de cámara para escanear el código QR del torneo.
        </Text>
        <WoodButton title="Dar Permiso" onPress={requestPermission} />
        <WoodButton title="Cancelar" variant="secondary" onPress={onClose} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (data) {
            onScan(data);
          }
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanTarget} />
        <Text style={styles.instructionText}>
          Apuntá al código QR del torneo
        </Text>
        <WoodButton
          title="Cerrar Cámara"
          variant="secondary"
          onPress={onClose}
          style={styles.closeBtn}
        />
      </View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#0F281E",
  },
  permissionText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  scanTarget: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "#E6C280",
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  instructionText: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 20,
    fontWeight: "bold",
  },
  closeBtn: {
    marginTop: 30,
    minWidth: 160,
  },
});
