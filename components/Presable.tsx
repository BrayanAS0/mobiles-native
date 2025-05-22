import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedViewProps } from "./ThemedView";

type CustomPressableProps = ThemedViewProps & {
  onPress?: (event: GestureResponderEvent) => void;
};

export default function CustomPressable({
  id,
  style,
  lightColor,
  darkColor,
  onPress,
  ...otherProps
}: CustomPressableProps) {
  //   const theme = useColorScheme() ?? 'light';
  //     const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <TouchableOpacity
      className="bg-stone-300 m-0 p-6 rounded-lg dark:bg-stone-800 active:opacity-80"
      onPress={onPress}
    >
      <ThemedText className="text-white dark:text-black font-semibold text-center">
        {otherProps.children}
      </ThemedText>
    </TouchableOpacity>
  );
}