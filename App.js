// Importing Packages
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens File Paths
import SpotifyLogin from "./screens/SpotifyLoginScreen";
import SurveyGeneralQuestions from "./screens/SurveyGeneralQuestionsScreen";
import SurveyBio from "./screens/SurveyBioScreen";
import SurveyAdvancedQuestions from "./screens/SurveyAdvancedQuestionsScreen";
import AddImages from "./screens/AddImagesScreen";
import Home from "./screens/HomeScreen";
import Matches from "./screens/MatchesScreen";
import Profile from "./screens/ProfileScreen";
import SocialsScreen from "./screens/SocialsScreen";

//Screens names
const spotifyLoginScreenName = "Spotify Login Screen";
const surveyGeneralScreenName = "SurveyGeneralQuestions";
const surveyBioScreenName = "SurveyBio";
const surveyAdvancedScreenName = "SurveyAdvancedQuestions";
const addImagesScreenName = "AddImages";
const homeScreenName = "Homepage";
const matchesScreenName = "Matches";
const socialsScreenName = "Socials";
const profileScreenName = "Profile";

// Import Redux states
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Main App function
// Contains the entire stack navigation
export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name={spotifyLoginScreenName}
            component={SpotifyLogin}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={surveyGeneralScreenName}
            component={SurveyGeneralQuestions}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={surveyBioScreenName}
            component={SurveyBio}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={surveyAdvancedScreenName}
            component={SurveyAdvancedQuestions}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={addImagesScreenName}
            component={AddImages}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={TabNavigation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={socialsScreenName}
            component={SocialsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Function for Tab Navigation
// Called in the App() function
function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={homeScreenName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#3EFF2D",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          paddingBottom: 3,
          fontSize: 9,
          // "paddingBottom": 10,
          // "fontSize": 10
        },
        headerShown: false, // this controls the header, commenting this out will show the header
        // headerStyle: { backgroundColor: 'black' },
        tabBarStyle: [
          {
            // "backgroundColor": "#28282B",
            display: "flex",
            // "height": 75,
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          // if (rn === Home) {
          if (rn === homeScreenName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === matchesScreenName) {
            iconName = focused ? "heart" : "heart-circle-outline";
          } else if (rn === profileScreenName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeScreenName} component={Home} />
      <Tab.Screen name={matchesScreenName} component={Matches} />
      <Tab.Screen name={profileScreenName} component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
