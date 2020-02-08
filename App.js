import React, { useState, useEffect} from 'react';
import { StyleSheet, Button, TextInput, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios'
import Card from './components/Card'
import * as Font from 'expo-font';
import Welcome from './components/Welcome'
import Scanner from './components/Scanner'
import Results from './components/Results'
import Signup from './components/Signup'
import Search from './components/Search'
import Login from './components/Login'
import Stats from './components/Stats'
import Predict from './components/Predict'
import Predicts from './components/Predicts'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
	Welcome: {screen: Welcome},
	Search: {screen: Predicts},
  Signup: {screen: Signup},
	Login: {screen: Login},
	Results: {screen: Results},
	Scanner: {screen: Scanner},
	Stats: {screen: Stats},
});

const App = createAppContainer(MainNavigator)

export default App;

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
