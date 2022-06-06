import React, {useContext,useState, useEffect}from 'react';
import {Text,StyleSheet, StatusBar,View, Image, Button, Alert, TouchableOpacity} from 'react-native';

import PedidosContext from '../Context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import BarraSuperior from '../components/barraSuperior';
function DetallePlatillo() {

  const {platillo} = useContext(PedidosContext);
  const {nombre,descripcion, precio,id,imagen} = platillo;


  const navigation = useNavigation();

    return (
      <View>
        <BarraSuperior navigation={navigation}/>
        <View style={{margin:40}}>      
          <View style={{marginBottom:10}}>              
            <Image style={styles.logo} source={{uri:imagen}}/>    
            <Text style={styles.titulo}>{nombre}</Text>            
          </View>                                
        </View>
        <View style={{marginHorizontal:40,marginTop:'15%',backgroundColor:'#FFF',opacity:0.50,borderRadius:10, padding:10}}>
          <Text style={styles.texto}>{descripcion}</Text>
        </View>
        <View>
          <FormularioPlatillo/>
        </View>
      </View>     
        
     
    )
}

function FormularioPlatillo() {
  //states para las cantidades
  const [ cantidad, guardarCantidad ] = useState(0);
  const { platillo, guardarPedido } = useContext(PedidosContext);
  const [disable, setDisable] = useState(true);
  const [total, guardarTotal] = useState(0);
  
  //Redireccion
  const navigation = useNavigation();
  const {precio}= platillo;

  //Const incrementar la cantidad
  const incrementarUno = ()=>{
      const nuevaCantidad = parseInt(cantidad)+1;
      guardarCantidad(nuevaCantidad);       
  }

  //calcular cantidad a pagar en cuanto carga el componenete
  useEffect(()=>{
      calcularTotal();
      if(cantidad>0){
        setDisable(false)
      }
      if(cantidad===0){
        setDisable(true)
      }
  },[cantidad ])


  //Cacular el total del platillo
  const calcularTotal = () =>{
    const totalPagar = precio * cantidad; 
    guardarTotal(totalPagar);
  }

  //Decrementar la cantidad del pedido
  const decrementarUno = ()=>{
    if( cantidad> 0){
      const nuevaCantidad = parseInt(cantidad)-1;
      guardarCantidad(nuevaCantidad);
    }      
  }

  //Confirmar si la orden es correcta
  const confirmarOrden = ()=>{
    Alert.alert(
      'Deseas confirmar tu pedido?',
      'No se podrea revertir los cambios',
      [{
        text:'Confirmar',
        onPress: () => {
          //Almacenamineto al pedido
          const pedido = {
              ...platillo,
              cantidad,
              total
          }
          guardarPedido(pedido);
          navigation.navigate("ResumenPedido");
          },
        },
        {
          text:'Cancelar',
          style: 'cancel'
      }]
    )
  }



  return (
    <View>
      <View style={{margin:30}}>
        <Text style={styles.title}>Cantidad</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20, width:'80%'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>            
            <Button style={{fontSize:20}} title='-' name ="add" color='black' onPress={ ()=> decrementarUno() } disabled={disable}/>
            <Text style={{padding:10,fontSize:20, color:'black'}}>{cantidad}</Text>
            <Button title='+'  name="remove" color='black' onPress={ ()=>incrementarUno() }/>          
          </View>
          <View>
            <Text style={styles.total}>Total:</Text>            
            <Text style={styles.totalNumero}>${total}</Text>
          </View>          
        </View>  
        <Button title='Confirmar Orden' color='#cb0519' disabled={disable} onPress={() => {confirmarOrden()} } />              
      </View>
    </View>     
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  titulo: {
    fontSize: 20,
    width:'80%',
    color: '#FFF',
    backgroundColor: 'black',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop:-130,
    padding: 3    
  },
  logo: {
    width: '100%',
    height: 140,
  },
  boton:{
    width: '90%',
    padding: 10, 
  },
  textoBoton:{
    color:'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  texto:{
    fontSize:17,
    color: 'black'
  },
  total:{
    color:'black',
    fontSize:15,
    fontWeight:'bold'
  },
  totalNumero:{
    color:'black',
    fontSize:22,
  }
});

export default DetallePlatillo;