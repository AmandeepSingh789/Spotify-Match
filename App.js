import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import UserCard from './components/UserCard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import MatchScreen from './screens/MatchScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createStackNavigator();
  return(
   <NavigationContainer>
     <Stack.Navigator>
      
       <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
       <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />

     </Stack.Navigator>
   </NavigationContainer>
 );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    // height:"0%",    
  },
  
});
