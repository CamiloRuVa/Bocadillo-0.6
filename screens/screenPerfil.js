import React,{useEffect, useState} from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import BarraSuperior from '../components/barraSuperior';


const ScreenPerfil = ( {navigation} ) => {

  const [name,setName]= useState('');
  const [correo,setCorreo]= useState('');
  const [telefono,setTelefono]= useState('');  
  const [disable, setDisabled] = useState(true);
  const [getId,setId] = useState('');

  const [color1, setColor1] = useState('gray');
  const [color3, setColor3] = useState('gray');


  async function loadData(){
    const user = auth().currentUser;
    try{
      const usuarios = await firestore().collection('Usuarios').where('correo', '==', user.email).get()        
      setId(usuarios.docs[0].id);        
      setName(usuarios.docs[0].data().nombre);
      setCorreo(usuarios.docs[0].data().correo);
      setTelefono(usuarios.docs[0].data().telefono);
      
    }catch(e){
      console.log(e)
    }
  }

  function writeData(){
    try{      
      firestore().collection('Usuarios').doc(getId).update({
        nombre: name,
        telefono: telefono
      });
    }catch(e){
      console.log(e);
      Alert.alert('Error','No se pudo actualizar los datos');
    }finally{
      Alert.alert('Actualizado','Se ha actualizado Correctamente');
      setDisabled(true);

    }   
  }

  useEffect(()=> {
    loadData()
  },[])


  return (      
    <View>
      <BarraSuperior navigation={navigation}/>
      <View>                
          <View style={{height:'80%',backgroundColor:"white",borderColor:"black",borderWidth:1,margin: 20, marginTop: 50,}}>
            <Text style={{margin: 20, textAlign:'center', fontSize:20, color:'black'}}>
              Mi Perfil
            </Text>
            <View style={{margin:20}}>
              <Text style={{color:'black'}}>Correo</Text>
              <TextInput editable={false} defaultValue={correo} style={{backgroundColor:'white',color:'grey', borderColor:'black', borderWidth:1, borderRadius: 10}}/>
            </View>

            <View style={{margin:20}}>
              <Text style={{color:'black'}}>Nombre</Text>
              <TextInput keyboardType="default" defaultValue={name} onChangeText={(text) => {setDisabled(false); setName(text)}} onFocus={() => {setColor1('#000000')}} onBlur={() => {setColor1('gray')}} style={{backgroundColor:'white',color:color1, borderColor:'black', borderWidth:1, borderRadius: 10}}/>
            </View>            

            <View style={{margin:20}}>
              <Text style={{color:'black'}}>Número de Telefono</Text>
              <TextInput keyboardType="numeric" defaultValue={telefono} onChangeText={(text) => {setDisabled(false); setTelefono(text)}} onFocus={() => {setColor3('#000000')}} onBlur={() => {setColor3('gray')}} style={{backgroundColor:'white', color:color3, borderColor:'black', borderWidth:1, borderRadius: 10}}/>
            </View>
            <View style={{margin:50}}>
              <Button color='#cb0519' title='Guardar' disabled={disable} onPress={() => {writeData()}}/>
            </View>

          </View>
      </View>
    </View>
  );
}


export default ScreenPerfil;