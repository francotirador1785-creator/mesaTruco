import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { PlayerService } from "@/services/playerService";
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

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim() || !alias.trim()) {
      Alert.alert(
        "¡Atención!",
        "Por favor ingresá tu Nombre y tu Alias para continuar.",
      );
      return;
    }

    setLoading(true);
    const profile = await PlayerService.loginOrRegister(name, alias);
    setLoading(false);

    if (profile) {
      router.replace("/");
    } else {
      Alert.alert(
        "Error de Conexión",
        "No se pudo guardar el jugador. Verificá tu conexión a internet.",
      );
    }
  };

  return (
    <ImageBackground
      source={IMAGES.bgTheme}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.responsiveContent}>
          {/* Banner Pergamino Superior - GRANDE Y NÍTIDO */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={IMAGES.bannerScroll}
              style={styles.bannerImage}
              resizeMode="contain"
            >
              <Text style={styles.bannerTitle}>TRUCO</Text>
            </ImageBackground>
          </View>

          {/* Tarjeta Hoja Arrancada - SE VE ENTERA (CONTAIN) */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet2}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                <Text style={styles.sheetTitle}>Anotar Jugador</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>TU NOMBRE</Text>
                  <TextInput
                    style={styles.paperInput}
                    placeholder="Ej: Franco"
                    placeholderTextColor="#7A6855"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>TU ALIAS / APODO</Text>
                  <TextInput
                    style={styles.paperInput}
                    placeholder="Ej: Charly"
                    placeholderTextColor="#7A6855"
                    value={alias}
                    onChangeText={setAlias}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <WoodButton
                  title="Entrar a la Mesa 🎴"
                  onPress={handleLogin}
                  loading={loading}
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
    fontSize: 38,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 4,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 6,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 8,
  },
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
