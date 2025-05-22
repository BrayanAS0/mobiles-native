import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Config (){
    const {colorScheme,setColorScheme} = useColorScheme();
    const [darkModeSetting, setDarkModeSetting] = useState({darkMode:colorScheme === 'dark',systemMode:false});

    const setDarkMode = (value:boolean) => {
        setColorScheme(value ? 'dark' : 'light');
setDarkModeSetting({
    darkMode:value,
    systemMode:false
})
    }
const setSystemMode = (value:boolean) => {
    setDarkModeSetting({
        darkMode:colorScheme === 'dark',
        systemMode:value

    })
}
    return (
        <SafeAreaView>
<Pressable >
<ThemedText className=" color-white" >holallllllll</ThemedText>
<Switch

    value={darkModeSetting.darkMode}
    onValueChange={setDarkMode}
    trackColor={{ false: "#767577", true: "#81b0ff" }}>


</Switch>
</Pressable>
</SafeAreaView>
        
    )


}
