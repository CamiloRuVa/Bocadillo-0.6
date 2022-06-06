import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header:{
      flexDirection: 'row',
      backgroundColor: '#cb0519',
      margin:15,
      borderRadius:10,
      maxHeight: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    imgContainer:{
      borderColor: 'black',
      alignItems: 'center',
      padding: 0,
      marginTop: -10,      
      marginLeft: '25%'
    },
    img:{
      borderRadius: 50,
      borderWidth:5,
      borderColor: 'black',
      borderWidth: 3,
      width: 100,
      height: 100
    },
    iconos:{
      margin: 7,
    }
  });

export default styles;