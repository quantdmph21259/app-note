import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// naivgation
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './comp/List';
import Edit from './comp/Edit';

const StackMain = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StackMain.Navigator  initialRouteName='List' screenOptions={{headerShown: false}}>
      <StackMain.Screen name = "List" component={List} />
      <StackMain.Screen name = "Edit" component={Edit} />
      </StackMain.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
