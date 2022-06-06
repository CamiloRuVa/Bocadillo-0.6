import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStack from './mainStack';
import { DrawerContent } from './drawerContent';

import FirebaseState from '../Context/firebase/firebaseState';
import PedidosState from '../Context/pedidos/pedidosState';
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <FirebaseState>
      <PedidosState>
          <Drawer.Navigator 
            drawerContent={props => <DrawerContent {... props}  /> }  
            initialRouteName="MainStack" 
            screenOptions={ { headerShown: false, swipeEdgeWidth: 0, } }
            gestureEnabled='false'      
            >   
            <Drawer.Screen name="MainStack" component={MainStack} options={{ drawerItemStyle: { height: 0 }}} />       
          </Drawer.Navigator>  
        </PedidosState>  
    </FirebaseState>
  );
}





export default DrawerStack;