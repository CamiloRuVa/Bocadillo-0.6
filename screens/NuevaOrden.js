import React from 'react'
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function NuevaOrden() {

    const navigation = useNavigation();
    return (
        <>
        <Button 
            title='Crear nueva orden'
            onPress={ ()=> navigation.navigate('Menu')}
        />
          
        </>
    )
}

export default NuevaOrden;
