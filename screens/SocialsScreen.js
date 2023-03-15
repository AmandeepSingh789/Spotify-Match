// Importing Packages
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { Linking } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

// Importing UserCard component
import UserCard from "../components/UserCard";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";

// Social's page
const SocialsScreen = (id) => {
  // Navigator definition
  const navigation = useNavigation();

  //Match id passed as parameter from Match's page
  let matchId = id.route.params.id;
  console.log(matchId);

  // Get's current logged in user's id
  const dispatch = useDispatch();
  var { id } = useSelector((state) => state.id);

  const isFocused = useIsFocused();

  // Constants to store Match's socials
  const [instagramSocial, setInstagram] = useState("");
  const [spotifySocial, setSpotify] = useState("");
  const [spotifyMatchId, setId] = useState("");

  // Function that get's all match's information (socials, etc.) from the users api
  const getSocials = () => {
    axios
      .get(
        "http://spotify-match.us-west-1.elasticbeanstalk.com/users/" + matchId
      )
      .then((response) => {

        // Setting social variables
        setInstagram(response.data.instagram);
        setSpotify(response.data.name);
        setId(response.data.id);

      });
  };

  // Function that deletes the current match from the logged in user's matches page
  const deleteMatch = () => {
    const deleteData = {
      swipeeid: id,
      swiperid: matchId,
    };
    axios
      .put(
        "http://spotify-match.us-west-1.elasticbeanstalk.com/matches/",
        deleteData
      )
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Matches");
      });
  };

  // Each time the user navigates to the Socials screen, getSocials() is called 
  useEffect(() => {
    isFocused && getSocials();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ alignSelf: "flex-start" }}>

        {/* Arrow button to navigate back to the matches page*/}
        <Button
          type="clear"
          icon={<Icon name="arrowleft" size={25} color="white" />}
          style={styles.arrow}
          onPress={() => navigation.navigate("Matches")}
        />

      </View>

      {/* Contact Info header text */}
      <Text style={styles.header}> Contact Info </Text>

      {/* User card retrieved for current match id */}
      <UserCard id={matchId} />

      <View style={{ flexDirection: "row" }}>

        {/* Instagram icon */}
        <Image
          source={require("../assets/instagram.png")}
          style={styles.instagramIcon}
        />

        {/* Current match's instagram social link */}
        <Text
          style={styles.instagram}
          onPress={() =>
            Linking.openURL("http://instagram.com/" + instagramSocial)
          }
        >
          Instagram
        </Text>

        {/* Spotify icon */}
        <Image
          source={require("../assets/spotify.png")}
          style={styles.spotifyIcon}
        />

        {/* Current match's spotify social link */}
        <Text
          style={styles.spotify}
          onPress={() =>
            Linking.openURL("https://open.spotify.com/user/" + spotifyMatchId)
          }
        >
          Spotify
        </Text>

      </View>

      <View>
        
        {/* Button to delete current match, navigates back to the Matches page */}
        <Button
          title="Delete Match"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontWeight: "bold", color: "white", fontSize: "20" }}
          onPress={() => deleteMatch()}
        />

      </View>

    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  // Contact info header style
  header: {
    fontSize: 30,
    color: "#FFF",
    marginTop: -40,
    fontWeight: "bold",
    alignSelf: "center",
  },

  // Arrow button (navigate back to Matches page) style
  arrow: {
    color: "white",
    marginLeft: 0,
  },

  // Instagram icon style
  instagramIcon: {
    height: 40,
    width: 40,
    marginLeft: 60,
    marginBottom: 20,
    top: -20,
  },

  // Instagram link style
  instagram: {
    color: "#FE8AE3",
    textDecorationLine: "underline",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10,
  },

  // Spotify icon style
  spotifyIcon: {
    height: 40,
    width: 40,
    marginBottom: 20,
    marginLeft: 20,
    top: -20,
  },

  // Spotify link style
  spotify: {
    color: "#1DB954",
    textDecorationLine: "underline",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10,
  },

  // Delete match button style
  buttonStyle: {
    backgroundColor: "#900603",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 30,
    height: 60,
  },

  // Delete match button container style
  buttonContainer: {
    width: 160,
    alignSelf: "center",
    marginTop: -20,
  },
  
});

export default SocialsScreen;
