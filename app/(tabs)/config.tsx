import { ThemedText } from "@/components/ThemedText";
import { useUserStore } from '@/store/useUserStore';
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, Switch, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Config() {
    const username = useUserStore((state) => state.username);

    const { colorScheme, setColorScheme } = useColorScheme();
    const [darkModeSetting, setDarkModeSetting] = useState({ darkMode: colorScheme === 'dark', systemMode: false });

    const setDarkMode = (value: boolean) => {
        setColorScheme(value ? 'dark' : 'light');
        setDarkModeSetting({
            darkMode: value,
            systemMode: false
        })
    }

    return (
        <SafeAreaView>
            <ThemedText >{username}</ThemedText>
            <Text>Bienvenido, {username}</Text>

            <Pressable >
                <ThemedText className=" color-white" >holallllsllll</ThemedText>
                <Switch

                    value={darkModeSetting.darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}>


                </Switch>
            </Pressable>
        </SafeAreaView>

    )


}
