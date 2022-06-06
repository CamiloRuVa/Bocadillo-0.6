import React,{useState} from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/sInicioStyles';
import auth from '@react-native-firebase/auth'; 
const ScreenInicio = ( {navigation} ) =>{
  
    const [email, setEmail] = useState('cruiz14@ucol.mx')
    const [password, setPassword] =  useState('Camilo123') 
  
    function IniciarSesion(){
      if(email === '' || password === ''){
        Alert.alert('Error','Rellene los campos necesarios');
      }else{
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
          navigation.navigate('General')
        })
        .catch(error => {                
          console.log(error.code);
          if(error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found'){
            Alert.alert('Error','Los datos están equivocados, vuelva a intentarlo.');
          }          
        });
      }
      
    }
    return (
        
      <View style={styles.mainContainer}>
        <View style={styles.backContainer}>
          <Text style={styles.titulo}>Iniciar Sesión</Text>        
          
          <Text style={styles.subtitulo}>Correo Electronico</Text>
          <View style={styles.container}>
            <TextInput keyboardType="email-address" onChangeText={(text) => setEmail(text)} style={styles.Input} placeholder='Correo Electronico'/>
            <Icon name="user" size={30} color="#999" /> 
          </View>
  
          <Text style={styles.subtitulo}>Contraseña</Text>
          <View style={styles.container}>
            <TextInput onChangeText={(text) => setPassword(text)} style={styles.Input} secureTextEntry={true} placeholder='Contraseña'/>
            <Icon name="key" size={30} color="#999" /> 
          </View>
  
          
          <Button 
            title='Iniciar Sesion' 
            color='#cb0519' 
            onPress = { () => { IniciarSesion() }}
            />
  
          <Text style={styles.textoSecundario}>¿No tienes cuenta? <Text style={{color: '#cb0519'}} onPress = { () => { navigation.navigate('Registro')  }}>Registrate Aquí</Text></Text>
        </View>
        
      </View>
    );
  }
  

export default ScreenInicio;
