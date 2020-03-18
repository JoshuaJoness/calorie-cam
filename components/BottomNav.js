/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  Layout,
} from '@ui-kitten/components';
import { createBottomTabNavigator } from 'react-navigation-tabs';



export const BottomNav = (props) => {

  const [topSelectedIndex, setTopSelectedIndex] = React.useState(0);
  const [bottomSelectedIndex, setBottomSelectedIndex] = React.useState(0);
  const goToLog = () => {
    props.navigation.navigate('Log', {loggedFoods:loggedFoods})
  }

  return (
    <Layout>

      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={topSelectedIndex}
        onSelect={setTopSelectedIndex}>
        <BottomNavigationTab />
        <BottomNavigationTab />
        <BottomNavigationTab onSelect={console.log('yos')}/>
      </BottomNavigation>


    </Layout>
  );
};

export const BottomTabNavigator = createBottomTabNavigator({
  Dashboard: Dashboard,
  Settings: Settings,
}, {
  initialRouteName: 'Dashboard',
  tabBarComponent: BottomNavigationShowcase,
});

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});
