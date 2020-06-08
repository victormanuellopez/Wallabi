import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddHabitatScreen from './screens/Habitat/AddHabitatScreen';
import HabitatScreen from './screens/Habitat/HabitatScreen';
import HabitatDetailScreen from './screens/Habitat/HabitatDetailScreen';
import HabitatCRUDScreen from './screens/Habitat/HabitatCRUDScreen';

import AddSufferingScreen from './screens/Suffering/AddSufferingScreen';
import SufferingCRUDScreen from './screens/Suffering/SufferingCRUDScreen';
import SufferingDetailScreen from './screens/Suffering/SufferingDetailScreen';
import SufferingScreen from './screens/Suffering/SufferingScreen';

import AddEmployeeScreen from './screens/Employee/AddEmployeeScreen';
import EmployeeCRUDScreen from './screens/Employee/EmployeeCRUDScreen';
import EmployeeDetailScreen from './screens/Employee/EmployeeDetailScreen';
import EmployeeScreen from './screens/Employee/EmployeeScreen';

import AddAnimalScreen from './screens/Animal/AddAnimalScreen';
import AnimalCRUDScreen from './screens/Animal/AnimalCRUDScreen';
import AnimalDetailScreen from './screens/Animal/AnimalDetailScreen';
import AnimalScreen from './screens/Animal/AnimalScreen';


import AddUserScreen from './screens/User/AddUserScreen';
import UserCRUDScreen from './screens/User/UserCRUDScreen';
import UserDetailScreen from './screens/User/UserDetailScreen';
import UserScreen from './screens/User/UserScreen';

import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login'

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}>  
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }}/>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Home' }}/>

      


      <Stack.Screen 
        name="HabitatCRUDScreen" 
        component={HabitatCRUDScreen} 
        options={{ title: 'Habitat' }}/>
      <Stack.Screen 
        name="SufferingCRUDScreen" 
        component={SufferingCRUDScreen} 
        options={{ title: 'Suffering' }}/>
      <Stack.Screen 
        name="EmployeeCRUDScreen" 
        component={EmployeeCRUDScreen} 
        options={{ title: 'Employee' }}/>
        <Stack.Screen 
        name="UserCRUDScreen" 
        component={UserCRUDScreen} 
        options={{ title: 'User' }}/>
      <Stack.Screen 
        name="AnimalCRUDScreen" 
        component={AnimalCRUDScreen} 
        options={{ title: 'Animal' }}/>



      <Stack.Screen 
        name="AddHabitatScreen" 
        component={AddHabitatScreen} 
        options={{ title: 'Add Habitat' }}/>
      <Stack.Screen 
        name="HabitatScreen" 
        component={HabitatScreen} 
        options={{ title: 'Habitat List' }}/>
      <Stack.Screen 
       name="HabitatDetailScreen" 
       component={HabitatDetailScreen} 
       options={{ title: 'Habitat Detail' }}/>



      <Stack.Screen 
        name="AddSufferingScreen" 
        component={AddSufferingScreen} 
        options={{ title: 'Add Suffering' }}/>
      <Stack.Screen 
        name="SufferingScreen" 
        component={SufferingScreen} 
        options={{ title: 'Suffering List' }}/>
      <Stack.Screen 
       name="SufferingDetailScreen" 
       component={SufferingDetailScreen} 
       options={{ title: 'Suffering Detail' }}/>



      <Stack.Screen 
        name="AddEmployeeScreen" 
        component={AddEmployeeScreen} 
        options={{ title: 'Add Employee' }}/>
      <Stack.Screen 
        name="EmployeeScreen" 
        component={EmployeeScreen} 
        options={{ title: 'Employee List' }}/>
      <Stack.Screen 
       name="EmployeeDetailScreen" 
       component={EmployeeDetailScreen} 
       options={{ title: 'Employee Detail' }}/>


      <Stack.Screen 
        name="AddAnimalScreen" 
        component={AddAnimalScreen} 
        options={{ title: 'Add Animal' }}/>
      <Stack.Screen 
        name="AnimalScreen" 
        component={AnimalScreen} 
        options={{ title: 'Animal List' }}/>
      <Stack.Screen 
       name="AnimalDetailScreen" 
       component={AnimalDetailScreen} 
       options={{ title: 'Animal Detail' }}/>


      <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}/>
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'User List' }}/>
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'Animal Detail' }}/>
      
      
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

