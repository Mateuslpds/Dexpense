import { db } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';

export default function EditExpenseScreen() {
  const { id, description: initialDescription, value: initialValue } = useLocalSearchParams();

  const [description, setDescription] = useState(initialDescription || '');
  const [value, setValue] = useState(initialValue ? initialValue.toString() : '');
  const router = useRouter();

  const handleSave = async () => {
    if (!id) return;

    const expenseRef = doc(db, 'expenses', id);
    await updateDoc(expenseRef, {
      description,
      value: parseFloat(value),
    });
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Editar Despesa</Text>

      <Text style={{ marginVertical: 10 }}>Descrição Atual: {initialDescription}</Text>

      <Text style={{ marginVertical: 10 }}>Quantia Atual: {initialValue}</Text>

      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
      />
      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder="Valor"
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
