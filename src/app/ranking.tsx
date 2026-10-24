import WoodButton from "@/components/Button";
import { IMAGES } from "@/constants/images";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RankingScreen() {
  const router = useRouter();

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
              <Text style={styles.bannerTitle}>RANKING</Text>
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
                <Text style={styles.sheetTitle}>Tabla de Posiciones 🏆</Text>
                <Text style={styles.subtitle}>
                  El ranking general se actualizará a medida que finalicen los
                  torneos y partidas registradas.
                </Text>

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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#5A442E",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
});
