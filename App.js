import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <Tab.Navigator
      initialRouteName={"Homepage"}
          // initialRouteName={Home}
          screenOptions={({ route }) => ({
              "tabBarActiveTintColor": "tomato",
              "tabBarInactiveTintColor": "grey",
              "tabBarLabelStyle": {
              "paddingBottom": 3,
              "fontSize": 9,
              // "paddingBottom": 10,
              // "fontSize": 10
          },
          headerShown: false, // this controls the header, commenting this out will show the header
          // headerStyle: { backgroundColor: 'black' },
          "tabBarStyle": [
              {
              // "backgroundColor": "#28282B",  
              "display": "flex",
              // "height": 75,
              },
              null
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            // if (rn === Home) {
            if (rn === "Homepage") {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === "Matches") {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            } else if (rn === "Profile") {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          >
        <Tab.Screen options={{headerShown: false}} name="Homepage" component={Home} />
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