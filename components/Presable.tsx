import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedViewProps } from "./ThemedView";

type CustomPressableProps = ThemedViewProps & {
  onPress?: (event: GestureResponderEvent) => void;
};

export default function CustomPressable({
  style,
  lightColor,
  darkColor,
  onPress,
  ...otherProps
}: CustomPressableProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-2xl px-5 py-4 mb-4 shadow-sm dark:shadow-md active:opacity-80"
    >
      <ThemedText className="text-black dark:text-white font-semibold text-base text-center">
        {otherProps.children}
      </ThemedText>
    </TouchableOpacity>
  );
}
