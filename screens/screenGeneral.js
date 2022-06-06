import React,{useState,useEffect} from 'react';
import { View,Text,Image,StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import BarraSuperior from '../components/barraSuperior';

const ScreenGeneral = ( {navigation} ) => {

  const [rest,setRest] = useState();

  async function loadData(){    
    try{    
    const restaurantes = await firestore().collection('RestaurantesUsuarios').get();        
    setRest(restaurantes.docs);
    console.log(restaurantes.docs[1].id)   
    }catch(e){
    console.log(e)
    }
  }

  useEffect(()=> {
    loadData();        
  },[])

  function renderItem({ item }){
    return(
        <View style={styles.contenedor}>
          <Image style={styles.logo} 
              source={{uri:item.data().logoR}}/>
          <TouchableOpacity onPress={ ()=> navigation.navigate('Menu', {idRest: item.id})}>
            <Text style={{color:'#000', fontWeight:'bold', fontSize:18}} >{item.data().nombre}</Text>        
          </TouchableOpacity>          
        </View>
    )
  }

  return (
      
    <View>
      <BarraSuperior navigation={navigation}/>
      <View style={{margin:30, marginTop:50}}>
        <FlatList 
          data = {rest}
          renderItem = {renderItem}
          keyExtractor = {item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    marginRight:10,
    borderColor:'#F4F4F4',
    borderWidth:2,
    borderColor:"#848484",
    borderWidth:1
  },
  
  contenedor:{
    flexDirection:'row',
    alignItems:'center',    
    marginHorizontal:40,
    padding:10,
    backgroundColor:'#FFF', 
    marginHorizontal:7, 
    marginVertical:10,  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})


export default ScreenGeneral;
