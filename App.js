import React from 'react';
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

import { StateProvider } from './store.js';

// import { createBottomTabNavigator } from 'react-navigation-tabs'

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

const Stack = createStackNavigator();

function App() {
  return (
      <StateProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="GetStarted">
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
              </Stack.Navigator>
          </NavigationContainer>
      </StateProvider>
  );
}

export default App;