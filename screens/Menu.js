import React, {useContext, useEffect, useState} from 'react';
import FirebaseContext from '../Context/firebase/firebaseContext';
import PedidosContext from '../Context/pedidos/pedidosContext';
import BarraSuperior from '../components/barraSuperior';

import { StyleSheet, Text, View, TouchableOpacity,ScrollView, Image } from 'react-native';


function Menu( {navigation,route} ) {


  const {obtenerProductos, menu} = useContext(FirebaseContext);
  const {seleccionarPlatillo} = useContext(PedidosContext);
  //const navigation = useNavigation();
  const {idRest} = route.params;

  useEffect(() => {
    obtenerProductos(idRest);
  }, []);

   const comidas = menu.map(platillo =>{
        const {nombre,id,descripcion,imagen,precio}=platillo;
          return( 
            <View>
              <View style={styles.item} key={id}>
                <TouchableOpacity 
                  onPress={
                    ()=>{
                      seleccionarPlatillo(platillo);
                      navigation.navigate("DetallePlatillo");
                    }
                  }>
                    <View style={{flexDirection:'row'}}>
                      <Image style={styles.logo} source={{uri:imagen}}/>
                      <View>
                        <Text style={styles.titulo}>{nombre}</Text>
                        <Text style={styles.nombre}>{descripcion}</Text>                      
                      </View>                      
                    </View>                                    
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.divPrecio}
                onPress={
                  ()=>{
                    seleccionarPlatillo(platillo);
                    navigation.navigate("DetallePlatillo");
                }}>
                <Text style={styles.precio}>${precio}</Text>
              </TouchableOpacity>
            </View>
        )
    });

  return (
    <View>
      <BarraSuperior navigation={navigation}/>    
      <ScrollView style={{margin:30}}>
          {obtenerProductos == ''&&(
            <View> <Text>HOLA</Text></View>
          )}
          {comidas}
      </ScrollView>
    </View>
    
    
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titulo:{
    color: 'black',    
  },
  logo: {
    width: 70,
    height: 70,
    marginRight:10,
    borderColor:'#F4F4F4',
    borderWidth:2
  },
  divPrecio: {    
    backgroundColor: 'black',    
    padding: 10,
    maxWidth:80,
    marginTop:-40,
    marginLeft: '65%'
  },
  precio:{
    color:'white',    
    textAlign:'center'
  }
});

export default Menu;