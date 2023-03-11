import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import UserCard from '../components/UserCard';

const SocialsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={{alignSelf: 'flex-start'}}>
            <Button
                type="clear"
                icon={<Icon name="arrowleft" size={25} color="white" />}
                style={styles.arrow}
                onPress={() => navigation.navigate("Matches")}
            />
        </View>
        <Text style={styles.header}> Contact Info </Text>
        <UserCard id={'0'}/>
        <View style ={{flexDirection: 'row'}}>
            <Image 
                source={require('../assets/instagram.png')} 
                style={styles.instagramIcon}
            />
            <Text style={styles.instagram}> jerry2002 </Text>
            <Image 
                source={require('../assets/spotify.png')} 
                style={styles.spotifyIcon}
            />
            <Text style={styles.spotify}> jerry2002 </Text>
        </View>
        <View>
            <Button
                title="Delete Match"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                titleStyle={{ fontWeight: 'bold', color: 'white', fontSize: '20' }}
            />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  header: {
    fontSize: 30,
    color: "#FFF",
    marginTop: -40,
    fontWeight: "bold",
    alignSelf: "center",
  },

  arrow: {
    color: "white",
    marginLeft: 0,
  },

  instagramIcon: {
    height: 40,
    width: 40,
    marginLeft: 50,
    marginBottom: 20,
    top: -20
  },

  instagram: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10
  },

  spotifyIcon: {
    height: 40,
    width: 40,
    marginBottom: 20,
    marginLeft: 20,
    top: -20
  },

  spotify: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10
  },

  buttonStyle: {
    backgroundColor: '#900603',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    height: 60
  },
  buttonContainer: {
    width: 160,
    alignSelf: 'center',
    marginTop: -20,
  },
});

export default SocialsScreen;