import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Seja bem-vindo(a) ao Dexpense!</Text>
      <Button title='Entrar'onPress={() => navigation.navigate('login' as never)} />
      <Button title='Registrar-se'onPress={() => navigation.navigate('register' as never)} />
    </View>
  );
};
