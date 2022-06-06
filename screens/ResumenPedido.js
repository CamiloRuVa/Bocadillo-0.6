//Nota: Para hacer botones con estilos usar TouchableOpacity
import React, {useState, useContext, useEffect } from 'react'
import {Text, Image,View, StyleSheet,StatusBar, TouchableOpacity, ScrollView, Button} from 'react-native';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PedidosContext from '../Context/pedidos/pedidosContext';
import PedidosState from '../Context/pedidos/pedidosState';
import BarraSuperior from '../components/barraSuperior';
import firebase from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function ResumenPedido() {

    const navigation = useNavigation();
    const { pedido, total, mostrarResumen,  eliminarProducto , pedidoRealizado} = useContext(PedidosContext);
    const [getId, setId] = useState('');
      
    async function loadUserData(){
      const user = auth().currentUser;
      try{
        const usuarios = await firestore().collection('Usuarios').where('correo', '==', user.email).get()        
        console.log(usuarios.docs[0].id);
        setId(usuarios.docs[0].id);                
      }catch(e){
        console.log(e)
      }
    }


    useEffect(() => {      
      loadUserData();
      calcularTotal();
    },[pedido]);

    const calcularTotal = () =>{
      let nuevoTotla = 0;
      nuevoTotla = pedido.reduce((nuevoTotla, articulo)=> nuevoTotla + articulo.total, 0);
      mostrarResumen(nuevoTotla);
    }
    //Eliminar Un producto del arreglo del pedido
    const ConfirmarElminacion = id =>{
      Alert.alert(
        'Deseas Eliminar este articulo?',
        'Se eleminara este producto del carrito',
        [
          {
            text: 'Confirmar',
            onPress:() =>{
              //Eleminar el state
              eliminarProducto(id);

            }
          },
          {
            text: 'Revisar', style:'cancel'
          }
        ]
      )
    }

    const Carrito = pedido.map((platillo,i) =>{
        const {nombre,id,descripcion,imagen, cantidad, total}=platillo;
          return(
            <View style={styles.item} key={id + i}>     
              <Text style={styles.nombre}>{nombre}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:5, marginHorizontal:10}}>                
                <View >                  
                  <Text style={styles}>Cantidad: {cantidad}</Text>
                  <Text style={styles}>Precio: ${total}</Text>                                                                
                </View>  
                <View>
                  <Image
                  style={styles.imgen}
                  source={{uri : imagen}} 
                  />            
                </View>                           
              </View>                            
              <TouchableOpacity onPress={ () =>{ConfirmarElminacion(id)}} style={{padding:3,width:25,marginTop:-40}}>
                <Icon name="trash-o" size={25} color="#999" />
              </TouchableOpacity>
            </View>
        
        )
    });
    //Redireccion a progreeso pedido
    const progresoPedido = ()=>{
      Alert.alert(
        'Revisa tu pedido',
        'Una vez tu pedido este echo no podras cambiarlo',
        [
          {
            text: 'Confirmar',
            onPress: async () =>{            
              //Objeto con toda la informacion de la pedido
              const pedidoObj ={
                tiempoentrega: 0,
                completado: false,
                total: Number(total),
                orden: pedido,
                creado: Date.now(),
                usuario: getId
              }
              console.log(pedidoObj);
              //Usar fire base          
              try {
                const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                pedidoRealizado(pedido.id);
                navigation.navigate("ProgresoPedido");
              } catch (error) {
                console.log(error);
              }
            }
          },
          {
            text: 'Revisar', style:'cancel'
          }
        ]
      )
    }
    
    return (
      <View>
        <BarraSuperior navigation={navigation}/>        
          <ScrollView style={{marginTop:40 ,margin:10, height:400}}>
              {Carrito}              
          </ScrollView>
          <Text style={styles.title}>Total a pagar: ${total}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal: 40}}>            
                <Text 
                  style={{color:'#cb0519', justifyContent:'center', textDecorationLine:'underline'}}                  
                  onPress={()=>{
                    navigation.navigate('Menu');
                  }}
                >Seguir Pidiendo</Text>                
                <Button                  
                    color='#cb0519'                  
                    title='Finalizar Pedido'
                    onPress={()=>{
                    progresoPedido()
                    }}
                />                
          </View>              
      </View>
 
        
    )
}

export default ResumenPedido;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',    
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,    
  },
  nombre:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 28,
    color: 'black',
    marginHorizontal:40,
    marginBottom: 20
  },
  imgen: {
    height: 100,
    width: 100,
  },
  boton:{
    backgroundColor: 'grey',
    opacity: 0.60,
    padding: 11,
    marginVertical: 5,
  },
});