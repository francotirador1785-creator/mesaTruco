import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("SUPABASE DATA:", data);
      console.log("SUPABASE ERROR:", error);
    };

    testConnection();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        MesaTruco - Conectado 🃏
      </Text>
    </View>
  );
}
