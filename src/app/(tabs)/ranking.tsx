import { Text, View } from "react-native";

export default function RankingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
      }}
    >
      <Text style={{ color: "#ffffff", fontSize: 18 }}>📊 Ranking General</Text>
    </View>
  );
}
