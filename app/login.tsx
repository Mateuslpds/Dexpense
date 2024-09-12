import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Text, View, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado para controlar visibilidade da senha

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuário logado: ', userCredential.user);
        navigation.navigate('(logged)' as never);
      } catch (error) {
        console.error('Erro ao fazer login: ', error);
      }
    } else {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Image
        source={require('../assets/images/logo_dexpense.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Dexpense</Text>
      <Text style={styles.subtitle}>Tela de Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#808080"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Senha"
          value={password}
          secureTextEntry={!showPassword} // Alterna entre ocultar/mostrar
          onChangeText={setPassword}
          placeholderTextColor="#808080"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btngreen}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Não tem conta?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('register' as never)}>
          <Text style={styles.link}>Registre-se</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  btngreen: {
    backgroundColor: '#9FD078',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 50,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  inputPassword: {
    flex: 1,
    height: '100%',
  },
  showButton: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  showText: {
    color: '#9FD078',
    fontWeight: 'bold',
  },
  link: {
    fontSize: 18,
    color: '#9FD078',
    textDecorationLine: 'underline',
  },
 
});
