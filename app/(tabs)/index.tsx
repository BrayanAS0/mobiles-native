import { api } from "@/api/axiosClient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { colorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStoreId } from "../../store/useUserStore";

interface Material {
  id: number;
  name: string;
  description: string;
  quantity: number;
  idealQuantity: number;
}

export default function HomeScreen() {
  const userId = useUserStoreId((state) => state.id);

  const [material, setMaterial] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Material | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [edited, setEdited] = useState<Partial<Material>>({});
  const [realQuantity, setRealQuantity] = useState<number | undefined>(undefined);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: "",
    description: "",
    quantity: undefined,
  });

  const fetchMaterials = async () => {
    try {
      const res = await api.get("api/Material/GetMaterial");
      setMaterial(res);
    } catch (error) {
      console.error("❌ Error al obtener materiales:", error);
      setMaterial([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleOpenEdit = (item: Material) => {
    setSelected(item);
    setRealQuantity(item.quantity);
    setEdited(item);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!edited.id) return;

    try {
      const movementData = {
        userId: userId,
        materialId: edited.id!,
        date: new Date().toISOString(),
        quantityChanged: edited.quantity,
        realQuantity: realQuantity,
      };

      console.log("Movement Data:", movementData);
      await api.put(`api/Material/EditMaterial/${edited.id}`, edited);
      await api.post(`api/Movement/CreateMovement`, movementData);
      fetchMaterials();
      setModalVisible(false);
    } catch (error) {
      console.error("❌ Error al actualizar material:", error);
    }
  };

  if (loading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Cargando materiales...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-gray-100 dark:bg-black">
      <SafeAreaView className="flex-1 px-4 pt-4">
        <Text className="text-4xl font-bold text-center text-black dark:text-white mb-4 p-3">
          📦 Materiales
        </Text>

        <TouchableOpacity
          onPress={() => setCreateModalVisible(true)}
          className="bg-blue-600 rounded-xl py-3 items-center mb-4"
        >
          <Text className="text-white font-bold text-base">➕ Agregar Material</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {material.map((item) => (
            <ThemedView
              key={item.id}
              className="mb-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 shadow-sm"
            >
              <TouchableOpacity onPress={() => handleOpenEdit(item)}>
                <ThemedText className="text-lg font-semibold text-black dark:text-white mb-1">
                  {item.name}
                </ThemedText>
                <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ScrollView>

<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ flex: 1, width: "100%" }}
    >
      <ThemedView className="flex-1 bg-black/60 px-4 justify-center">
        <SafeAreaView className="flex-1 justify-center">
          <ThemedView className="w-full max-w-md self-center bg-white dark:bg-neutral-900 rounded-2xl p-6 space-y-6 shadow-2xl border border-gray-300 dark:border-neutral-700">
            <ThemedText className="text-2xl font-extrabold text-center text-black dark:text-white">
              ✏️ Editar Cantidad
            </ThemedText>

            <ThemedText className="text-sm font-semibold text-black dark:text-white">Nombre</ThemedText>
            <Text className="text-base text-black dark:text-white">{edited.name}</Text>

            <ThemedText className="text-sm font-semibold text-black dark:text-white">Descripción</ThemedText>
            <Text className="text-base text-black dark:text-white">{edited.description}</Text>

            <ThemedText className="text-sm font-semibold text-black dark:text-white">Cantidad</ThemedText>
            <TextInput
              keyboardType="numeric"
              className="border border-blue-400 dark:border-blue-500 bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 text-base text-black dark:text-white"
              placeholder="Cantidad"
              placeholderTextColor={colorScheme.get() === "dark" ? "#aaa" : "#666"}
              value={edited.quantity?.toString()}
              onChangeText={(text) =>
                setEdited({ ...edited, quantity: text ? parseInt(text) : undefined })
              }
            />

            <View className="flex-row justify-between space-x-3 mt-2">
              <TouchableOpacity
                className="flex-1 bg-gray-300 dark:bg-neutral-700 rounded-xl py-3 items-center"
                onPress={() => setModalVisible(false)}
              >
                <ThemedText className="text-black dark:text-white font-semibold">❌ Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-green-500 rounded-xl py-3 items-center"
                onPress={handleSave}
              >
                <ThemedText className="text-white font-semibold">💾 Guardar</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
</Modal>

   <Modal
  visible={createModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setCreateModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ flex: 1, width: "100%" }}
    >
      <ThemedView className="flex-1 bg-black/60 px-4 justify-center">
        <SafeAreaView className="flex-1 justify-center">
          <ThemedView className="w-full max-w-md self-center bg-white dark:bg-neutral-900 rounded-2xl p-6 space-y-4 shadow-xl border border-gray-300 dark:border-neutral-700">
            <ThemedText className="text-xl font-bold text-center text-black dark:text-white">
              ➕ Nuevo Material
            </ThemedText>

            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#999"
              className="border p-3 rounded-xl text-black dark:text-white bg-gray-100 dark:bg-neutral-800"
              value={newMaterial.name}
              onChangeText={(text) => setNewMaterial({ ...newMaterial, name: text })}
            />
            <TextInput
              placeholder="Descripción"
              placeholderTextColor="#999"
              className="border p-3 rounded-xl text-black dark:text-white bg-gray-100 dark:bg-neutral-800"
              value={newMaterial.description}
              onChangeText={(text) => setNewMaterial({ ...newMaterial, description: text })}
            />
            <TextInput
              placeholder="Cantidad inicial"
              keyboardType="numeric"
              placeholderTextColor="#999"
              className="border p-3 rounded-xl text-black dark:text-white bg-gray-100 dark:bg-neutral-800"
              value={newMaterial.quantity?.toString()}
              onChangeText={(text) =>
                setNewMaterial({ ...newMaterial, quantity: text ? parseInt(text) : undefined })
              }
            />


            <View className="flex-row justify-between space-x-3 mt-4">
              <TouchableOpacity
                className="flex-1 bg-gray-400 py-3 rounded-xl items-center"
                onPress={() => setCreateModalVisible(false)}
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-green-600 py-3 rounded-xl items-center"
                onPress={async () => {
                  try {
                    await api.post("api/Material/CreateMaterial", newMaterial);
                    fetchMaterials();
                    setCreateModalVisible(false);
                    setNewMaterial({
                      name: "",
                      description: "",
                      quantity: undefined,
                    });
                  } catch (error) {
                    console.error("❌ Error al crear material:", error);
                  }
                }}
              >
                <Text className="text-white font-bold">Guardar</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
</Modal>

      </SafeAreaView>
    </ThemedView>
  );
}
