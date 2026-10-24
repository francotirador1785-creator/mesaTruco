import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { PlayerProfile, PlayerService } from "@/services/playerService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await PlayerService.getLocalProfile();
    if (!data) {
      router.replace("/login");
      return;
    }
    setProfile(data);
    setLoading(false);
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Seguro que querés salir de tu cuenta en este dispositivo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => {
            await PlayerService.logout();
            router.replace("/login");
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E6C280" />
      </View>
    );
  }

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
              <Text style={styles.bannerTitle}>MI PERFIL</Text>
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
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : "🃏"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>NOMBRE</Text>
                  <Text style={styles.value}>{profile?.name}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>ALIAS / APODO</Text>
                  <Text style={styles.aliasValue}>@{profile?.alias}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>ID DE JUGADOR</Text>
                  <Text style={styles.idValue} numberOfLines={1}>
                    {profile?.id}
                  </Text>
                </View>

                <WoodButton
                  title="Cerrar Sesión"
                  variant="danger"
                  onPress={handleLogout}
                />

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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F281E",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 10,
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
    letterSpacing: 2,
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2D5A27",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#E6C280",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  infoRow: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 70, 40, 0.22)",
    paddingBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#5A442E",
    letterSpacing: 1,
    marginBottom: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D1A0E",
  },
  aliasValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D5A27",
  },
  idValue: {
    fontSize: 10,
    color: "#7A6855",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
