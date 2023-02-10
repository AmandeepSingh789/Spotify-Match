import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/home';
import NewUserQuestions from './src/newUserQuestions';
import Bio from './src/bio';
import Survey from './src/survey';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="NewUserQuestions" component={NewUserQuestions} />
      <Stack.Screen options={{headerShown: false}} name="Bio" component={Bio} />
      <Stack.Screen options={{headerShown: false}} name="Survey" component={Survey} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
// options={{headerShown: false}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});