import { StyleSheet, Text, View, Image } from "react-native";
import ChatScreen from "../screens/ChatScreen";
import MatchScreen from "../screens/MatchesScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchScreen"
          component={MatchScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});