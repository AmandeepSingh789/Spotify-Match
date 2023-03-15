import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import UserCard from "../components/UserCard";
import { Icon } from "@rneui/themed";
import Layout from "../ constants/Layout";
import { useRef, useState, useEffect } from "react";
import CardsSwipe from "react-native-cards-swipe";
import axios from "axios";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const [Matches, setMatches] = useState([]);
  const [numMatches, setNumMatches] = useState([]);

  const [userIds, setuserIds] = useState([]);

  const dispatch = useDispatch();
  var { id: loggedInUser } = useSelector((state) => state.id);

  const getMatches = () => {
    axios
      .get(
        `http://spotify-match.us-west-1.elasticbeanstalk.com/home/${loggedInUser}`
      )
      .then((response) => {
        setNumMatches(response["data"]);
        setMatches(response);
        setuserIds(
          response.data.map((item, index) => ({
            userid: item.id.trim(),
            index: index,
          }))
        );
      });
  };
  useEffect(() => {
    getMatches();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {userIds.length > 0 && (
        <CardsSwipe
          cards={userIds}
          cardContainerStyle={styles.cardContainer}
          loop={false}
          renderNoMoreCard={() => (
            <View>
              <Text style={styles.noMorePeople}>{"Check Again Soon!"}</Text>
            </View>
          )}
          renderCard={({ userid }) => (
            <View>
              <UserCard id={userid} />
            </View>
          )}
          onSwipedLeft={(id) => {
            const leftData = {
              swipeeid: userIds[id].userid,
              swiperid: loggedInUser,
              liked: false,
            };
            console.log(
              "http://spotify-match.us-west-1.elasticbeanstalk.com/matches/",
              leftData
            );
            axios
              .post(
                "http://spotify-match.us-west-1.elasticbeanstalk.com/matches/",
                leftData
              )
              .then((response) => {
                console.log("Match saved:", response.data);
              })
              .catch((error) => {
                console.log("Error saving match:", error);
              });
          }}
          onSwipedRight={(id) => {
            const rightData = {
              swipeeid: userIds[id].userid,
              swiperid: loggedInUser,
              liked: true,
            };
            console.log(
              "http://spotify-match.us-west-1.elasticbeanstalk.com/matches/",
              rightData
            );
            axios
              .post(
                "http://spotify-match.us-west-1.elasticbeanstalk.com/matches/",
                rightData
              )
              .then((response) => {
                console.log("Match saved:", response.data);
              })
              .catch((error) => {
                console.log("Error saving match:", error);
              });
          }}
          renderYep={() => (
            <View style={styles.like}>
              <Text style={styles.likeLabel}>YEP</Text>
            </View>
          )}
          renderNope={() => (
            <View style={styles.nope}>
              <Text style={styles.nopeLabel}>NOPE</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 400,
    // height: 700,
    // flex: 1,
    backgroundColor: "#fffff",
    // alignItems: 'center',
    flex: 1,

    // height:"95%",
  },
  flatList: {
    flatList: {
      height: Layout.window.height - 80,
    },
    flexGrow: 0,
    // marginBottom:5,
  },
  cardContainer: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },
  noMorePeople: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // color:'#FF2DB6',
    color: "#FE8AE3",
    fontWeight: "bold",
    fontSize: 44,
    fontFamily: "Baskerville-SemiBold",
  },
  like: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginLeft: 30,
    marginTop: 20,
    borderColor: "lightgreen",
    transform: [{ rotateZ: "-22deg" }],
  },
  likeLabel: {
    fontSize: 100,
    color: "#3EFF2D",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginRight: 30,
    marginTop: 25,
    borderColor: "red",
    transform: [{ rotateZ: "22deg" }],
  },
  nopeLabel: {
    fontSize: 100,
    color: "red",
    fontWeight: "bold",
  },
});
