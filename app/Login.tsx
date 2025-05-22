import { api } from "@/api/axiosClient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUserStore, useUserStoreId } from "@/store/useUserStore"; // Zustand
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const setUser = useUserStore((state) => state.setUsername);
const setId = useUserStoreId ((id)=> id.setUserId)
  const fetchUsers = async () => {
    try {
      if (username !== "" && password !== "") {
        const data = await api.get(`api/User/Login/${username}/${password}`);

        if (data) {
          console.log("✅ Usuario encontrado:", data);
          setUser(data.name);
          setId(data.id);

          router.replace("/(tabs)");
        } else {
          setError("Usuario o contraseña incorrectos.");
          console.log("⚠️ Usuario o contraseña incorrectos.");
        }
      } else {
        setError("Por favor, ingresa usuario y contraseña.");
        console.log("⚠️ Por favor, ingresa usuario y contraseña.");
      }
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  return (
    <ThemedView className="flex-1 items-center justify-center bg-red-500 px-6">
      <ThemedText type="title" className="text-white text-3xl mb-8 p-2">
        Login
      </ThemedText>

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
        className="w-full bg-gray-100 p-4 rounded-2xl mb-4 text-black"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-gray-100 p-4 rounded-2xl mb-4 text-black"
      />

      {error ? (
        <Text className="text-yellow-300 mb-4">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={fetchUsers}
        className="w-full bg-black p-4 rounded-2xl items-center mb-4"
      >
        <Text className="text-white font-bold text-lg">Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <ThemedText className="text-white underline">
          ¿No tienes cuenta? Regístrate
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
