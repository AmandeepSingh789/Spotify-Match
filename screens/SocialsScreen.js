import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import UserCard from '../components/UserCard';
import { Linking } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';
import { match } from "assert";

const SocialsScreen = (id) => {
  const navigation = useNavigation();
  let matchId = id.route.params.id;
  console.log(matchId);

  // matchId = "0"; //keep as 0 for now
  // console.log(matchId);

  const [instagramSocial, setInstagram] = useState("");
  const [spotifySocial, setSpotify] = useState("");
  const [spotifyMatchId, setId] = useState("");
  const [userIds, setuserIds] = useState([]);
  const [logged_userID, setlogged_userID] = useState();

  setlogged_userID("312y4f3aszlc46xjgxawtkwlssei");

  const getuserIDfromMatches = () => {
    axios
        .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/home/${setlogged_userID}`)
        .then((response) => {
          setuserIds(response.data.map((item, index) => ({
          userid: item.id.trim(),
          index: index
        })));
        console.log(userIds)

          
        });
  }; 
  useEffect(() => {

    getuserIDfromMatches();

  }, []);

  const getSocials = () => {
    axios
      .get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/' + matchId)
      .then((response) => {
        setInstagram(response.data.instagram);
        setSpotify(response.data.name);
        setId(response.data.id);
      })
  };
  // onSwipedLeft ={(id) => {
  //   const leftData = {
  //     swipeeid:userIds[id].userid,
  //     swiperid: 1,
  //     liked: false,
  //   }
  //   console.log('http://spotify-match.us-west-1.elasticbeanstalk.com/matches/',leftData);
  //   axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/matches/',leftData)
  //   .then((response) => {
  //     console.log('Match saved:', response.data);
  //   })
  //   .catch((error) => {
  //     console.log('Error saving match:', error);
  //   });
  // }}
  const deleteMatch = (matchId) => {
    const deleteData = {
      swiperid: "312y4f3aszlc46xjgxawtkwlssei",
      swipeeid: userIds[matchId].userid
    }
    axios
      .put('http://spotify-match.us-west-1.elasticbeanstalk.com/matches/', deleteData
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