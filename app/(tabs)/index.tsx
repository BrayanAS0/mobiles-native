import CustomPressable from '@/components/Presable';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { username } = useLocalSearchParams();

  return (
    <ThemedView className="flex-1 m-0">
      <SafeAreaView className='m-0 p-0' style={{ flex: 1, padding: 0 }}>
        <Text>Bienvenido, {username}</Text>
        <CustomPressable />
      </SafeAreaView>
    </ThemedView>
  );
}
