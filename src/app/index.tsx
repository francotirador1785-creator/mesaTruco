import { IMAGES } from "@/constants/images";
import { PlayerProfile, PlayerService } from "@/services/playerService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
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
      <View style={[styles.containerLoading]}>
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
        {/* Barra Perfil Superior */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.welcomeText}>¡Hola, {profile?.name}!</Text>
            <Text style={styles.aliasText}>@{profile?.alias}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>Salir</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Pergamino Superior */}
        <ImageBackground
          source={IMAGES.bannerScroll}
          style={styles.bannerContainer}
          resizeMode="contain"
        >
          <Text style={styles.bannerTitle}>TRUCO</Text>
        </ImageBackground>

        {/* Menú Principal en Hoja Arrancada */}
        <ImageBackground
          source={IMAGES.paperSheet1}
          style={styles.paperSheet}
          imageStyle={styles.paperImageStyle}
          resizeMode="stretch"
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/tournaments/create" as any)}
          >
            <Text style={styles.menuItemText}>Crear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/tournaments/join" as any)}
          >
            <Text style={styles.menuItemText}>Unirme</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/tournaments/my-tournaments" as any)}
          >
            <Text style={styles.menuItemText}>Mis torneos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile" as any)}
          >
            <Text style={styles.menuItemText}>Perfil</Text>
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
  containerLoading: {
    flex: 1,
    backgroundColor: "#0F281E",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  aliasText: {
    color: "#E6C280",
    fontSize: 14,
  },
  logoutBtn: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E6C280",
  },
  logoutBtnText: {
    color: "#E6C280",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerContainer: {
    width: 280,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  bannerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 2,
  },
  paperSheet: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 12,
  },
  paperImageStyle: {
    borderRadius: 12,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(100, 70, 40, 0.2)",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A0C03",
  },
});
