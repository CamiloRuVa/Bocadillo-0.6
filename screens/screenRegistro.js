import React, { useState } from 'react';
import {Text, View, TextInput, Button,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from '../styles/sRegistroStyles';



const ScreenRegistro = ( {navigation} ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [name,setName]= useState('');
  const [phone,setTelefono]=useState('');
  let jwtToken;

  async function verificacion(){  
    firestore()
    .collection('Usuarios')
    .doc(jwtToken)
    .get()
    .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        firestore()
        .collection('Usuarios')
        .doc(jwtToken)
        .set({
          nombre: name,
          correo: email,
          contrasena:password,
          telefono: phone
        })
        .then(() => {
          console.log('User added!');
        });
    });
  }

  function CrearUsuarios(){
    
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      let jwtToken = auth().currentUser.uid;
      console.log(jwtToken);
      verificacion();
      Alert.alert(
        "Exito",
        "Usuario registrado Correctamente",
        [
          { text: "OK", onPress: () => navigation.navigate('Inicio') }
        ],
        { cancelable: false }
      );
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  }


  return (
      
    <View style={styles.mainContainer}>
      <View style={styles.backContainer}>
        <Text style={styles.titulo}>Registrate</Text>        
        
        <Text style={styles.subtitulo}>Nombre</Text>
        <View style={styles.container}>
          <TextInput onChangeText={(text) => setName(text)} style={styles.Input} placeholder='Nombre'/>
          <Icon name="user" size={30} color="#999" />  
        </View>

        <Text style={styles.subtitulo}>Correo</Text>
        <View style={styles.container}>
          <TextInput keyboardType="email-address" onChangeText={(text) => setEmail(text)} style={styles.Input} placeholder='Correo'/>
          <IconMC name="email-multiple-outline" size={30} color="#999" /> 
        </View>

        <Text style={styles.subtitulo}>Contraseña</Text>
        <View style={styles.container}>
          <TextInput  onChangeText={(text) => setPassword(text)} style={styles.Input} secureTextEntry={true} placeholder='Contraseña'/>
          <IconMC name="lock-outline" size={30} color="#999" /> 
        </View>

        <Text style={styles.subtitulo}>Repita la Contraseña</Text>
        <View style={styles.container}>
          <TextInput onChangeText={(text) => setPassword2(text)} style={styles.Input} secureTextEntry={true} placeholder='Repetir Contraseña'/>
          <IconMC name="lock-outline" size={30} color="#999" /> 
        </View>

        <Text style={styles.subtitulo}>Numero telefonico</Text>
          <View style={styles.container}>
            <TextInput  keyboardType="numeric"  onChangeText={(text) => setTelefono(text)}  style={styles.Input} placeholder='Numero'/>
            <Icon name="phone" size={30} color="#999"  /> 
          </View>
     
        <Button 
        title='Crear Cuenta' style={styles.mainBoton} 
        onPress={() => CrearUsuarios()}
        color='#cb0519'/>

        <Text style={styles.textoSecundario}><Text style={{color: '#cb0519'}} onPress = { () => {navigation.navigate('Inicio')}}>Iniciar Sesión</Text></Text>
      </View>
      
    </View>
  );
}



export default ScreenRegistro;
