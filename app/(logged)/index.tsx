import { db, auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut().then(() => router.push('/login'));
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
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

  const renderExpenseItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Descrição: {item.description}</Text>
      <Text>Valor: {item.value}</Text>
      <TouchableOpacity 
        onPress={() => router.push({
          pathname: '/editExpense', 
          params: {
            id: item.id,
            description: item.description,
            value: item.value.toString() // Certifique-se de que o valor é uma string
          }
        })}>
        <Text>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Estou dentro!</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};
