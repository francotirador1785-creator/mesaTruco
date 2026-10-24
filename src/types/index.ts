export interface PlayerProfile {
  id: string;
  name: string;
  alias: string;
  avatar_url?: string;
}

export type TournamentStatus = "pending" | "in_progress" | "completed";

export interface Tournament {
  id: string;
  created_at: string;
  title: string;
  created_by: string;
  status: TournamentStatus;
  qr_code_key: string;
}

export interface Team {
  id: string;
  tournament_id: string;
  name: string;
  player1_id: string;
  player2_id: string;
}

export type MatchStatus = "pending" | "in_progress" | "finished";

export interface Match {
  id: string;
  tournament_id: string;
  round: number;
  team_a_id: string;
  team_b_id: string | null;
  winner_team_id?: string | null;
  score_a: number;
  score_b: number;
  status: MatchStatus;
}

export interface TournamentDetails {
  tournament: Tournament;
  teams: Team[];
  matches: Match[];
}

