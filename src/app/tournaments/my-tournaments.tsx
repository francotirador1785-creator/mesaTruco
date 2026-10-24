import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { PlayerService } from "@/services/playerService";
import { Tournament, TournamentService } from "@/services/tournamentService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyTournamentsScreen() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMyTournaments();
  }, []);

  const loadMyTournaments = async () => {
    setLoading(true);
    const profile = await PlayerService.getLocalProfile();
    if (!profile) {
      router.replace("/login");
      return;
    }

    const list = await TournamentService.getMyTournaments(profile.id);
    setTournaments(list);
    setLoading(false);
  };

  const getStatusLabel = (status: Tournament["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente ⏳";
      case "in_progress":
        return "En Juego 🔥";
      case "completed":
        return "Finalizado 🏆";
      default:
        return status;
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
              <Text style={styles.bannerTitle}>MIS TORNEOS</Text>
            </ImageBackground>
          </View>

          {/* Hoja Arrancada - SE VE ENTERA (CONTAIN) */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet1}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A3319" />
                    <Text style={styles.loadingText}>Cargando tus torneos...</Text>
                  </View>
                ) : tournaments.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Sin torneos creados</Text>
                    <Text style={styles.emptySubtitle}>
                      Todavía no tenés ningún torneo armado. ¡Podés crear uno
                      ahora mismo!
                    </Text>
                    <WoodButton
                      title="+ Crear Nuevo Torneo"
                      onPress={() => router.push("/tournaments/create" as any)}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={tournaments}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.tournamentCard}
                        activeOpacity={0.7}
                        onPress={() =>
                          router.push(`/tournaments/${item.id}` as any)
                        }
                      >
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardTitle} numberOfLines={1}>
                            {item.title}
                          </Text>
                          <Text style={styles.cardCode}>
                            {item.qr_code_key}
                          </Text>
                        </View>
                        <Text style={styles.cardStatus}>
                          Estado: {getStatusLabel(item.status)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}

                <WoodButton
                  title="Volver al Menú"
                  variant="secondary"
                  onPress={() => router.replace("/")}
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
    marginBottom: 10,
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
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#4A3319",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#5A442E",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 18,
  },
  list: {
    flex: 1,
    marginBottom: 6,
  },
  listContent: {
    paddingVertical: 4,
  },
  tournamentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 1,
    borderColor: "#B0A08A",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2D1A0E",
    flex: 1,
    marginRight: 8,
  },
  cardCode: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2D5A27",
    backgroundColor: "rgba(45, 90, 39, 0.12)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardStatus: {
    fontSize: 12,
    color: "#5A442E",
  },
});
