import { db } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet,Button  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


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

      <Text style={styles.title}>Editar despesa</Text>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={{fontWeight: 'bold'}}>Descrição Atual: </Text>{initialDescription}
        </Text>
        <Text style={styles.text}>
          <Text style={{fontWeight: 'bold'}}>Quantia Atual: </Text>{initialValue}
        </Text>
        <Text style={styles.text}>
          <Text style={{fontWeight: 'bold'}}>Efetuar pagamento em: </Text>{initialDate}
        </Text>
      </View>

      <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 5, color: '#000', fontWeight: 'bold' }}>Edite os campos abaixo:</Text>
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

      <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 5, color: '#000', fontWeight: 'bold' }}>
        Selecione a data de pagamento:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#000' }}>Data: {date.toLocaleDateString()}</Text>
           {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
             )}

      <TouchableOpacity style={styles.btndate} onPress={showDatepicker}>
        <View style={styles.buttonContent}>
          <Ionicons name="calendar-outline" size={24} color="black" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Selecione data do pagamento</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btngreen} onPress={handleSave}>
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
  textContainer: {
    alignItems: 'flex-start',
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    marginTop: 8,
  },
  btngreen: {
    backgroundColor: '#9FD078',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:  50,
    borderWidth: 1,
    borderColor: '#333',
    width: 280,
    padding: 10,
  },
  buttonText: { 
    color: 'black',
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',  
  },
  btndate: {
    backgroundColor: '#F9D762',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20, 
    borderRadius: 8,
    borderWidth: 1, 
    width: 280,
    marginBottom: 10,     
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 50,
    borderColor: 'black',
    borderRadius:50,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20
  },
})
