import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#CDCDCD'
    },
    backContainer:{
      backgroundColor:'white',
      margin: 10,
      padding: 20,
      borderColor:'#000000',
      borderWidth:2,
      borderRadius:10
    },
    container: {
      flexDirection:'row',
      borderColor: '#000000',
      borderWidth: 1,
      height:40,
      marginBottom:20
    },
    mainBoton: {
      color:'#cb0519',
      width:1,
    },
    titulo:{
      fontSize:20,
      color:'#000000',
      fontWeight: 'bold',
      textAlign:'center',
      marginBottom:10
    },
    subtitulo:{
      fontSize:15,
      color:'#000000',
      padding:5
    },
    textoSecundario:{
      textAlign:'center',
      marginTop:10,
    },
    Input:{
      width:'85%',
      color:'#000000'
    },
    icon:{
    } 
  });
  
export default styles;