import React,{useState,useEffect,useContext} from 'react';

import { View, Text,StyleSheet} from 'react-native';

import BarraSuperior from '../components/barraSuperior';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import PedidosContext from '../Context/pedidos/pedidosContext';

const ScreenPedidos = ({navigation}) =>{
    
    const [getOrdenes,setOrdenes] = useState();
    const { pedidoRealizado} = useContext(PedidosContext);    

    async function loadUserData(){
        const user = auth().currentUser;
        try{
        const usuarios = await firestore().collection('Usuarios').where('correo', '==', user.email).get()                            
        const ordenes = await firestore().collection('ordenes').where('usuario', '==', usuarios.docs[0].id).get()        
        setOrdenes(ordenes.docs)                                  
        }catch(e){
        console.log(e)
        }
    }
    
    useEffect(()=> {
        loadUserData();        
    },[])

    function renderItem({ item }){
        return(
            <View style={styles.contenedor}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-evenly',}}
                    onPress={
                        () => {pedidoRealizado(item.id); navigation.navigate("ProgresoPedido");}}
                >
                <Text style={styles.text}>{item.data().orden[0].nombre}</Text>                
                <Text style={styles.text}>${item.data().total}</Text>
                </TouchableOpacity>                
            </View>
        )
    }

    return(
        <View>
            <BarraSuperior navigation={navigation}/>            
            <View style={{marginTop:50}}>
                {getOrdenes == ''  &&(                    
                    <View style={styles.contenedor}>
                        <Text styles={styles.textSecundario}>Usted no tiene pedidos aún</Text>
                    </View>                    
                )}
                {getOrdenes != '' &&(
                    <FlatList
                        data = {getOrdenes}
                        renderItem = {renderItem}
                        keyExtractor = {item => item.id}
                    />  
                )}                                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor:'#fff', 
        marginHorizontal:40, 
        marginVertical:10, 
        padding:10,
        shadowColor: "#cb0519",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text:{
        color:'#000',
        fontSize:17
    },
    textSecundario:{
        fontSize:20,
        alignSelf:'center'
    }
    
})
export default ScreenPedidos;