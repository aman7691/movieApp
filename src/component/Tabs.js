import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Movies from '../screens/Movies';
import SearchResult from '../screens/SearchResult';
import TvShows from '../screens/TvShows';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SinglePage from '../screens/SinglePage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './Header';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="HomeScreen" component={MainTabs} />
        <Stack.Screen name="SinglePage" component={SinglePage} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabs = () => {
  return (
    <SafeAreaProvider>
      <Header/>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Movies} />
        <Tab.Screen name="Search" component={SearchResult} />
        <Tab.Screen name="Shows" component={TvShows} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}


export default Tabs;
