import { db, auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
//import moment from 'moment';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const [userName, setUserName] = useState(''); //aaaaaa
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut().then(() => router.push('/login'));
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      setUserName(user.displayName || 'Usuário');
      const q = query(collection(db, 'expenses'), where('userId', '==', userId));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const expensesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesList);
      });

      return () => unsubscribe();
    }
  }, []);
//aqui jas a data na home :(
  const handleDeleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error('Error deleting expense: ', error);
    }
  };
  

  const renderExpenseItem = ({ item }) => ( 
    <View style={styles.caixinha}> 
      <View>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>{item.description}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Valor: </Text>R$ {item.value}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Data: </Text>{item.date.toLocaleString()}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-end', marginTop: 10 
      }}>
        <TouchableOpacity 
          onPress={() => router.push({
            pathname: '/editExpense', 
            params: {
              id: item.id,
              description: item.description,
              value: item.value.toString(),
              date: item.date.toLocaleString(),
            }
          })}
          style={{ marginRight: 10 }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

    </View>
  );
  
return (
  <View style={styles.container}>
    <Image
      source={require('../../assets/images/logo_dexpense.png')}
      style={styles.image}
    />
    <Text style={styles.title}>Dexpense</Text>
    <Text style={styles.subtitle}>Bem-vindo(a) {userName}!</Text>

    <View style={styles.slaContainer}>
      <Text style={styles.sla}>Minha despesa:</Text>
    </View>

    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      style={{ width: '90%' }}
    />
    <TouchableOpacity style={styles.btnred} onPress={() => handleLogout()}>
      <View style={styles.buttonContent}>
        <Text style={styles.sairtext}>Sair</Text>
        <Ionicons name="log-out-outline" size={24} color="white" style={{ marginLeft: 5 }}/>
      </View>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  caixinha: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#9FD078',
    borderRadius: 10,
    backgroundColor: '#deedd1'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
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
    alignItems: 'center'
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
    fontWeight: 'bold',
  },
  sairtext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
