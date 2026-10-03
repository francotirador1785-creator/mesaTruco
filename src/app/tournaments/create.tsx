import { IMAGES } from "@/constants/images";
import { supabase } from "@/lib/supabase";
import { TournamentService } from "@/services/tournamentService";
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
      // 1. Obtener el id del creador (desde Auth o desde la tabla players)
      const { data: authData } = await supabase.auth.getUser();
      let creatorId = authData?.user?.id;

      if (!creatorId) {
        const { data: players } = await supabase
          .from("players")
          .select("id")
          .limit(1);

        if (players && players.length > 0) {
          creatorId = players[0].id;
        }
      }

      if (!creatorId) {
        Alert.alert(
          "Error",
          "No se encontró un usuario/jugador para asociar al torneo.",
        );
        setLoading(false);
        return;
      }

      // 2. Crear el torneo en la BD
      const tournament = await TournamentService.createTournament(
        name,
        creatorId,
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
      Alert.alert("Error", "Ocurrió un error inesperado.");
    }
  };

  return (
    <ImageBackground
      source={IMAGES.bgTheme}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Banner Pergamino */}
        <ImageBackground
          source={IMAGES.bannerScroll}
          style={styles.bannerContainer}
          resizeMode="contain"
        >
          <Text style={styles.bannerTitle}>CREAR TORNEO</Text>
        </ImageBackground>

        {/* Hoja de Libreta */}
        <ImageBackground
          source={IMAGES.paperSheet1}
          style={styles.paperSheet}
          imageStyle={styles.paperImageStyle}
          resizeMode="stretch"
        >
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

          <TouchableOpacity
            style={styles.woodButton}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.woodButtonText}>Generar Torneo 🎴</Text>
            )}
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
    width: 300,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 1.5,
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
