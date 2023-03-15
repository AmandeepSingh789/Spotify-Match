import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { Divider, Icon, Text } from "@rneui/themed";
import Layout from "../ constants/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

import { questionBank } from "../redux/UserData";

const compatibility = "80%";

// Card component that displays user information
function Card({ id }) {
  // State variables to store user data
  const [Name, setName] = useState([]);
  const [Bio, setBio] = useState([]);
  const [Age, setAge] = useState([]);
  const [Answer1, setAnswer1] = useState([]);
  const [Answer2, setAnswer2] = useState([]);
  const [Answer3, setAnswer3] = useState([]);
  const [Q1, setQ1] = useState([]);
  const [Q2, setQ2] = useState([]);
  const [Q3, setQ3] = useState([]);
  const [pic1, setPic1] = useState({});
  const [pic2, setPic2] = useState([]);
  const [pic3, setPic3] = useState([]);
  const [pic4, setPic4] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [gender, SetGender] = useState([]);
  const [orientation, SetOrientation] = useState([]);
  const [location, SetLocation] = useState([]);
  const [pronouns, SetPronouns] = useState([]);


  let genres = ["hip-hop", "lo-fi", "indie", "pop", "rock", "swedish-house", "death-metal", "math-rock", "jazz"];
  let artists = [["Dua Lipa", "6M2wZ9GZgrQXHCFfjv46we"],
  ["JAY-Z", "3nFkdlSjzX9mRTtwJOzDYB"],
  ["Nujabes", "3Rq3YOF9YG9YfCWD4D56RZ"],
  ["Men I Trust", "3zmfs9cQwzJl575W1ZYXeT"],
  ["Rihanna", "5pKCCKE2ajJHZ9KAiaK11H"],
  ["SZA", "7tYKF4w9nC0nq9CsPZTHyP"],
  ["Thad Jones", "6DbqS0X8cSFOPGsvyze2yh"],
  ["Miles Davis", "0kbYTNQb4Pb1rPbbaF0pT4"],
  ["Doja Cat", "5cj0lLjcoR7YOSnhnX0Po5"]]

  let tracks = [["Both Sides Of The Moon", "3zBCukLskhPfajaRaGgEvc"],
  ["telepatía // acoustic", "2syQErCMMM1rXeZqtuaqxg"],
  ["Aces", "4pV6Kx1T9L49PBFwH1g8ca"],
  ["Mercury", "3ixe45hov7EBKXm8tYBmvX"],
  ["Shibuya (feat. Syd)", "6WVSnyKQGzs1fosa2I3FMQ"],
  ["One Beer", "4BnrGx9tWNF8aiXl1UhDBa"],
  ["505", "58ge6dfP91o9oXMzq3XkIS"],
  ["Cruisin to the Park", "3XITcXbaKS08ardf8ahKqM"],
  ["Walkin", "1q8DwZtQen5fvyB7cKbShC"]]

  let dummyGenres = [];
  for (let i = 0; i < 10; i++) {
    dummyGenres.push({
      "genre": genres[Math.floor(Math.random() * 9)],
      "rank": i + 1,
    })
  }

  let dummyArtists = [];
  for (let i = 0; i < 10; i++) {
    let val = Math.floor(Math.random() * 9)
    dummyArtists.push({
      "artistid": artists[val][1],
      "artistname": artists[val][0],
      "rank": i + 1,
    })
  }

  let dummyTracks = [];
  for (let i = 0; i < 10; i++) {
    let val = Math.floor(Math.random() * 9);
    dummyTracks.push({
      "rank": i + 1,
      "trackid": tracks[val][1],
      "trackname": tracks[val][0],
    })
  }

  const [TopSongs, SetTopSongs] = useState(dummyTracks);
  const [TopGenres, SetTopGenres] = useState(dummyGenres);
  const [TopArtists, SetTopArtists] = useState(dummyArtists);

  // Array of pictures
  const pics = [
    {
      id: 1,
      uri: "data:image/jpeg;base64," + pic1,
    },
    {
      id: 2,
      uri: "data:image/jpeg;base64," + pic2,
    },
    {
      id: 3,
      uri: "data:image/jpeg;base64," + pic3,
    },
    {
      id: 4,
      uri: "data:image/jpeg;base64," + pic4,
    },
  ];

  const generateColor = () => {
    let colors = ['#B9DD5C', '#D64000', '#FFD5C2', '#E3D9EB', '#C8E0FC', '#D6E3B4']

    return colors[Math.floor(Math.random() * 5)]
  }

  async function getUserById({ id }) {
    console.log("rendering card: " + id);
    return axios
      .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/users/${id}`)
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
      });
  }

  const getData = async ({ id }) => {
    setLoaded(false);
    const response = await getUserById({ id });

    // console.log(response.data);
    setName(response["data"]["name"]);
    setBio(response["data"]["bio"]);
    setAnswer1(response["data"]["answer1"]);
    setAnswer2(response["data"]["answer2"]);
    setAnswer3(response["data"]["answer3"]);

    getAge(response["data"]["birthdate"]);
    GetGender(response["data"]["gender"]);
    GetOrientation(response["data"]["orientation"]);
    GetPronouns(response["data"]["pronouns"])
    SetLocation(response["data"]["location"])
    SetTopSongs(response["data"]["topsongs"]);
    SetTopGenres(response["data"]["topgenres"]);
    SetTopArtists(response["data"]["topartists"]);

    const q1id = response["data"]["questionid1"];
    const q2id = response["data"]["questionid2"];
    const q3id = response["data"]["questionid3"];

    setQ1(questionBank._z[q1id].value);
    setQ2(questionBank._z[q2id].value);
    setQ3(questionBank._z[q3id].value);

    setLoaded(true);

    // setPic1(binaryToBase64(response["data"]["profilepictures"]["picture1"]["data"]))
    // setPic2(binaryToBase64(response["data"]["profilepictures"]["picture2"]["data"]))
    // setPic3(binaryToBase64(response["data"]["profilepictures"]["picture3"]["data"]))
    // setPic4(binaryToBase64(response["data"]["profilepictures"]["picture4"]["data"]))
  };

  useEffect(() => {
    getData({ id });
  }, [id]);

  // Flatlist Image Item
  const Item = ({ item }) => (
    <View style={styles.imageContainer}>
      {/* <Image source={{uri:"data:image/jpeg;base64,"+ `${pic2}`}}
      resizeMode="cover"
      style={styles.image} 
       /> */}

      <Image
        source={{ uri: item.uri }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );

  // Function to get age from DOB
  const getAge = (DOB) => {
    var date = new Date(DOB);
    let today = new Date();

    var distance = date.getTime() - today.getTime();
    var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
    var yearsOld = Math.abs((daysOld / 365).toFixed(0));
    yearsOld.toString();
    setAge(yearsOld);
  };

  function binaryToBase64(data) {
    return new Buffer.from(data).toString("base64");
  }

  const GetGender = (gender) => {
    let map = {
      F: "Female",
      M: "Male",
      N: "Non Binary",
    };
    SetGender(map[gender]);
  };

  const GetOrientation = (orientation) => {
    let map = {
      S: "Straight",
      B: "Bisexual",
      G: "Gay",
      P: "Pansexual",
    };
    SetOrientation(map[orientation]);
  };

  const GetPronouns = (pronouns) => {
    if (pronouns == null) {
      SetPronouns("-/-");
    }
    else {
      SetPronouns(pronouns);
    }

  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Container */}
        <View>
          {/* <Image source={{uri:"data:image/jpeg;base64,"+ pic1}}
      resizeMode="cover"
      style={styles.image} 
       /> */}
          <FlatList
            data={pics}
            renderItem={({ item }) => <Item item={item} />}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showHorizontalScrollIndicator={false}
            style={styles.flatList}
          />
        </View>

        {/* -------------------------------------------------------------------- */}

        {/* Box with Name,Age and Meter*/}
        <View style={styles.upperBox}>
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{`${Name}, ${Age}`}</Text>
            <Text style={styles.genderAndOrientation}>
              {`${gender}, ${orientation}, ${pronouns}`}
            </Text>
            <Text style={styles.location}>
              {`${location}`}
            </Text>
          </View>

          <View style={styles.meter}>
            {/* POPUP CODE BEGINS */}
            <View style={styles.centeredView}>
              <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {/* <Text style={styles.modalText}>Top Songs: Top Genres: </Text> */}
                    <Pressable
                      style={[styles.button]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>X</Text>
                    </Pressable>
                    <Text style={styles.modalText}>Compatiable songs: </Text>
                    <Text style={styles.modalText}>{`${TopSongs}`} </Text>
                    {/* INSERT COMPATIBILITY FUNCTION HERE TO ADD SHARED SONGS  */}
                  </View>
                </View>
              </Modal>
              <Pressable onPress={() => setModalVisible(true)}>
                <Text style={styles.percentage}>{compatibility}</Text>
              </Pressable>
            </View>
            {/* POPUP CODE ENDS */}

            {/* <Text style={styles.percentage}>{compatibility}</Text> */}
          </View>
        </View>

        {/* -------------------------------------------------------------------- */}

        {loaded ? (
          <>
            <View>
              <Text style={styles.bio}>{Bio}</Text>
            </View>
            <Divider style={styles.divider} />

            <Text style={styles.topInfo}>Top Genres: </Text>
            {/* <Text style={styles.topInfo}>{`${TopGenres}`} </Text> */}
            <ScrollView
              // showsHorizontalScrollIndicator={true}
              // indicatorStyle={"white"}
              scrollIndicatorInsets={{ top: 0, left: 20, bottom: 20, right: 20 }}
              // pagingEnabled={true}
              centerContent={true}
              horizontal={true}
              style={{
                margin: 10
              }}
            // persistentScrollbar={true}
            >
              {
                /* added the part key={index} to Fix the warning "Each child should have a unique key prop"*/
                dummyGenres.map((e, index) => (
                  <Text
                    key={index}
                    style={{ color: generateColor(), fontSize: 20 }}>{'    ' + e.genre + '   '}</Text>
                ))
              }
            </ScrollView>
            <Divider style={styles.divider} />

            <View>
              <Text style={styles.desc}>{`Q: ${Q1}`}</Text>
            </View>

            <View>
              <Text style={styles.desc}>{`A: ${Answer1}`}</Text>
            </View>
            <Divider style={styles.divider} />

            <Text style={styles.topInfo}>Top Songs: </Text>
            {/* <Text style={styles.topInfo}>{`${TopSongs}`} </Text> */}

            <ScrollView
              // showsHorizontalScrollIndicator={true}
              // indicatorStyle={"white"}
              scrollIndicatorInsets={{ top: 0, left: 20, bottom: 20, right: 20 }}
              // pagingEnabled={true}
              centerContent={true}
              horizontal={true}
              style={{
                margin: 10
              }}
            // persistentScrollbar={true}
            >
              {
                /* added the part key={index} to Fix the warning "Each child should have a unique key prop"*/
                dummyTracks.map((e, index) => (
                  <Text
                    key={index}
                    style={{ color: generateColor(), fontSize: 20  }}>{'    ' + e.trackname + '   '}</Text>
                ))
              }
            </ScrollView>
            <Divider style={styles.divider} />

            <View>
              <Text style={styles.desc}>{`Q: ${Q2}`}</Text>
            </View>

            <View>
              <Text style={styles.desc}>{`A: ${Answer2}`}</Text>
            </View>

            <Divider style={styles.divider} />
            <Text style={styles.topInfo}>Top Artists: </Text>
            {/* <Text style={styles.topInfo}>{`${TopArtists}`} </Text> */}
            <ScrollView
              // showsHorizontalScrollIndicator={true}
              // indicatorStyle={"white"}
              scrollIndicatorInsets={{ top: 0, left: 20, bottom: 20, right: 20 }}
              // pagingEnabled={true}
              centerContent={true}
              horizontal={true}
              style={{
                margin: 10
              }}
            // persistentScrollbar={true}
            >
              {
                /* added the part key={index} to Fix the warning "Each child should have a unique key prop"*/
                dummyArtists.map((e, index) => (
                  <Text
                    key={index}
                    style={{ color: generateColor(), fontSize: 20  }}>{'    ' + e.artistname + '   '}</Text>
                ))
              }
            </ScrollView>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.desc}>{`Q: ${Q3}`}</Text>
            </View>

            <View>
              <Text style={styles.desc}>{`A: ${Answer3}`}</Text>
            </View>
          </>
        ) : null}
        {/* Bio and Questions */}

        <Divider style={styles.divider} />
      </ScrollView>
      {/* -------------------------------------------------------------------- */}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    // borderColor:'#3EFF2D',
    borderColor: "#1DB954",
    backgroundColor: "#000000",
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 40,

    borderRadius: "20%",
  },
  imageContainer: {
    // borderColor:'#3EFF2D',
    borderColor: "#1DB954",
    borderWidth: 1,
    borderRadius: 20,
    height: Layout.window.height / 2 - 120,
    marginBottom: 20,
  },
  flatList: {
    height: Layout.window.height / 2 - 120,
    flexGrow: 0,
    marginBottom: 15,
  },
  image: {
    width: Layout.window.width - 84,
    height: Layout.window.height / 2 - 120,
    borderRadius: 20,
    marginBottom: 20,
  },
  upperBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  basicInfo: {
    flexShrink: 1,
  },
  name: {
    // color: '#fff',
    color: "#FE8AE3",
    fontSize: 28,
    fontWeight: 'bold'
  },
  genderAndOrientation: {
    color: "#fff",
    fontSize: 15,
  },
  location: {
    color: "#ff",
    fontSize: 15,

  },
  meter: {
    color: "#5E5E5E",
    fontSize: 34,
    borderRadius: "100%",
    // borderColor:'#3EFF2D',
    borderColor: "#1DB954",
    marginLeft: 20,
    borderWidth: 2,
    height: 90,
    width: 90,
    justifyContent: "center",
  },
  percentage: {
    // color: '#fff',
    marginBottom: 20,
    color: "#1DB954",
    alignSelf: "center",
    fontSize: 27,
    fontWeight: 'bold'
  },
  desc: {
    color: "white",
    alignSelf: "flex-start",
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 20,
    flexShrink: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  bio: {
    color: "#FE8AE3",
    alignSelf: "center",
    justifyContent: 'center',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 20,
    flexShrink: 1,
    textAlign: 'center'
  },

  divider: {
    width: Layout.window.width - 120,
    margin: 10,
    alignSelf: "center",
  },

  ////
  // the X button to hide the modal
  button: {
    margin: 5,
    backgroundColor: "#FE8AE3",
    alignItems: "flex-end",
    width: Layout.window.width - 150,
  },
  // the text of the X button modal
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
  // the text of the popup, which is top songs, genres, etc
  modalText: {
    marginBottom: 5,
    color: "#000",
    fontWeight: "bold",
  },
  // centering the popup
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  // style of the popup window
  modalView: {
    backgroundColor: "#FE8AE3",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FE8AE3",
    alignItems: "center",
    paddingBottom: 10,
  },
  topInfo: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 20,
    flexShrink: 1,
  },
});
