import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { 
  Fredoka_400Regular, 
  Fredoka_500Medium, 
  Fredoka_700Bold 
} from '@expo-google-fonts/fredoka';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';

// Impede que a tela de splash suma antes das fontes carregarem
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Fredoka_400Regular, //[cite: 5]
    Fredoka_500Medium,  //[cite: 5]
    Fredoka_700Bold,    //[cite: 5]
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // O <Slot /> renderiza as rotas filhas (como o nosso index.tsx ou login.tsx)
  return <Slot />;
}