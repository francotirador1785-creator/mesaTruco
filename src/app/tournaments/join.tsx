import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function JoinTournamentScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      Alert.alert("¡Atención!", "Por favor ingresá el código del torneo.");
      return;
    }
    router.push(`/tournaments/${cleanCode}` as any);
  };

  return (
    <ImageBackground
      source={IMAGES.bgTheme}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.responsiveContent}>
          {/* Banner Pergamino - GRANDE Y NÍTIDO */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={IMAGES.bannerScroll}
              style={styles.bannerImage}
              resizeMode="contain"
            >
              <Text style={styles.bannerTitle}>UNIRME</Text>
            </ImageBackground>
          </View>

          {/* Hoja Arrancada - SE VE ENTERA (CONTAIN) */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet2}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                <Text style={styles.sheetTitle}>Unirse a un Torneo</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CÓDIGO DEL TORNEO</Text>
                  <TextInput
                    style={styles.paperInput}
                    placeholder="Ej: TRUCO-ABC12"
                    placeholderTextColor="#7A6855"
                    value={code}
                    onChangeText={setCode}
                    autoCapitalize="characters"
                    autoCorrect={false}
                  />
                </View>

                <WoodButton title="Buscar Torneo 🔍" onPress={handleJoin} />

                <WoodButton
                  title="Volver"
                  variant="secondary"
                  onPress={() => router.back()}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  responsiveContent: {
    width: "100%",
    maxWidth: 480,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "web" ? 24 : 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContainer: {
    width: "100%",
    maxWidth: 420,
    aspectRatio: 1860 / 845,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 3,
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  paperContainer: {
    width: "100%",
    maxWidth: 470,
    aspectRatio: 1542 / 1020,
    justifyContent: "center",
    alignItems: "center",
  },
  paperBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paperContent: {
    width: "82%",
    height: "82%",
    justifyContent: "space-evenly",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 6,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 8 },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4A3319",
    marginBottom: 4,
    letterSpacing: 1,
  },
  paperInput: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 1.5,
    borderColor: "#B0A08A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#2D1A0E",
    fontWeight: "600",
  },
});
