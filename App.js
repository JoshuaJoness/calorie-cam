import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
import GetStarted from './components/getStarted';
import Age from './components/age';
import Gender from './components/gender';
import Height from './components/height';
import Weight from './components/weight';
import ActivityLevel from './components/activityLevel';
import Results from './components/results';
import Log from './components/log';
import Goal from './components/goal';
import Predicts from './components/Predicts';
import CalorieCam from './components/camera';

import { StateProvider } from './store.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AsyncStorage, TouchableOpacity, Text } from 'react-native'

import { store } from './store';




const Tab = createBottomTabNavigator();



function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Goal" component={Goal} />
      <Tab.Screen name="Camera" component={CalorieCam} />
      <Tab.Screen name="Log" component={Log} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();



function App() {
  const [goal, setGoal] = useState(null)
  AsyncStorage.getItem('goal').then(data => setGoal(data))

  const globalState = useContext(store);
	const { state, dispatch } = globalState;


  useEffect(() => {
    console.log(globalState, 'globalState')
  }, [globalState])

  useEffect(() => {
    AsyncStorage.getItem('goal').then(data => setGoal(data))
  }, [])

  useEffect(() => {
    console.log(goal, 'GOAL')
  }, [goal])

  if (!goal)
    return null

  return (
      <StateProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName={goal ? "Home" : "GetStarted"}>
                  <Stack.Screen name="Welcome" component={Welcome} />
                  <Stack.Screen 
                    name="GetStarted" 
                    component={GetStarted} 
                    options={{
                      title: '',
                      headerStyle: {
                        backgroundColor: '#ffe8d6'
                      }
                    }}/>
                  <Stack.Screen 
                    name="Age" 
                    component={Age} 
                    options={{
                      title: '',
                      headerStyle: {
                        backgroundColor: '#ffe8d6'
                      }
                    }}/>
                    <Stack.Screen 
                      name="Gender" 
                      component={Gender} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="Height" 
                      component={Height} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="Weight" 
                      component={Weight} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="ActivityLevel" 
                      component={ActivityLevel} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="Results" 
                      component={Results} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="Log" 
                      component={Log} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
                    <Stack.Screen 
                      name="Home" 
                      component={Home} 
                      options={{
                        title: '',
                        headerStyle: {
                          backgroundColor: '#ffe8d6'
                        }
                    }}/>
              </Stack.Navigator> 
          </NavigationContainer>
      </StateProvider>
  );
}

export default App;