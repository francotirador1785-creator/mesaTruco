import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Carga el flujo de pestañas principales */}
      <Stack.Screen name="(tabs)" />

      {/* Flujos modales o pantallas secundarias de torneos */}
      <Stack.Screen
        name="tournaments/create"
        options={{
          presentation: "modal",
          title: "Crear Torneo",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="tournaments/[id]"
        options={{ title: "Detalle de Torneo", headerShown: true }}
      />
    </Stack>
  );
}
