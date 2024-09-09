import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { Alert, View, TextInput, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Opa!', 'Preencha todos os campos!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
      });

      await updateProfile(user, {
        displayName: name,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('login' as never);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Opa!', 'Este email já está em uso. Por favor, use outro email.'); 
      } else {
        console.error('Erro ao registrar:', error.message);
        Alert.alert('Opa!', 'Não foi possível registrar o usuário.');
      }
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
      <Text style={styles.subtitle}>Tela de Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.btngreen} 
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Já possui conta?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('login' as never)}>
          <Text style={styles.link}>Entrar.</Text>
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