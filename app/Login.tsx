import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

import { api } from "@/api/axiosClient";
export default function LoginScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
useEffect(()=>{
fetchUsers();



  
},[])
const fetchUsers = async () => {
    try {
        const data = await api.get("WeatherForecast/prueba1");
        console.log("Usuarios:", data);
    } catch (error) {

    }
};
    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            setError("");
            router.replace("/(tabs)"); 
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <ThemedView className="flex-1 items-center justify-center bg-red-500 px-6">
            <ThemedText type="title" className="text-white text-3xl mb-8">Login</ThemedText>

            <TextInput
                placeholder="Usuario"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
                className="w-full bg-white p-4 rounded-2xl mb-4 text-black"
            />

            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full bg-white p-4 rounded-2xl mb-4 text-black"
            />

            {error ? <Text className="text-yellow-300 mb-4">{error}</Text> : null}

            <TouchableOpacity
                onPress={fetchUsers}
                className="w-full bg-black p-4 rounded-2xl items-center mb-4"
            >
                <Text className="text-white font-bold text-lg">Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/Register")}>
            <ThemedText className="text-white underline">¿No tienes cuenta? Regístrate</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}
