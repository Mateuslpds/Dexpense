import { db } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet,Button  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditExpenseScreen() {
  const { id, description: initialDescription, value: initialValue, date: initialDate, mode: initialMode, show: initialShow } = useLocalSearchParams();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(initialMode || 'date');
  const [show, setShow] = useState(initialShow || false);
  const [description, setDescription] = useState(initialDescription || '');
  const [value, setValue] = useState(initialValue ? initialValue.toString() : '');
  const router = useRouter();


  const handleSave = async () => {
    if (!id) return;

    //const date = new Date();

    const expenseRef = doc(db, 'expenses', id);
    await updateDoc(expenseRef, {
      date: date.toLocaleDateString(),
      description,
      value: parseFloat(value),
    });
    router.back();
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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

      <Text> Data para efetuar pagamento: {initialDate} </Text>


      <Text> </Text>
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


    <Text style={styles.subtitle}> selecione a data de pagamento</Text>
          
    <Button onPress={showDatepicker} title= "Selecione data do pagamento" />
        
        <Text>data: {date.toLocaleDateString()}</Text>
           {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
             )}

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
