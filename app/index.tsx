import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Image
        source={require('../assets/images/logo_dexpense.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Dexpense</Text>
      <Text style={styles.subtitle}>Tuas despesas boy, Dexpense...</Text>
      <TouchableOpacity
        style={styles.btngreen} 
        onPress={() => navigation.navigate('register' as never)}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
      <Text style={styles.ou}> ou </Text>
      <TouchableOpacity
        style={styles.btnyellow} 
        onPress={() => navigation.navigate('login' as never)}>
        <Text style={styles.buttonText}>Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
};


//Styles vão ficar aqui até eu resolver a bronca.
const styles = StyleSheet.create({ 
  container: { //oxe
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { //imagem do logo
    width: 200,
    height: 200,
  },
  title: { //titulo do app
    fontSize: 32, 
    fontWeight: 'bold',  
    color: '#333',
    marginBottom: 10,
    marginTop: 8,
  },
  ou: { //speciaaaal
    fontSize: 20,
    color: '#333',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  subtitle: { //subtitulo do app
    fontSize: 20,
    color: '#333',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  btngreen: { 
    backgroundColor: '#9FD078',
    paddingVertical: 12,   
    paddingHorizontal: 28, 
    marginTop: 10,
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
  },
  btnyellow: { 
    backgroundColor: '#F9D762',
    paddingVertical: 12,  
    paddingHorizontal: 24,
    marginBottom: 90, //mega improviso
    borderRadius:  50,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
  },
  buttonText: { 
    color: 'black',
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',  
  },
});