import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import {
  TournamentDetails,
  TournamentService,
} from "@/services/tournamentService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function TournamentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [details, setDetails] = useState<TournamentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [id]);

  const loadDetails = async () => {
    if (!id) return;
    setLoading(true);
    const data = await TournamentService.getTournamentDetails(id);
    setDetails(data);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Esperando Jugadores ⏳", color: "#8A5A1A" };
      case "in_progress":
        return { label: "Torneo en Juego 🔥", color: "#2D5A27" };
      case "completed":
        return { label: "Finalizado 🏆", color: "#1E3A8A" };
      default:
        return { label: status, color: "#4A3319" };
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
              <Text style={styles.bannerTitle}>TORNEO</Text>
            </ImageBackground>
          </View>

          {/* Tarjeta Hoja Arrancada - SE VE ENTERA (CONTAIN) */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet1}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                {loading ? (
                  <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#4A3319" />
                    <Text style={styles.loadingText}>Cargando torneo...</Text>
                  </View>
                ) : !details ? (
                  <View style={styles.centerContainer}>
                    <Text style={styles.errorTitle}>Torneo no encontrado</Text>
                    <Text style={styles.errorSubtitle}>
                      No pudimos encontrar ningún torneo con el código o ID: "{id}".
                    </Text>
                    <WoodButton
                      title="Volver"
                      variant="secondary"
                      onPress={() => router.back()}
                    />
                  </View>
                ) : (
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={true}
                  >
                    {/* Título y Estado */}
                    <Text style={styles.tournamentTitle}>
                      {details.tournament.title}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            getStatusBadge(details.tournament.status).color + "22",
                          borderColor: getStatusBadge(details.tournament.status).color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: getStatusBadge(details.tournament.status).color,
                          },
                        ]}
                      >
                        {getStatusBadge(details.tournament.status).label}
                      </Text>
                    </View>

                    {/* Código QR y Clave para compartir */}
                    <View style={styles.qrSection}>
                      <View style={styles.qrWrapper}>
                        <QRCode
                          value={details.tournament.qr_code_key}
                          size={110}
                          color="#2D1A0E"
                          backgroundColor="#FFFFFF"
                        />
                      </View>
                      <Text style={styles.qrLabel}>Código para unirse:</Text>
                      <Text style={styles.qrCodeText}>
                        {details.tournament.qr_code_key}
                      </Text>
                    </View>

                    {/* Parejas armadas si existen */}
                    {details.teams.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                          Parejas ({details.teams.length})
                        </Text>
                        {details.teams.map((team, idx) => (
                          <View key={team.id || idx} style={styles.teamItem}>
                            <Text style={styles.teamName}>{team.name}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Partidos si existen */}
                    {details.matches.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                          Partidos ({details.matches.length})
                        </Text>
                        {details.matches.map((m, idx) => (
                          <View key={m.id || idx} style={styles.matchItem}>
                            <Text style={styles.matchText}>
                              Ronda {m.round}: {m.score_a} - {m.score_b} ({m.status})
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Botones de Navegación */}
                    <View style={styles.actionsContainer}>
                      <WoodButton
                        title="Mis Torneos"
                        variant="secondary"
                        onPress={() =>
                          router.push("/tournaments/my-tournaments" as any)
                        }
                      />
                      <WoodButton
                        title="Menú Principal"
                        variant="primary"
                        onPress={() => router.replace("/")}
                      />
                    </View>
                  </ScrollView>
                )}
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
  scrollView: { width: "100%", flex: 1 },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#4A3319",
    fontWeight: "600",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7A201A",
    marginBottom: 6,
  },
  errorSubtitle: {
    fontSize: 13,
    color: "#5A442E",
    textAlign: "center",
    marginBottom: 12,
  },
  tournamentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D1A0E",
    textAlign: "center",
    marginBottom: 6,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  qrSection: {
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B0A08A",
    width: "100%",
  },
  qrWrapper: {
    padding: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginBottom: 6,
  },
  qrLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5A442E",
  },
  qrCodeText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#2D5A27",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  section: {
    width: "100%",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 4,
  },
  teamItem: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D1A0E",
  },
  matchItem: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  matchText: {
    fontSize: 12,
    color: "#2D1A0E",
  },
  actionsContainer: {
    width: "100%",
    marginTop: 10,
  },
});
