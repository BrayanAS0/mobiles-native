import { ThemedText } from "@/components/ThemedText";
import { useUserStore } from "@/store/useUserStore";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStoreId } from '../../store/useUserStore';
import { ThemedView } from "@/components/ThemedView";

export default function Config() {
  // ✅ Zustand (hooks deben ir DENTRO del componente)
  const username = useUserStore((state) => state.username);
  const userId = useUserStoreId((state) => state.id);

  // ✅ Nativewind dark mode
  const { colorScheme, setColorScheme } = useColorScheme();

  // ✅ Estado del switch sincronizado con el tema
  const [darkModeSetting, setDarkModeSetting] = useState({
    darkMode: colorScheme === "dark",
    systemMode: false,
  });

  // ✅ Mantener estado sincronizado con colorScheme si cambia externamente
  useEffect(() => {
    setDarkModeSetting((prev) => ({
      ...prev,
      darkMode: colorScheme === "dark",
    }));
  }, [colorScheme]);

  const setDarkMode = (value: boolean) => {
    setColorScheme(value ? "dark" : "light");
    setDarkModeSetting({
      darkMode: value,
      systemMode: false,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title" className="text-xl mb-4">
        Configuración
      </ThemedText>

      <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>
        Bienvenido, {username || "Usuario"} 👋
      </ThemedText>
      <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>
        Bienvenido, {userId || "Usuario"} 👋
      </ThemedText>
      <ThemedView className=" dark:bg-black" >
        <Text style={{ marginBottom: 8 }}>Tema oscuro</Text>
        <Switch
          value={darkModeSetting.darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeSetting.darkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </ThemedView>

      <Pressable
        onPress={() => console.log("Otra acción")}
        style={{ marginTop: 20 }}
      >
        <ThemedText className="text-white bg-blue-500 px-4 py-2 rounded-xl text-center">
          Botón adicional
        </ThemedText>
      </Pressable>
    </SafeAreaView>
  );
}
