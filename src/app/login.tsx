import { IMAGES } from "@/constants/images";
import { PlayerService } from "@/services/playerService";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
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
      Alert.alert("Error de Conexión", "No se pudo guardar el jugador.");
    }
  };

  return (
    <ImageBackground
      source={IMAGES.bgTheme}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Banner Pergamino Superior */}
        <ImageBackground
          source={IMAGES.bannerScroll}
          style={styles.bannerContainer}
          imageStyle={styles.bannerImageStyle}
          resizeMode="contain"
        >
          <Text style={styles.bannerTitle}>TRUCO</Text>
        </ImageBackground>

        {/* Tarjeta Hoja Arrancada / Libreta */}
        <ImageBackground
          source={IMAGES.paperSheet2}
          style={styles.paperSheet}
          imageStyle={styles.paperImageStyle}
          resizeMode="stretch"
        >
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
            />
          </View>

          <TouchableOpacity
            style={styles.woodButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.woodButtonText}>Entrar a la Mesa 🎴</Text>
            )}
          </TouchableOpacity>
        </ImageBackground>
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
    backgroundColor: "rgba(0, 0, 0, 0.25)", // Capa suave para contrastar
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bannerContainer: {
    width: 280,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerImageStyle: {
    borderRadius: 8,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  paperSheet: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 35,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  paperImageStyle: {
    borderRadius: 12,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A3319",
    marginBottom: 6,
    letterSpacing: 1,
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
    elevation: 4,
  },
  woodButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
