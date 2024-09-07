import { db, auth } from '../../firebaseConfig';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => navigation.navigate('login' as never));
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

      // Cleanup listener on unmount
      return () => unsubscribe();
    }
  }, []);

  const renderExpenseItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Descrição: {item.description}</Text>
      <Text>Valor: {item.value}</Text>
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
