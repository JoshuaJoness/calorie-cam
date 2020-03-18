import React, { useState, useEffect} from 'react';
import { StyleSheet, Button, TextInput, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios'
import Card from './components/Card'
import * as Font from 'expo-font';
import Welcome from './components/Welcome'
import Scanner from './components/Scanner'
import Results from './components/Results'
import Search from './components/Search'
import Stats from './components/Stats'
import Predicts from './components/Predicts'
import Log from './components/Log'
import { BottomNav } from './components/BottomNav'

import { ApplicationProvider, BottomNavigation,
  BottomNavigationTab, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RoutedApp = createAppContainer(createStackNavigator({
	Welcome: {screen: Welcome},
	Search: {screen: Predicts},
	Results: {screen: Results},
	Scanner: {screen: Scanner},
	Stats: {screen: Stats},
	Log: {screen: Log},
}));

export default class App extends React.Component {
	render() {
		return(
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
		    <RoutedApp/>
				<BottomNav />
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
