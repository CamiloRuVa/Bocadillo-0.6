import React, {useState, useContext, useEffect} from 'react';
import {Text, StyleSheet, StatusBar,Button, View, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PedidosContext from '../Context/pedidos/pedidosContext';

import BarraSuperior from '../components/barraSuperior';

function FormularioPlatillo() {
    //states para las cantidades
    const [ cantidad, guardarCantidad ] = useState(1);
    const { platillo, guardarPedido } = useContext(PedidosContext);

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
    },[cantidad ])


    //Cacular el total del platillo
    const calcularTotal = () =>{
        const totalPagar = precio * cantidad; 
        guardarTotal(totalPagar);
    }

    //Decrementar la cantidad del pedido
    const decrementarUno = ()=>{
        if( cantidad> 1){
            const nuevaCantidad = parseInt(cantidad)-1;
            guardarCantidad(nuevaCantidad);
        }
        
    }
    //Confirmar si la orden es correcta
    const confirmarOrden = ()=>{
        Alert.alert(
            'Deseas confirmar tu pedido?',
            'No se podrea revertir los cambios',
            [
                {
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
                }
            ]
            
        )
    }



    return (
        <View>
            <BarraSuperior navigation={navigation}/>
            <View style={{margin:30}}>
                <Text style={styles.title}>Cantidad</Text>
                <View style={styles.fixToText}>
                    <Button title='     -     ' name ="add" onPress={ ()=> decrementarUno() }/>
                    <Text style={styles.title}>{cantidad}</Text>
                    <Button title='     +     '  name="remove" onPress={ ()=>incrementarUno() }/>
                </View>
                <View>
                    <Text style={styles.title}>Total: {total}</Text>
                    <Button title='Confirmar Orden'
                        onPress={()=>confirmarOrden()}                    
                    />
                </View>
            </View>
        </View>

        
        
        
    )
}

export default FormularioPlatillo;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    title: {
      fontSize: 32,
      color: 'black',
    },

    logo: {
      width: 100,
      height: 58,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
  });