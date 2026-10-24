import { IMAGES } from "@/constants/images";
import { PlayerProfile, PlayerService } from "@/services/playerService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const localProfile = await PlayerService.getLocalProfile();
    if (!localProfile) {
      router.replace("/login");
    } else {
      setProfile(localProfile);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await PlayerService.logout();
    router.replace("/login");
  };

  if (loading) {
    return (
      <View style={styles.containerLoading}>
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
          {/* Barra Perfil Superior */}
          <View style={styles.topBar}>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>¡Hola, {profile?.name}!</Text>
              <Text style={styles.aliasText}>@{profile?.alias}</Text>
            </View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutBtnText}>Salir</Text>
            </TouchableOpacity>
          </View>

          {/* Banner Pergamino Superior - MÁS GRANDE Y PROTAGÓNICO */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={IMAGES.bannerScroll}
              style={styles.bannerImage}
              resizeMode="contain"
            >
              <Text style={styles.bannerTitle}>TRUCO</Text>
            </ImageBackground>
          </View>

          {/* Menú Principal en Hoja Arrancada - SE VE ENTERA (CONTAIN), NADA RECORTADO */}
          <View style={styles.paperContainer}>
            <ImageBackground
              source={IMAGES.paperSheet1}
              style={styles.paperBackground}
              resizeMode="contain"
            >
              <View style={styles.paperContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.65}
                  onPress={() => router.push("/tournaments/create" as any)}
                >
                  <Text style={styles.menuItemText}>Crear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.65}
                  onPress={() => router.push("/tournaments/join" as any)}
                >
                  <Text style={styles.menuItemText}>Unirme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.65}
                  onPress={() =>
                    router.push("/tournaments/my-tournaments" as any)
                  }
                >
                  <Text style={styles.menuItemText}>Mis torneos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemLast]}
                  activeOpacity={0.65}
                  onPress={() => router.push("/profile" as any)}
                >
                  <Text style={styles.menuItemText}>Perfil</Text>
                </TouchableOpacity>
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
  containerLoading: {
    flex: 1,
    backgroundColor: "#0F281E",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  responsiveContent: {
    width: "100%",
    maxWidth: 480,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "web" ? 22 : 50,
    paddingBottom: 22,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    maxWidth: 460,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  aliasText: {
    color: "#E6C280",
    fontSize: 14,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E6C280",
  },
  logoutBtnText: {
    color: "#E6C280",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  // --- PERGAMINO (MÁS GRANDE, NÍTIDO Y PROTAGÓNICO) ---
  bannerContainer: {
    width: "100%",
    maxWidth: 430, // Mucho más grande y visible
    aspectRatio: 1860 / 845,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 38, // Tipografía imponente
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 4,
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  // --- HOJA ARRANCADA (SE VE COMPLETA CON CONTAIN, SIN RECORTES) ---
  paperContainer: {
    width: "100%",
    maxWidth: 470,
    aspectRatio: 1448 / 1086, // Proporción exacta de la imagen completa
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  paperBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paperContent: {
    width: "86%", // Márgenes laterales para respetar el borde de la hoja
    height: "76%", // Margen vertical para librar el rasgado superior e inferior
    marginTop: "4%", // Desplazamiento hacia abajo para no tocar la rotura
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(100, 70, 40, 0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1A0C03",
    letterSpacing: 1.5,
    textShadowColor: "rgba(255, 255, 255, 0.35)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});
