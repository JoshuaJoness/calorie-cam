import React, { useState, useEffect} from 'react';
import { StyleSheet, Button, TextInput, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios'
import * as Font from 'expo-font';
import Welcome from './components/Welcome'
import Predicts from './components/Predicts'
import Log from './components/Log'

import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs'

const BottomNav = createAppContainer(createBottomTabNavigator({
		Welcome: {screen: Welcome,
			navigationOptions: ({ navigation }) => ({
	          title: 'Welcome'
	        })},
		Search: {screen: Predicts},
		Log: {screen: Log},
	},
	{
        initialRouteName: 'Welcome',
        tabBarOptions: {
          style: {
           height: 55,
           backgroundColor: '#232F34',
				 },
					activeTintColor: '#F9AA33'
        }
			}
		))



const RoutedApp = createAppContainer(createStackNavigator({
	Welcome: {screen: Welcome},
	Search: {screen: Predicts},
	Log: {screen: Log},
}));

export default class App extends React.Component {
	render() {
		return(
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
		    <BottomNav/>
		  </ApplicationProvider>
		)
	}
}




// Old structure, prior to Navigator

// const App = () => {
//   return (
// 	  <View style={styles.container}>
// 			<Welcome />
// 	  </View>
//   )
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D3F09C',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
// export default App
