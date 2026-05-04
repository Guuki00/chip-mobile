import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { theme } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // Estados de erro
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Validação de E-mail via Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('O e-mail é obrigatório.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Insira um formato de e-mail válido.');
      isValid = false;
    }

    // Validação de Senha
    if (!password) {
      setPasswordError('A senha é obrigatória.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // TODO: Integrar autenticação Firebase (signInWithEmailAndPassword)
    setTimeout(() => {
      setIsLoading(false);

      router.replace('/(hub)/dashboard'); 
    }, 1500);
  };

  const handleRegister = () => {
    // TODO: Navegar para tela de registro do Expo Router -> router.push('/register')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Pronto para manter o foco hoje?</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="E-mail"
              placeholder="estudante@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              error={emailError}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError(''); // Limpa o erro ao digitar
              }}
            />

            <Input
              label="Senha"
              placeholder="Sua senha secreta"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              error={passwordError}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(''); // Limpa o erro ao digitar
              }}
            />

            <Button 
              title="Entrar" 
              onPress={handleLogin} 
              isLoading={isLoading} 
            />

            <Button 
              title="Criar nova conta" 
              variant="ghost" 
              onPress={handleRegister} 
              disabled={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Garante que a imagem quadrada fique perfeitamente redonda
    overflow: 'hidden',
    marginBottom: 24,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.accent,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
});