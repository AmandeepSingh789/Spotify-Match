import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home';
import NewUserQuestions from './screens/newUserQuestions';
import Bio from './screens/bio';
import Survey from './screens/survey';
import AddImages from './screens/addimages';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="NewUserQuestions" component={NewUserQuestions} />
      <Stack.Screen options={{headerShown: false}} name="Bio" component={Bio} />
      <Stack.Screen options={{headerShown: false}} name="Survey" component={Survey} />
      <Stack.Screen options={{headerShown: false}} name="AddImages" component={AddImages} />
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