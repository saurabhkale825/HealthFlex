import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './Context/TimerContext';
import HomeScreen from './Screens/HomeScreen';
import AddTimerScreen from './Screens/AddTImerScreen';
import HistoryScreen from './Screens/HistoryScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Timer" component={AddTimerScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
