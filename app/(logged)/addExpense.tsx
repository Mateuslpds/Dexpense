import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { db, auth } from '../../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';

export default function AddExpenseScreen() {
  const navigation = useNavigation();

  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleAddExpense = async () => {
    try{
      const user = auth.currentUser;
      const userId = user.uid;

      await addDoc(collection(db, 'expenses2'), {
        date,
        description,
        value: parseFloat(value),
        userId
      });

      console.log('Despesa adicionada com sucesso!');
      navigation.navigate('index' as never);
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error.message);
    }
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_dexpense.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Dexpense</Text>
      <Text style={styles.subtitle}>Adicionar Despesa!</Text>

      <TextInput
        style={styles.input}
        placeholder="Adicionar descrição"
        value={description}
        onChangeText={setDescription}
      />
      
      <DateTimePicker
        //STYLE
        mode="single"
        value={date}
        onChange={(params) => setDate(params.date)}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity
        style={styles.btnyellow}
        onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
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
    marginBottom: 14,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  btnred: {
    backgroundColor: '#F18585',
    paddingVertical: 10,
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#333',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slaContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  sla: {
    fontSize: 20,
    color: '#333',
  },
  btnyellow: {
    backgroundColor: '#F9D762',
    paddingVertical: 12,  
    paddingHorizontal: 24,
    marginBottom: 90, //mega improviso
    borderRadius:  50,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
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
});
