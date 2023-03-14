import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import UserCard from '../components/UserCard';
import { Linking } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';

const SocialsScreen = (id) => {
  const navigation = useNavigation();
  let matchId = id.route.params.id;
  console.log(matchId);

  // matchId = "0"; //keep as 0 for now
  // console.log(matchId);

  const [instagramSocial, setInstagram] = useState("");
  const [spotifySocial, setSpotify] = useState("");
  const [spotifyMatchId, setId] = useState("");

  const getSocials = () => {
    axios
      .get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/' + matchId)
      .then((response) => {
        setInstagram(response.data.instagram);
        setSpotify(response.data.name);
        setId(response.data.id);
      })
  };

  const deleteMatch = () => {
    axios
      .put('http://spotify-match.us-west-1.elasticbeanstalk.com/matches/',
        {
          "swiperid": 0,
          "swipeeid": matchId,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Matches");
      })
  };

  useEffect(() => {
    getSocials();     
  }, []);


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
        <UserCard id={matchId}/>
        <View style ={{flexDirection: 'row'}}>
            <Image 
                source={require('../assets/instagram.png')} 
                style={styles.instagramIcon}
            />
            <Text 
              style={styles.instagram}
              // onPress={() => Linking.openURL('http://instagram.com/' + instagramSocial)}
              onPress={() => Linking.openURL('http://instagram.com/jerry')}
            > 
              Instagram
            </Text>
            <Image 
                source={require('../assets/spotify.png')} 
                style={styles.spotifyIcon}
            />
            <Text 
              style={styles.spotify}
              onPress={() => Linking.openURL('https://open.spotify.com/user/31n5wbv4w7eriltts4rppwwqaldq')}
              // onPress={() => Linking.openURL('https://open.spotify.com/user/' + spotifyMatchId)}
            > 
              Spotify
            </Text>
        </View>
        <View>
            <Button
                title="Delete Match"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                titleStyle={{ fontWeight: 'bold', color: 'white', fontSize: '20' }}
                onPress={() => deleteMatch()}
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
    marginLeft: 60,
    marginBottom: 20,
    top: -20
  },

  instagram: {
    color: "#FE8AE3",
    textDecorationLine: 'underline',
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
    color: "#1DB954",
    textDecorationLine: 'underline',
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10,
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