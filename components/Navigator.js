// import * as React from 'react';
// import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useColorScheme } from 'react-native';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import MatchesScreen from '../screens/MatchesScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// //Screen names
// const homeName = "Homepage";
// const matchesName = "Matches";
// const profileName = "Profile";

// const Tab = createBottomTabNavigator();

// function MainContainer() {
//   // const scheme = useColorScheme();
//   return (

//     <NavigationContainer theme={DarkTheme} independent={true}>
//     {/* <NavigationContainer theme={DarkTheme}> */}
//       <Tab.Navigator
//         initialRouteName={homeName}
//         // initialRouteName={Home}
//         screenOptions={({ route }) => ({
//             "tabBarActiveTintColor": "tomato",
//             "tabBarInactiveTintColor": "grey",
//             "tabBarLabelStyle": {
//             "paddingBottom": 3,
//             "fontSize": 9,
//             // "paddingBottom": 10,
//             // "fontSize": 10
//         },
//         headerShown: false, // this controls the header, commenting this out will show the header
//         // headerStyle: { backgroundColor: 'black' },
//         "tabBarStyle": [
//             {
//             // "backgroundColor": "#28282B",
//             "display": "flex",
//             // "height": 75,
//             },
//             null
//         ],
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;
//             // if (rn === Home) {
//             if (rn === homeName) {
//               iconName = focused ? 'person' : 'person-outline';

//             } else if (rn === matchesName) {
//               iconName = focused ? 'chatbox' : 'chatbox-outline';

//             } else if (rn === profileName) {
//               iconName = focused ? 'person-circle' : 'person-circle-outline';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         >

//         {/* <Tab.Screen name={homeName} component={HomeScreen} /> */}
//         <Tab.Screen name={matchesName} component={MatchesScreen} />
//         <Tab.Screen name={profileName} component={ProfileScreen} />

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MainContainer;
