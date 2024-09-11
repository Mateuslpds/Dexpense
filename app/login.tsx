import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';

//bgl do firebase
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        placeholderTextColor="#808080" // Cor do texto do placeholder
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#808080" // Cor do texto do placeholder
      />
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
  container: { //oxe
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { //imagem do logo
    width: 200,
    height: 200,
  },
  title: { //titulo do app
    fontSize: 32, 
    fontWeight: 'bold',  
    color: '#333',
    marginBottom: 10,
    marginTop: 8,
  },
  subtitle: { //subtitulo do app
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
    borderRadius:50,
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
    borderRadius:50,
    borderWidth: 1, 
    marginBottom: 10, 
    paddingHorizontal: 20 
  },
  link: {
    fontSize: 18,
    color: '#9FD078',
    textDecorationLine: 'underline',
  },
});