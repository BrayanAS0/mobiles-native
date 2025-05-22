import { api } from "@/api/axiosClient";
import CustomPressable from "@/components/Presable";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

interface Movement {
  id: number;
  userId: number;
  materialId: number;
  date: string;
  quantityChanged: number;
}

export default function MovementHistory() {
  const [movements, setMovements] = useState<Movement[]>([]);
    const fetchMovements = async () => {
      try {
        const res = await api.get("api/Movement/GetMovements"); 
        setMovements(res);
      } catch (error) {
        console.error("❌ Error al obtener movimientos:", error);
      }
    };
  useEffect(() => {


    fetchMovements();
  }, []);

return (
  <SafeAreaView className="flex-1 bg-white dark:bg-black">
    <ThemedView className="flex-1 px-4 pt-4">
      <ThemedText className="text-2xl font-bold mb-4 text-black dark:text-white">
      </ThemedText>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1"
      >
        {movements.length === 0 ? (
          <Text className="text-gray-600 dark:text-gray-400">
            No hay movimientos registrados.
          </Text>
        ) : (
          movements.map((mov) => (
            <View
              key={mov.id}
              className="mb-4 p-4 bg-gray-100 dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-300 dark:border-neutral-700"
            >
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                🆔 Movimiento ID: {mov.id}
              </Text>
              <Text className="text-base text-black dark:text-white">
                📦 Material ID: {mov.materialId}
              </Text>
              <Text className="text-base text-black dark:text-white">
                👤 Usuario ID: {mov.userId}
              </Text>
              <Text className="text-base text-black dark:text-white">
                🔢 Cambio: {mov.quantityChanged}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                🕒 Fecha: {new Date(mov.date).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <View className="pb-4">
        <CustomPressable
          onPress={() => fetchMovements()}
          className="p-3 bg-blue-500 rounded-xl"
        >
          <ThemedText className="text-center text-white font-semibold">
            🔄 Volver a cargar movimientos
          </ThemedText>
        </CustomPressable>
      </View>
    </ThemedView>
  </SafeAreaView>
);

}
