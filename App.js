import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React  from 'react';

/* screen */
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ChatBot from './screens/ChatBot';
import Report from './screens/Report';
import Setting from './screens/Setting';
import { Provider } from 'react-redux';
import logInfo from './redux/logInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={logInfo}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
          <Stack.Screen name="ChatBot" component={ChatBot} options={{headerShown: false}} />
          <Stack.Screen
            name="Report"
            component={Report}
            options={{
              headerShown: false,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              }),
            }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: false,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              }),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}