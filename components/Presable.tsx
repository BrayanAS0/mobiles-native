import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedViewProps } from "./ThemedView";

export default  function CustomPressable({ style, lightColor, darkColor, ...otherProps }:ThemedViewProps){
    //   const theme = useColorScheme() ?? 'light';
    //     const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
      
    return (
        
        <TouchableOpacity
  className="bg-stone-300 m-0 p-6 rounded-lg dark:bg-stone-800 active:opacity-80"
  onPress={() => console.log('Pressed!')}
>
  <ThemedText className="text-white dark:text-black font-semibold text-center">
    Presióname
  </ThemedText>
</TouchableOpacity>


    )
}