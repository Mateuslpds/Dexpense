import { db } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet  } from 'react-native';


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
   
    <View style={styles.container}>


      <Image
        source={require('../../assets/images/logo_dexpense.png')}
        style={styles.image}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Editar Despesa</Text>


      <Text style={{ marginVertical: 10, fontWeight: 'bold'}}>Descrição Atual: {initialDescription}</Text>


      <Text style={{ marginVertical: 10,fontWeight: 'bold' }}>Quantia Atual: {initialValue}</Text>


      <TextInput
        style={styles.input}
        value={description}
       
        onChangeText={setDescription}
        placeholder="Descrição"
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder="Valor"
      />


      <TouchableOpacity
        style={styles.btngreen}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>


    </View>
  );
}
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btngreen: { //Style do botão
    backgroundColor: '#9FD078',  
    paddingVertical: 12,  
    paddingHorizontal: 28,
    marginTop: 10,
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
  },
  buttonText: { //Style do texto do botão
    color: 'black',
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',  
  },


  image: { //imagem do logo
    width: 200,
    height: 200,


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
})
