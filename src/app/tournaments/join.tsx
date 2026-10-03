import { IMAGES } from "@/constants/images";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function JoinTournamentScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!code.trim()) {
      Alert.alert("¡Atención!", "Ingresá el código del torneo.");
      return;
    }
    router.push(`/tournaments/${code.trim()}` as any);
  };

  return (
    <ImageBackground
      source={IMAGES.bgTheme}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ImageBackground
          source={IMAGES.bannerScroll}
          style={styles.bannerContainer}
          resizeMode="contain"
        >
          <Text style={styles.bannerTitle}>UNIRME</Text>
        </ImageBackground>

        <ImageBackground
          source={IMAGES.paperSheet2}
          style={styles.paperSheet}
          imageStyle={styles.paperImageStyle}
          resizeMode="stretch"
        >
          <Text style={styles.sheetTitle}>Unirse a un Torneo</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CÓDIGO DEL TORNEO</Text>
            <TextInput
              style={styles.paperInput}
              placeholder="Ej: TRUCO-1234"
              placeholderTextColor="#7A6855"
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity style={styles.woodButton} onPress={handleJoin}>
            <Text style={styles.woodButtonText}>Buscar Torneo 🔍</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    width: 260,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 2,
  },
  paperSheet: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 35,
    paddingHorizontal: 25,
  },
  paperImageStyle: { borderRadius: 12 },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 16 },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A3319",
    marginBottom: 6,
  },
  paperInput: {
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    borderWidth: 1.5,
    borderColor: "#B0A08A",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2D1A0E",
    fontWeight: "600",
  },
  woodButton: {
    backgroundColor: "#2D5A27",
    borderColor: "#193817",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 15,
  },
  woodButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
