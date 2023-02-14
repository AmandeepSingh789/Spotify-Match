import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        type="clear"
        icon={<Icon name="arrowleft" size={25} color="white" />}
        style={styles.button}
        onPress={() => navigation.navigate("MatchScreen")}
      />
      <Text style={styles.text}> Chat Page! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "flex-start",
  },
  button: {
    color: "white",
    marginTop: 70,
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 40,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 300,
  },
});

export default ChatScreen;
