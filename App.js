import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React  from 'react';

/* screen */
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ChatBot from './screens/ChatBot';
import Report from './screens/Report';
import Modification from './screens/Modification';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatBot" component={ChatBot} options={{headerShown: false}} />
      <Stack.Screen name="Report" component={Report} options={{headerShown: false}} />
      <Stack.Screen name="Modification" component={Modification} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
