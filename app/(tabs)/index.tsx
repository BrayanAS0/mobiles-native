import CustomPressable from '@/components/Presable';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 m-0">

    <SafeAreaView className='m-0 p-0' style={{ flex: 1, padding: 0 }}>
      
      <CustomPressable />

    </SafeAreaView>
    </ThemedView>

  );
}

