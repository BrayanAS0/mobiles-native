import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUserStore } from "@/store/useUserStore";
import { useUserStoreId } from "../../store/useUserStore";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons"; 

export default function Config() {
  const username = useUserStore((state) => state.username);
  const userId = useUserStoreId((state) => state.id);

  const { colorScheme, setColorScheme } = useColorScheme();

  const [darkModeSetting, setDarkModeSetting] = useState({
    darkMode: colorScheme === "dark",
    systemMode: false,
  });

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
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView className="flex-1 px-6 py-8 bg-white dark:bg-neutral-900 space-y-6">
        <View className="flex-row items-center space-x-2">
          <Feather name="settings" size={24} color={colorScheme === "dark" ? "white" : "black"} />
          <ThemedText className="text-2xl font-bold text-black dark:text-white">
            Configuración
          </ThemedText>
        </View>

        <View className="rounded-2xl p-4 bg-gray-100 dark:bg-neutral-800 shadow-sm space-y-2">
          <View className="flex-row items-center space-x-2">
            <Feather name="user" size={20} color={colorScheme === "dark" ? "white" : "black"} />
            <ThemedText className="text-lg text-black dark:text-white">
              Hola, <Text className="font-semibold">{username || "Usuario"}</Text>
            </ThemedText>
          </View>

          <View className="flex-row items-center space-x-2">
            <Feather name="hash" size={20} color={colorScheme === "dark" ? "white" : "gray"} />
            <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
              ID de usuario: <Text className="font-semibold">{String(userId) || "N/A"}</Text>
            </ThemedText>
          </View>
        </View>

        <View className="flex-row justify-between items-center p-4 rounded-2xl bg-gray-100 dark:bg-neutral-800">
          <View className="flex-row items-center space-x-2">
            <Feather
              name={darkModeSetting.darkMode ? "moon" : "sun"}
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="text-base text-black dark:text-white">Tema oscuro</Text>
          </View>
          <Switch
            value={darkModeSetting.darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkModeSetting.darkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        <Pressable
          onPress={() => router.push("/login")}
          className="bg-red-500 py-4 rounded-2xl items-center mt-4 shadow-md"
        >
          <View className="flex-row items-center space-x-2">
            <Feather name="log-out" size={20} color="white" />
            <Text className="text-white text-base font-semibold">Cerrar sesión</Text>
          </View>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}
