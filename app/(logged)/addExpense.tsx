import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, Text } from 'react-native';

import { db, auth } from '../../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';

export default function AddExpenseScreen() {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleAddExpense = async () => {
    try{
      const user = auth.currentUser;
      const userId = user.uid;

      await addDoc(collection(db, 'expenses'), {
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
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Adicionar despesa</Text>
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
      />
      <Button
        title="Adicionar"
        onPress={handleAddExpense}
      />
    </View>
  )
}