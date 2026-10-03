import { supabase } from "@/lib/supabase";

export interface Tournament {
  id: string;
  created_at: string;
  title: string;
  created_by: string;
  status: "pending" | "in_progress" | "completed";
  qr_code_key: string;
}

export interface Team {
  id: string;
  tournament_id: string;
  name: string;
  player1_id: string;
  player2_id: string;
}

export interface Match {
  id: string;
  tournament_id: string;
  round: number;
  team_a_id: string;
  team_b_id: string;
  winner_team_id?: string;
  score_a: number;
  score_b: number;
  status: "pending" | "in_progress" | "finished";
}

export const TournamentService = {
  // 1. Crear un torneo nuevo
  createTournament: async (
    title: string,
    creatorId: string,
  ): Promise<Tournament | null> => {
    try {
      // Generar un código QR único
      const qrCodeKey = `TRUCO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const { data, error } = await supabase
        .from("tournaments")
        .insert([
          {
            title: title.trim(),
            created_by: creatorId,
            qr_code_key: qrCodeKey,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Tournament;
    } catch (error) {
      console.error("Error al crear torneo:", error);
      return null;
    }
  },

  // 2. Obtener un torneo por su ID
  getTournamentById: async (
    tournamentId: string,
  ): Promise<Tournament | null> => {
    try {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("id", tournamentId)
        .single();

      if (error) throw error;
      return data as Tournament;
    } catch (error) {
      console.error("Error obteniendo torneo:", error);
      return null;
    }
  },

  // 3. Buscar torneo por Código QR
  getTournamentByQR: async (qrCodeKey: string): Promise<Tournament | null> => {
    try {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("qr_code_key", qrCodeKey.trim())
        .single();

      if (error) throw error;
      return data as Tournament;
    } catch (error) {
      console.error("Error buscando torneo por QR:", error);
      return null;
    }
  },

  // 4. Sorteo Aleatorio 🎲: Armar parejas (2 vs 2)
  generateRandomTeams: async (
    tournamentId: string,
    playerIds: string[],
  ): Promise<Team[] | null> => {
    try {
      if (playerIds.length < 4 || playerIds.length % 2 !== 0) {
        throw new Error(
          "Se requiere una cantidad par de jugadores (mínimo 4) para armar parejas 2 vs 2.",
        );
      }

      const shuffledPlayers = [...playerIds];
      for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [
          shuffledPlayers[j],
          shuffledPlayers[i],
        ];
      }

      const teamsToInsert = [];
      let teamIndex = 1;

      for (let i = 0; i < shuffledPlayers.length; i += 2) {
        teamsToInsert.push({
          tournament_id: tournamentId,
          name: `Pareja ${teamIndex}`,
          player1_id: shuffledPlayers[i],
          player2_id: shuffledPlayers[i + 1],
        });
        teamIndex++;
      }

      const { data, error } = await supabase
        .from("teams")
        .insert(teamsToInsert)
        .select();

      if (error) throw error;
      return data as Team[];
    } catch (error) {
      console.error("Error generando parejas aleatorias:", error);
      return null;
    }
  },

  // 5. Generar Brackets/Cruces Aleatorios para la Ronda 1 🏆
  generateBracketMatches: async (
    tournamentId: string,
    teams: Team[],
  ): Promise<Match[] | null> => {
    try {
      if (teams.length < 2) {
        throw new Error(
          "Se necesitan al menos 2 parejas para iniciar el torneo.",
        );
      }

      const shuffledTeams = [...teams];
      for (let i = shuffledTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTeams[i], shuffledTeams[j]] = [
          shuffledTeams[j],
          shuffledTeams[i],
        ];
      }

      const matchesToInsert = [];
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        const teamB = shuffledTeams[i + 1];

        matchesToInsert.push({
          tournament_id: tournamentId,
          round: 1,
          team_a_id: shuffledTeams[i].id,
          team_b_id: teamB ? teamB.id : null,
          winner_team_id: teamB ? null : shuffledTeams[i].id,
          score_a: 0,
          score_b: 0,
          status: teamB ? "pending" : "finished",
        });
      }

      const { data, error } = await supabase
        .from("matches")
        .insert(matchesToInsert)
        .select();

      if (error) throw error;

      await supabase
        .from("tournaments")
        .update({ status: "in_progress" })
        .eq("id", tournamentId);

      return data as Match[];
    } catch (error) {
      console.error("Error generando cruces de torneo:", error);
      return null;
    }
  },

  // 6. Cargar o actualizar resultado de una partida
  updateMatchScore: async (
    matchId: string,
    scoreA: number,
    scoreB: number,
    winnerTeamId: string,
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("matches")
        .update({
          score_a: scoreA,
          score_b: scoreB,
          winner_team_id: winnerTeamId,
          status: "finished",
        })
        .eq("id", matchId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error actualizando partido:", error);
      return false;
    }
  },
};
