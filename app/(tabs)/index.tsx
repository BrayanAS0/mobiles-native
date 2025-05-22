import { api } from '@/api/axiosClient';
import CustomPressable from '@/components/Presable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { colorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Material {
  id: number;
  name: string;
  description: string;
  quantity: number;
  idealQuantity: number;
}

export default function HomeScreen() {
  const [material, setMaterial] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Material | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [edited, setEdited] = useState<Partial<Material>>({});
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
    setEdited(item);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!edited.id) return;

    try {
      await api.put(`api/Material/EditMaterial/${edited.id}`, edited);

fetchMaterials()
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
    <ThemedView className="flex-1 m-0">
      <SafeAreaView className="m-0 p-0" style={{ flex: 1 }}>
        {material.map((item) => (
          <CustomPressable
            key={item.id}
            id={item.id.toString()}
            onPress={() => handleOpenEdit(item)}
          >
            {item.name}
          </CustomPressable>
        ))}





<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <ThemedView className="flex-1 justify-center items-center bg-black/60 px-4">
    <ThemedView className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl p-6 space-y-4 shadow-2xl border border-gray-200 dark:border-neutral-700">

      <ThemedText className="text-2xl font-extrabold text-center text-black dark:text-white">
        ✏️ Editar Material
      </ThemedText>

      <TextInput
        className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 text-base text-black dark:text-white"
        placeholder="📝 Nombre"
        placeholderTextColor={colorScheme.get() === 'dark' ? '#aaa' : '#666'}
        value={edited.name}
        onChangeText={(text) => setEdited({ ...edited, name: text })}
      />

      <TextInput
        className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 text-base text-black dark:text-white"
        placeholder="📄 Descripción"
        placeholderTextColor={colorScheme.get() === 'dark' ? '#aaa' : '#666'}
        value={edited.description}
        onChangeText={(text) => setEdited({ ...edited, description: text })}
      />

      <TextInput
        className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 text-base text-black dark:text-white"
        placeholder="🔢 Cantidad"
        keyboardType="numeric"
        placeholderTextColor={colorScheme.get() === 'dark' ? '#aaa' : '#666'}
        value={edited.quantity?.toString()}
        onChangeText={(text) =>
          setEdited({ ...edited, quantity: parseInt(text) })
        }
      />

      <TextInput
        className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 text-base text-black dark:text-white"
        placeholder="🎯 Cantidad ideal"
        keyboardType="numeric"
        placeholderTextColor={colorScheme.get() === 'dark' ? '#aaa' : '#666'}
        value={edited.idealQuantity?.toString()}
        onChangeText={(text) =>
          setEdited({ ...edited, idealQuantity: parseInt(text) })
        }
      />

      <ThemedView className="flex-row justify-between space-x-3 mt-4">
        <TouchableOpacity
          className="flex-1 bg-gray-300 dark:bg-neutral-700 rounded-xl py-3 items-center"
          onPress={() => setModalVisible(false)}
        >
          <ThemedText className="text-black dark:text-white font-semibold">
            ❌ Cancelar
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-green-500 rounded-xl py-3 items-center"
          onPress={handleSave}
        >
          <ThemedText className="text-white font-semibold">💾 Guardar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  </ThemedView>
</Modal>



      </SafeAreaView>
    </ThemedView>
  );
}

