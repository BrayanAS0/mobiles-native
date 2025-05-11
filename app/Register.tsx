import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { api } from "@/api/axiosClient";

export default function RegisterScreen({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
if(username !== "" && password != ""){
            console.log(`Registrado: ${username}`);
        router.push("/Login")
        } 
    else{
        setError("Por favor, completa todos los campos.");
        }
    
    };

    return (
        <ThemedView className="flex-1 items-center justify-center bg-blue-500 px-6">
            <ThemedText type="title" className="text-white text-3xl mb-8">
                Registro
            </ThemedText>

            <TextInput
                placeholder="Nuevo Usuario"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
                className="w-full bg-white p-4 rounded-2xl mb-4 text-black"
            />

            <TextInput
                placeholder="Nueva Contraseña"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full bg-white p-4 rounded-2xl mb-6 text-black"
            />
{error ? (
                <Text className="text-yellow-700 mb-4">{error}</Text>
            ) : null}
            <TouchableOpacity
                onPress={handleRegister}
                className="w-full bg-black p-4 rounded-2xl items-center"
            >
                <Text className="text-white font-bold text-lg">Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Login")}>
                <ThemedText className="text-white underline">¿Ya tienes cuenta? Inicia Secion</ThemedText>
            </TouchableOpacity>
            
        </ThemedView>
    );
}
