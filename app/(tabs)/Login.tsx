import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
    return (
        <ThemedView className="flex-1 items-center justify-center bg-red-500">
        <ThemedText type="title">Login</ThemedText>
        </ThemedView>
    );
    }