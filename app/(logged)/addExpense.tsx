import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Button} from 'react-native';
//import DateTimePicker from 'react-native-ui-datepicker';
//import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


import { db, auth } from '../../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';

export default function AddExpenseScreen() {
  const navigation = useNavigation();

   //const [date, setDate] = useState(new Date());

   const [date, setDate] = useState(new Date());
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
  //const [locale, setLocale] = useState('br');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleAddExpense = async () => {
    try{
      const user = auth.currentUser;
      const userId = user.uid;

      await addDoc(collection(db, 'expenses'), {
        date: date.toLocaleDateString(),
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

  return(
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_dexpense.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Dexpense</Text>
      <Text style={styles.subtitle}>Adicione uma despesa:</Text>

      <TextInput
        style={styles.input}
        placeholder="Adicionar descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={value}
        onChangeText={setValue}
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
      <TouchableOpacity style={styles.btngreen} onPress={handleAddExpense}>
        <View style={styles.buttonContent}>
          <Ionicons name="add-sharp" size={24} color="black" style={{ marginRight: 5 }}/>
          <Text style={styles.buttonText}>Adicionar</Text>
        </View>
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
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btntext:{
    color: 'black',
    fontSize: 18,
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
});
