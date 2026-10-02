import { StyleSheet, Text, View } from "react-native";

export default function CreateTournamentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Formulario para crear torneo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  text: { color: "#ffffff", fontSize: 18 },
});
