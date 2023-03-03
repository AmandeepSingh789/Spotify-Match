import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SpotifyLogin from './screens/SpotifyLoginScreen';
import SurveyGeneralQuestions from './screens/SurveyGeneralQuestionsScreen';
import SurveyBio from './screens/SurveyBioScreen';
import SurveyAdvancedQuestions from './screens/SurveyAdvancedQuestionsScreen';
import AddImages from './screens/AddImagesScreen';
import Home from './screens/HomeScreen';

import Matches from './screens/MatchesScreen';
import Profile from './screens/ProfileScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator>
      <Stack.Screen name="SpotifyLoginScreen" component={SpotifyLogin} />
      <Stack.Screen options={{headerShown: false}} name="SurveyGeneralQuestions" component={SurveyGeneralQuestions} />
      <Stack.Screen options={{headerShown: false}} name="SurveyBio" component={SurveyBio} />
      <Stack.Screen options={{headerShown: false}} name="SurveyAdvancedQuestions" component={SurveyAdvancedQuestions} />
      <Stack.Screen options={{headerShown: false}} name="AddImages" component={AddImages} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={TabNavigation} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homepage" component={Home} />
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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