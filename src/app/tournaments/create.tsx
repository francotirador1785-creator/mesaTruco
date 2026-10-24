import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { PlayerService } from "@/services/playerService";
import { TournamentService } from "@/services/tournamentService";
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

export default function CreateTournamentScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("¡Atención!", "Ingresá el nombre del torneo.");
      return;
    }

    setLoading(true);

    try {
      const profile = await PlayerService.getLocalProfile();

      if (!profile?.id) {
        Alert.alert(
          "Error de Sesión",
          "No encontramos tu perfil de jugador. Por favor volvé a iniciar sesión.",
        );
        setLoading(false);
        router.replace("/login");
        return;
      }

      const tournament = await TournamentService.createTournament(
        name,
        profile.id,
      );
      setLoading(false);

      if (tournament) {
        Alert.alert("¡Éxito!", `Torneo "${tournament.title}" creado.`);
        router.replace(`/tournaments/${tournament.id}` as any);
      } else {
        Alert.alert("Error", "No se pudo crear el torneo en la base de datos.");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert("Error", "Ocurrió un error inesperado al crear el torneo.");
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
          {/* Banner Pergamino - GRANDE Y NÍTIDO */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={IMAGES.bannerScroll}
              style={styles.bannerImage}
              resizeMode="contain"
            >
              <Text style={styles.bannerTitle}>CREAR TORNEO</Text>
            </ImageBackground>
          </View>

          {/* Hoja de Libreta - SE VE ENTERA (CONTAIN) */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet1}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                <Text style={styles.sheetTitle}>Detalles del Torneo</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOMBRE DEL TORNEO</Text>
                  <TextInput
                    style={styles.paperInput}
                    placeholder="Ej: Truco de los Viernes"
                    placeholderTextColor="#7A6855"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <WoodButton
                  title="Generar Torneo 🎴"
                  onPress={handleCreate}
                  loading={loading}
                />

                <WoodButton
                  title="Volver"
                  variant="secondary"
                  onPress={() => router.back()}
                  disabled={loading}
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
    fontSize: 28,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  paperContainer: {
    width: "100%",
    maxWidth: 470,
    aspectRatio: 1448 / 1086,
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
    width: "86%",
    height: "76%",
    marginTop: "4%",
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
