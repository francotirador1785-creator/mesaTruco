import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
      }}
    >
      <Text style={{ color: "#ffffff", fontSize: 18 }}>
        🏅 Perfil del Jugador
      </Text>
    </View>
  );
}
