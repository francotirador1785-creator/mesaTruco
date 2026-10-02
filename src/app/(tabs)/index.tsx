import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🃏 MesaTruco</Text>
        <Text style={styles.subtitle}>Gestor de Torneos de Truco</Text>

        <Link href="/tournaments/create" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>+ Crear Torneo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#94a3b8", marginBottom: 32 },
  button: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 },
});
