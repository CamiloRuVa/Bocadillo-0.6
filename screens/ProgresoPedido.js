import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, StatusBar,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PedidosContext from '../Context/pedidos/pedidosContext';
import firebase from '../firebase';

import CountDown from 'react-native-countdown-component';
import { min } from 'react-native-reanimated';
import BarraSuperior from '../components/barraSuperior';

function ProgresoPedido() {

    const navigation = useNavigation();
    const { idpedido } = useContext(PedidosContext);

    const [completado,guardarCompletado] = useState(false);
    const [tiempo, guardarTiempo] = useState(0);

    const[color2,setColor2] = useState('#818181');
    const[color3,setColor3] = useState('#818181');


    useEffect(()=>{
      obtenerProducto();
      console.log(tiempo);
    },[]);

    const obtenerProducto = () =>{
      firebase.db.collection('ordenes')
      .doc(idpedido)
      .onSnapshot(function(doc){
            guardarTiempo(doc.data().tiempoentrega);
            guardarCompletado(doc.data().completado)
            if(doc.data().tiempoentrega != 0)  { setColor2('#0C8D0C'); }else{setColor2('#818181');}
            if(doc.data().completado == true) { setColor3('#0C8D0C'); }else{setColor3('#818181');}
      })      
    }

    //Muestra el count down en la pantalla
    const renderer = (minutes, seconds) =>{
      console.log(minutes);
      console.log(seconds);
      return(
        <Text>{minutes}:{seconds}</Text>  
      )
    }

    return (
        <View>
          <BarraSuperior navigation={navigation}/>
          <View style={{marginHorizontal:50,marginTop:60, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
              <View style={{backgroundColor:'#0C8D0C', width:40, height:40, borderRadius:100 }}><Text></Text></View>
              <Text style={{color:'#000'}}>Pedido</Text>
              <Text style={{color:'#000'}}>Realizado</Text>
            </View>            
            <View style={{flexDirection:'column', alignItems:'center'}}>
              <View style={{backgroundColor:color2, width:40, height:40, borderRadius:100}}><Text> </Text></View>
              <Text style={{color:'#000'}}>En</Text>
              <Text style={{color:'#000'}}>Preparacion</Text>
            </View>                        
            <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{backgroundColor:color3, width:40, height:40, borderRadius:100}}><Text> </Text></View>
              <Text style={{color:'#000'}}>Pedido</Text>
              <Text style={{color:'#000'}}>Listo</Text>
            </View> 
          </View>
          <View style={{margin:40}}>
            {tiempo === 0 && (
              <>
                <Text style={styles.title}>Hemos recibido su orden ...</Text>
                <Text  style={styles.title}>calculando el tiempo de entrega ...</Text>
              </>
            )}
            {!completado && tiempo != ''  &&(
                <>
                  <Text  style={styles.title}>Su orden estara lista alrededor de las :{ tiempo} hrs</Text>
                </>
              )              
            }
            {completado  &&(
                <>
                  <Text style={styles.title}>Orden lista</Text>
                  <Text  style={styles.title}>Por favor, pase a recoger su pedido</Text>
                  <Button
                    onPress={ ()=> navigation.navigate("NuevaOrden")}
                    title="comenzar orden nueva"
                  />
                </>
              )
            }
          </View>         
        </View>
    )
}

export default ProgresoPedido;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    title: {
      fontSize: 23,
      color: 'black',
    }
  });