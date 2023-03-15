// Importing Packages
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";

// Function that adds a new match to the Matches page for the current user 
const NewMatches = ({ id, uri }) => {
  // Navigator definition
  const navigation = useNavigation();

  // Converts the user's profile picture to base64
  const pfp = new Buffer.from(uri.data).toString("base64");

  return (
    <>
      {/* Creating the gradient circle around the matche's profile picture */}
      <LinearGradient
        colors={["#B9DD5C", "#8C0C58"]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.matchProfile}
      >
        {/* Navigate to the match's socials page when profile picture is clicked on */}
        <Pressable onPress={() => navigation.navigate("Socials", { id: id })}>

          {/* Match's profile picture */}
          <Image
            source={{
              uri: "data:image/jpeg;base64," + pfp,
            }}
            style={styles.profilePic}
          />

        </Pressable>

      </LinearGradient>

    </>
  );
};

const { height } = Dimensions.get("window");

// Matches page
const MatchScreen = () => {

  // Get's current logged in user's id
  const dispatch = useDispatch();
  var { id } = useSelector((state) => state.id);

  // state: {
  //   screenHeight: 0
  // }
  // const [screenHeight, setScreenHeight] = React.useState(0);

  // const onContentSizeChange = (contentWidth, contentHeight) => {
  //     setScreenHeight(contentHeight);
  // };

  // Stores all matches matched with logged in user
  const [matches, setMatches] = useState([]);
  const isFocused = useIsFocused();

  // Function that get's all matches associated with the logged in user from the matches api
  const getMatches = () => {
    axios
      .get("http://spotify-match.us-west-1.elasticbeanstalk.com/matches/" + id)
      .then((response) => {
        console.log(response.data);
        setMatches(response["data"]);
      });
  };

  // Each time the user navigates back to the matches screen, getMatches() is called 
  useEffect(() => {
    isFocused && getMatches();
  }, [isFocused]);

  // Return's the Match's first name
  const returnFirstName = (name) => {
    const full_name = name.split(' ');
    const first_name = full_name[0];
    return first_name;
  }

  // Scroll enabled if user has more than 9 matches
  const scrollEnabled = true;

  return (
    <View style={styles.container}>

      <SafeAreaView>

        {/* Matches header */}
        <Text style={styles.header}>Matches</Text>

        {/* Number of matches text */}
        <View>
          {(() => {
            if (matches.length == 1) {
              return (
                <Text style={styles.numMatches}>
                  You have {matches.length} new match!
                </Text>
              );
            }

            return (
              <Text style={styles.numMatches}>
                You have {matches.length} new matches!
              </Text>
            );
          })()}
        </View>

        {/* New Matches text header */}
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={styles.desc}>New Matches</Text>
        </View>
      </SafeAreaView>

      {/* Flatlist containing all the logged in user's matches */}
      <FlatList
        data={matches}
        style={styles.storyContainer}
        numColumns={3}
        scrollEnabled={scrollEnabled}

        renderItem={({ item }) => (

          <>
            <View style={{ flexDirection: "column" }}>
  
              <NewMatches key={item.id} id={item.id} uri={item.picture1} />
              <Text style={styles.matchName}> {`${returnFirstName(item.name)}`} </Text>

            </View>
          </>

        )}
      />

    </View>

  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },

  // Matches header style
  header: {
    fontSize: 40,
    color: "#FFF",
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },

  // Number of logged in user's matches text style
  numMatches: {
    fontSize: 20,
    color: "#FE8AE3",
    marginTop: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },

  // New matches header style
  desc: {
    fontSize: 20,
    color: "#1DB954",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },

  // Matches with profile picture and name text style
  storyContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
  },

  // Linear gradient circle style
  matchProfile: {
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
    borderWidth: 6,
    padding: 2,
    overflow: "hidden",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // Match's profile picture style
  profilePic: {
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
    borderColor: "black",
    borderWidth: 5,
  },

  // Match's name style
  matchName: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
    marginRight: 15,
  }

});

export default MatchScreen;
