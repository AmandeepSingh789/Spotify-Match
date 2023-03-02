// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import Navigator from './components/Navigator';

// export default function App() {
//   return (
    
//     <View style={styles.container}>
    
//     <Navigator/>
    
//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
    
//     // height:"0%",    
//   },
  
// });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SpotifyLogin from './screens/SpotifyLoginScreen';
import SurveyGeneralQuestions from './screens/SurveyGeneralQuestionsScreen';
import SurveyBio from './screens/SurveyBioScreen';
import SurveyAdvancedQuestions from './screens/SurveyAdvancedQuestionsScreen';
import AddImages from './screens/AddImagesScreen';
import Home from './screens/HomeScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SpotifyLoginScreen" component={SpotifyLogin} />
      <Stack.Screen options={{headerShown: false}} name="SurveyGeneralQuestions" component={SurveyGeneralQuestions} />
      <Stack.Screen options={{headerShown: false}} name="SurveyBio" component={SurveyBio} />
      <Stack.Screen options={{headerShown: false}} name="SurveyAdvancedQuestions" component={SurveyAdvancedQuestions} />
      <Stack.Screen options={{headerShown: false}} name="AddImages" component={AddImages} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
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