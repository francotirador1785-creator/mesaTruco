import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      {/* Pantalla principal del Menú Truco */}
      <Stack.Screen name="index" />

      {/* Flujo de registro / login rápido */}
      <Stack.Screen name="login" />

      {/* Perfil del jugador */}
      <Stack.Screen name="profile" />

      {/* Ranking */}
      <Stack.Screen name="ranking" />

      {/* Flujos de Torneo */}
      <Stack.Screen
        name="tournaments/create"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="tournaments/join"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="tournaments/my-tournaments" />
      <Stack.Screen name="tournaments/[id]" />
    </Stack>
  );
}
