import React, { useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, Text, View, ImageBackground, ScrollView } from 'react-native'
import axios from 'axios'
import * as Font from 'expo-font'
import Welcome from './components/Welcome'
import Predicts from './components/Predicts'
import Log from './components/Log'
import GetStarted from './components/getStarted'

import { ApplicationProvider } from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva'

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Ionicons } from '@expo/vector-icons'

const BottomNav = createAppContainer(createBottomTabNavigator({
	Welcome: {screen: GetStarted, // TODO change back to Welcome
		navigationOptions: ({ navigation }) => ({
			title: 'Welcome'
		})
	},

	Search: {screen: Predicts,
		navigationOptions: ({ navigation }) => ({
			title: '',
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name="md-camera" size={72} color={tintColor} style={{position:'absolute', marginBottom:10}} />
			)
		})
	},

	Log: {screen: Log},

	},

	{
  	initialRouteName: 'Welcome',
    tabBarOptions: {
			showIcon: true,
      style: {
        height: 55,
        backgroundColor: '#ffe8d6',
			},
			inactiveTintColor: 'transparent',
			activeTintColor: 'transparent'
      }
		}
	))

const RoutedApp = createAppContainer(createStackNavigator({
	Welcome: {screen: GetStarted},
	Search: {screen: Predicts},
	Log: {screen: Log},
}))

export default class App extends React.Component {
	render() {
		state = {
			active: false
		}
		
		return(
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
		    <BottomNav style={{zIndex:1000}}/>
		  </ApplicationProvider>
		)
	}
}

// Code for TabBarLabel (i.e. to change tab bar navigation font size)
{/*
	Welcome: {screen: Welcome,
		navigationOptions: ({ navigation }) => ({
			tabBarLabel: <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Welcome </Text>
		})
	},
*/}
