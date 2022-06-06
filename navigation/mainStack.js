import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import screenInicio from '../screens/screenInicio';
import screenRegistro from '../screens/screenRegistro';
import screenGeneral from '../screens/screenGeneral';

import BotonResumen from '../components/BotonResumen';
import DetallePlatillo from '../screens/DetallePlatillo';
import Menu from '../screens/Menu';
import FormularioPlatillo from '../screens/FormularioPlatillo';
import NuevaOrden from '../screens/NuevaOrden';
import ProgresoPedido from '../screens/ProgresoPedido';
import ResumenPedido from '../screens/ResumenPedido';

import PedidosState from '../Context/pedidos/pedidosState';
import ScreenPerfil from '../screens/screenPerfil';
import ScreenPedidos from '../screens/screenPedidos';

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
            <PedidosState>
                <Stack.Navigator
                    screenOptions={{ 
                        headerShown: false 
                    } }>
                    <Stack.Screen 
                        name = 'Inicio'
                        component = { screenInicio }
                    />
                    <Stack.Screen 
                        name = 'Registro'
                        component = { screenRegistro }
                    />
                    <Stack.Screen 
                        name = 'General'
                        component = { screenGeneral }
                    /> 
                    <Stack.Screen 
                        name = 'Perfil'
                        component = { ScreenPerfil }
                    />       
                    <Stack.Screen 
                        name = 'Pedidos'
                        component = { ScreenPedidos }
                    />                       

                    <Stack.Screen 
                        name = 'ResumenPedido'
                        component = { ResumenPedido }
                        options ={{
                            title: "Resumen del pedido"
                        }}
                    />
                    <Stack.Screen 
                        name = 'ProgresoPedido'
                        component = { ProgresoPedido }
                        options ={{
                            title: "Progreso"
                        }}
                    />
                    <Stack.Screen 
                        name = 'NuevaOrden'
                        component = { NuevaOrden }
                        options ={{
                            title: "Nueva orden"
                        }}
                    />
                    <Stack.Screen 
                        name = 'Menu'
                        component = { Menu }
                        options ={{
                            title: "Menu",
                            headerRight: props => <BotonResumen/> 
                        }}
                    />
                    
                    <Stack.Screen 
                        name = 'DetallePlatillo'
                        component = { DetallePlatillo }
                        options={{
                            title: "Detalles Platillo"
                        }}
                    />    
                    <Stack.Screen 
                        name = 'FormularioPlatillo'
                        component = { FormularioPlatillo }
                        options = {{
                            title: "FormularioPlatillo"
                        }}
                    />    


                </Stack.Navigator>
            </PedidosState>
      
    )    
}

export default MainStack