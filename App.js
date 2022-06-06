import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//import MainStack from './navigation/mainStack';
import DrawerStack from './navigation/drawerStack';

import { NavigationContainer } from '@react-navigation/native';

class App extends React.Component {
  render() {
    return (

        <SafeAreaView style={{ flex:1 }}>
          <NavigationContainer>
            <DrawerStack/>
          </NavigationContainer>           
        </SafeAreaView>
    );
  }
}


export default App;
