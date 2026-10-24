import { Match } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BracketCardProps {
  match: Match;
  teamAName?: string;
  teamBName?: string;
}

export const BracketCard: React.FC<BracketCardProps> = ({
  match,
  teamAName = "Pareja A",
  teamBName = "Pareja B",
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.roundText}>Ronda {match.round}</Text>
      <View style={styles.matchRow}>
        <View style={styles.teamColumn}>
          <Text style={styles.teamName}>{teamAName}</Text>
          <Text style={styles.score}>{match.score_a}</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.teamColumn}>
          <Text style={styles.teamName}>{teamBName}</Text>
          <Text style={styles.score}>{match.score_b}</Text>
        </View>
      </View>
    </View>
  );
};

export default BracketCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 1.5,
    borderColor: "#B0A08A",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  roundText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#5A442E",
    marginBottom: 6,
    textAlign: "center",
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamColumn: {
    flex: 1,
    alignItems: "center",
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D1A0E",
    marginBottom: 4,
  },
  score: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2D5A27",
  },
  vs: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7A6855",
    paddingHorizontal: 8,
  },
});

