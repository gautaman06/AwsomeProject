import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ModalPortal } from 'react-native-modals';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <ModalPortal />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
