import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Futuramente, aqui você verificará se o usuário já tem um token do Firebase.
  // Se tiver, fará um <Redirect href="/(hub)/dashboard" />
  
  // Por enquanto, mandamos direto para o Login
  return <Redirect href="/(login)/login" />;
}