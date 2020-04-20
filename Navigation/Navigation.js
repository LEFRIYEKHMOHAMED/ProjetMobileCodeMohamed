import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const Stack = createStackNavigator();

class Navigation extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Rechercher" component={Search}/>
          <Stack.Screen name="FilmDetail" options={{ title: 'Film detail' }} component={FilmDetail}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


export default Navigation