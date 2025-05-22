import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login"); // Redirige siempre a Login al abrir la app
    }, []);

    return null;
}
