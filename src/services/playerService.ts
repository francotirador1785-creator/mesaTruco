import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PlayerProfile {
  id: string;
  name: string;
  alias: string;
  avatar_url?: string;
}

const PLAYER_STORAGE_KEY = "@mesatruco_user_profile";

export const PlayerService = {
  // 1. Obtener perfil guardado en el dispositivo
  getLocalProfile: async (): Promise<PlayerProfile | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(PLAYER_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Error leyendo perfil local:", e);
      return null;
    }
  },

  // 2. Guardar perfil localmente
  saveLocalProfile: async (profile: PlayerProfile): Promise<void> => {
    try {
      await AsyncStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Error guardando perfil local:", e);
    }
  },

  // 3. Login rápido / Registro en Supabase
  loginOrRegister: async (
    name: string,
    alias: string,
  ): Promise<PlayerProfile | null> => {
    try {
      const cleanAlias = alias.trim().toLowerCase();
      const cleanName = name.trim();

      // Buscar si el alias ya existe en Supabase
      const { data: existingPlayer, error: searchError } = await supabase
        .from("players")
        .select("*")
        .eq("alias", cleanAlias)
        .single();

      if (existingPlayer) {
        // Si ya existe, usaremos ese perfil
        const profile: PlayerProfile = {
          id: existingPlayer.id,
          name: existingPlayer.name,
          alias: existingPlayer.alias,
          avatar_url: existingPlayer.avatar_url,
        };
        await PlayerService.saveLocalProfile(profile);
        return profile;
      }

      // Si no existe, registrar nuevo jugador en Supabase
      const { data: newPlayer, error: insertError } = await supabase
        .from("players")
        .insert([{ name: cleanName, alias: cleanAlias }])
        .select()
        .single();

      if (insertError) throw insertError;

      const profile: PlayerProfile = {
        id: newPlayer.id,
        name: newPlayer.name,
        alias: newPlayer.alias,
        avatar_url: newPlayer.avatar_url,
      };

      await PlayerService.saveLocalProfile(profile);
      return profile;
    } catch (error) {
      console.error("Error en Login Rápido:", error);
      return null;
    }
  },

  // 4. Cerrar sesión local
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(PLAYER_STORAGE_KEY);
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  },
};
