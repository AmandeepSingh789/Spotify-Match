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
import { Button } from "@rneui/base";
import { useDispatch, useSelector } from 'react-redux';

import { questionBank } from "../redux/UserData";

const picUri = '../resources/Pfp/';

const NUMTOPGENRES = 5;
const NUMTOPSONGS = 5;
const NUMTOPARTISTS = 5;
const NUMSHAREDGENRES = 5;
const NUMSHAREDSONGS = 5;
const NUMSHAREDARTISTS = 5;


const generateColor = () => {
  let colors = ['#B9DD5C', '#D64000', '#FFD5C2', '#E3D9EB', '#C8E0FC', '#D6E3B4']

  return colors[Math.floor(Math.random() * 5)]
}

const testUsers = {
  0: {
    pic1: require('../resources/Pfp/Jerry/Jerry_1.jpeg'),
    pic2: require('../resources/Pfp/Jerry/Jerry_2.jpeg'),
    pic3: require('../resources/Pfp/Jerry/Jerry_3.jpeg'),
    pic4: require('../resources/Pfp/Jerry/Jerry_4.jpeg')
  },
  1: {
    pic1: require('../resources/Pfp/George/George_1.jpeg'),
    pic2: require('../resources/Pfp/George/George_2.jpeg'),
    pic3: require('../resources/Pfp/George/George_3.jpeg'),
    pic4: require('../resources/Pfp/George/George_4.jpeg')
  },
  2: {
    pic1: require('../resources/Pfp/Elaine/Elaine_1.jpeg'),
    pic2: require('../resources/Pfp/Elaine/Elaine_2.jpeg'),
    pic3: require('../resources/Pfp/Elaine/Elaine_3.jpeg'),
    pic4: require('../resources/Pfp/Elaine/Elaine_4.jpeg')
    },
  3: {
    pic1: require('../resources/Pfp/JayQuellin/JayQuellin_1.jpeg'),
    pic2: require('../resources/Pfp/JayQuellin/JayQuellin_2.jpeg'),
    pic3: require('../resources/Pfp/JayQuellin/JayQuellin_3.jpeg'),
    pic4: require('../resources/Pfp/JayQuellin/JayQuellin_4.jpeg')
    },
  4: {
      pic1: require('../resources/Pfp/Balakay/Balakay_1.jpeg'),
      pic2: require('../resources/Pfp/Balakay/Balakay_2.jpeg'),
      pic3: require('../resources/Pfp/Balakay/Balakay_3.jpeg'),
      pic4: require('../resources/Pfp/Balakay/Balakay_4.jpeg')
    },
  5: {
      pic1: require('../resources/Pfp/Deenice/DeeNice_1.jpeg'),
      pic2: require('../resources/Pfp/Deenice/DeeNice_2.jpeg'),
      pic3: require('../resources/Pfp/Deenice/DeeNice_3.jpeg'),
      pic4: require('../resources/Pfp/Deenice/DeeNice_4.jpeg')
  },
  6: {
    pic1: require('../resources/Pfp/Ay-Ay-Ron/Ay-Ay-Ron_1.jpeg'),
    pic2: require('../resources/Pfp/Ay-Ay-Ron/Ay-Ay-Ron_2.jpeg'),
    pic3: require('../resources/Pfp/Ay-Ay-Ron/Ay-Ay-Ron_3.jpeg'),
    pic4: require('../resources/Pfp/Ay-Ay-Ron/Ay-Ay-Ron_4.jpeg')
    },
  7: {
    pic1: require('../resources/Pfp/Tymothee/Tymothee_1.jpeg'),
    pic2: require('../resources/Pfp/Tymothee/Tymothee_2.jpeg'),
    pic3: require('../resources/Pfp/Tymothee/Tymothee_3.jpeg'),
    pic4: require('../resources/Pfp/Tymothee/Tymothee_4.jpeg')
    },
  8: {
    pic1: require('../resources/Pfp/CallumGarcia/Callum_1.jpeg'),
    pic2: require('../resources/Pfp/CallumGarcia/Callum_2.jpeg'),
    pic3: require('../resources/Pfp/CallumGarcia/Callum_3.jpeg'),
    pic4: require('../resources/Pfp/CallumGarcia/Callum_4.jpeg')
    },
  9: {
    pic1: require('../resources/Pfp/Maggie/Maggie_1.jpeg'),
    pic2: require('../resources/Pfp/Maggie/Maggie_2.jpeg'),
    pic3: require('../resources/Pfp/Maggie/Maggie_3.jpeg'),
    pic4: require('../resources/Pfp/Maggie/Maggie_4.jpeg')
    },
  10: {
    pic1: require('../resources/Pfp/Chris/Chris_1.jpeg'),
    pic2: require('../resources/Pfp/Chris/Chris_2.jpeg'),
    pic3: require('../resources/Pfp/Chris/Chris_3.jpeg'),
    pic4: require('../resources/Pfp/Chris/Chris_4.jpeg')
    },
  11: {
    pic1: require('../resources/Pfp/Nina/Nina_1.jpeg'),
    pic2: require('../resources/Pfp/Nina/Nina_2.jpeg'),
    pic3: require('../resources/Pfp/Nina/Nina_3.jpeg'),
    pic4: require('../resources/Pfp/Nina/Nina_4.jpeg')
    },
  12: {
    pic1: require('../resources/Pfp/Alex/Alex_1.jpeg'),
    pic2: require('../resources/Pfp/Alex/Alex_2.jpeg'),
    pic3: require('../resources/Pfp/Alex/Alex_3.jpeg'),
    pic4: require('../resources/Pfp/Alex/Alex_4.jpeg')
    },
  13: {
    pic1: require('../resources/Pfp/Kara/Kara_1.jpeg'),
    pic2: require('../resources/Pfp/Kara/Kara_2.jpeg'),
    pic3: require('../resources/Pfp/Kara/Kara_3.jpeg'),
    pic4: require('../resources/Pfp/Kara/Kara_4.jpeg')
    },
  14: {
    pic1: require('../resources/Pfp/Sam/Sam_1.jpeg'),
    pic2: require('../resources/Pfp/Sam/Sam_2.jpeg'),
    pic3: require('../resources/Pfp/Sam/Sam_3.jpeg'),
    pic4: require('../resources/Pfp/Sam/Sam_4.jpeg')
    },
  15: {
    pic1: require('../resources/Pfp/Taylor/Taylor_1.jpeg'),
    pic2: require('../resources/Pfp/Taylor/Taylor_2.jpeg'),
    pic3: require('../resources/Pfp/Taylor/Taylor_3.jpeg'),
    pic4: require('../resources/Pfp/Taylor/Taylor_4.jpeg')
    },
  16: {
    pic1: require('../resources/Pfp/Gary/Gary_1.jpeg'),
    pic2: require('../resources/Pfp/Gary/Gary_2.jpeg'),
    pic3: require('../resources/Pfp/Gary/Gary_3.jpeg'),
    pic4: require('../resources/Pfp/Gary/Gary_4.jpeg')
    },
  17: {
    pic1: require('../resources/Pfp/JuliaNguyen/Julia_1.jpeg'),
    pic2: require('../resources/Pfp/JuliaNguyen/Julia_2.jpeg'),
    pic3: require('../resources/Pfp/JuliaNguyen/Julia_3.jpeg'),
    pic4: require('../resources/Pfp/JuliaNguyen/Julia_4.jpeg')
    },
}

// Card component that displays user information
function Card({ id }) {

  const dispatch = useDispatch();
    var {
      id: userID,
        spotifydata,
        toptracks,
        topgenres,
        topartists,
    } = useSelector(((state) => state.id));

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
  const [TopSongs, SetTopSongs] = useState([]);
  const [TopGenres, SetTopGenres] = useState([]);
  const [TopArtists, SetTopArtists] = useState([]);
  const [compatibility, setCompatibility] = useState(80.0);
  const [sharedGenres, setSharedGenres] = useState([]);
  const [sharedSongs, setSharedSongs] = useState([]);
  const [sharedArtists, setSharedArtists] = useState([]);

  const [useBase64, setUseBase64] = useState(false);

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

  const testPics = [
    {
      id: 1,
      source: pic1,
    },
    {
      id: 2,
      source: pic2,
    },
    {
      id: 3,
      source: pic3,
    },
    {
      id: 4,
      source: pic4,
    },
  ]

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

    console.log(response.data);
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
    SetTopSongs(response["data"]["toptracks"]);
    SetTopGenres(response["data"]["topgenres"]);
    SetTopArtists(response["data"]["topartists"]);


    const q1id = response["data"]["questionid1"];
    const q2id = response["data"]["questionid2"];
    const q3id = response["data"]["questionid3"];

    setQ1(questionBank._z[q1id].value);
    setQ2(questionBank._z[q2id].value);
    setQ3(questionBank._z[q3id].value);

    setCompatibility(findCompatibilty(spotifydata, response["data"]["spotifydata"]));

    SetTopGenres(response["data"]["topgenres"]);
    SetTopSongs(response["data"]["toptracks"]);
    SetTopArtists(response["data"]["topartists"]);

    setSharedGenres(getSharedGenres(topgenres, response["data"]["topgenres"]));
    setSharedSongs(getSharedSongs(toptracks, response["data"]["toptracks"]));
    setSharedArtists(getSharedArtists(topartists, response["data"]["topartists"]));

    setLoaded(true);

    if (testUsers[id] != undefined) {
      setTestUserPhotos(id);
    }
    else {
      setUseBase64(true);
      setPic1(binaryToBase64(response["data"]["profilepictures"]["picture1"]["data"]))
      setPic2(binaryToBase64(response["data"]["profilepictures"]["picture2"]["data"]))
      setPic3(binaryToBase64(response["data"]["profilepictures"]["picture3"]["data"]))
      setPic4(binaryToBase64(response["data"]["profilepictures"]["picture4"]["data"]))
    }
  };

  function getSharedGenres(genres1, genres2) {
    const genre1Names = genres1.map(genre => genre.genre);
    console.log(genre1Names)
    const genre2Names = genres2.map(genre => genre.genre);
    let intersection = genre1Names.filter(x => genre2Names.includes(x));
    return intersection.slice(0, NUMSHAREDGENRES);
  }

  function getSharedSongs(songs1, songs2) {
    const songs1Names = songs1.map(track => track.trackname);
    const songs2Names = songs2.map(track => track.trackname);
    let intersection = songs1Names.filter(x => songs2Names.includes(x));
    return intersection.slice(0, NUMSHAREDSONGS);
  }
  
  function getSharedArtists(artists1, artists2) {
    const artists1Names = artists1.map(artist => artist.artistname);
    const artists2Names = artists2.map(artist => artist.artistname);
    let intersection = artists1Names.filter(x => artists2Names.includes(x));
    return intersection.slice(0, NUMSHAREDARTISTS);
  }


  function findCompatibilty(A, B) {
    console.log(A);
    console.log(B);

    const data1 = [A.acousticness, A.danceability, A.energy, A.instrumentalness, A.liveness, A.speechiness, A.valence];
    const data2 = [B.acousticness, B.danceability, B.energy, B.instrumentalness, B.liveness, B.speechiness, B.valence];
    const cosineSimilarity = cosinesim(data1,data2);
    return Math.trunc(cosineSimilarity * 100);
  }

  function cosinesim(A,B){
    console.log(A)
    console.log(B)
    var dotproduct=0;
    var mA=0;
    var mB=0;
    for(let i = 0; i < A.length; i++){ 
        dotproduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct)/((mA)*(mB))
    return similarity;
  }  

  async function setTestUserPhotos(id) {
    setUseBase64(false)
    setPic1(testUsers[id].pic1);
    setPic2(testUsers[id].pic2);
    setPic3(testUsers[id].pic3);
    setPic4(testUsers[id].pic4);
  }


  useEffect(() => {
    getData({ id });
  }, [id]);



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
      F: "Female,",
      M: "Male,",
      N: "Non Binary,",
      O: "Non Binary,",
    };
    SetGender(map[gender]);
  };

  const GetOrientation = (orientation) => {
    let map = {
      S: "Straight,",
      B: "Bisexual,",
      G: "Gay,",
      L: "Lesbian,",
      O: "",
      P: "Pansexual,",
    };
    SetOrientation(map[orientation]);
  };

    // Flatlist Image Item
    const Item = ({ item }) => {
    
      if (useBase64) {
        return (
          <View key={item.id} style={styles.imageContainer}>
            <Image
              source={{ uri: item.uri }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        )
      }
      else {
        return (
          <View key={item.id} style={styles.imageContainer}>
            <Image
              source={item.source}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        )
      }
    };

  const GetPronouns=(pronouns) => {
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
            data={useBase64 ? pics : testPics}
            renderItem={({ item }) => <Item item={item} />}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showHorizontalScrollIndicator={false}
            style={styles.flatList}
            initialScrollIndex={0} // Set the default id to 0
          />
        </View>

        {/* -------------------------------------------------------------------- */}

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
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
                <Text style={styles.modalText}>Compatible Songs:  </Text>
                <Text style={styles.modalText}>{`${sharedSongs}`} </Text>
                <Text style={styles.modalText}>Compatible Artists:  </Text>
                <Text style={styles.modalText}>{`${sharedArtists}`} </Text>
                <Text style={styles.modalText}>Compatible Genre:  </Text>
                <Text style={styles.modalText}>{`${sharedGenres}`} </Text>
              </View>
            </View>
          </Modal>
          <View style={{ bottom: 20 }}>
            <Button
              title= {'COMPATIBILITY: ' + compatibility + '%'}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.percentage}
              onPress={() => {
                setModalVisible(true)
              }}
            />
          </View>

        </View>
        {/* POPUP CODE ENDS */}

        {/* Box with Name,Age and Meter*/}
        <View style={styles.upperBox}>
          
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{`${Name}, ${Age}`}</Text>
            <Text style={styles.genderAndOrientation}>
              {`${gender} ${orientation} ${pronouns}`}            
            </Text>
            <Text style={styles.location}>
              {`${location}`}            
            </Text>
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
                TopGenres.slice(0, NUMTOPGENRES).map((e, index) => (
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
                TopSongs.slice(0, NUMTOPSONGS).map((e, index) => (
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
                TopArtists.slice(0, NUMTOPARTISTS).map((e, index) => (
                  <Text
                    key={index}
                    style={{ color: generateColor(), fontSize: 20 }}>{'    ' + e.artistname + '   '}</Text>
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
    backgroundColor: "#000",
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
    fontWeight: 'bold',
    // marginLeft: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  genderAndOrientation: {
    color: "#fff",
    // marginLeft: 10,
    textAlign:'center'
  },
  location: {
    color: "#fff",
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15
  },
  meter: {
    color: "#5E5E5E",
    fontSize: 34,
    borderRadius: "100%",
    // borderColor:'#3EFF2D',
    borderColor: "#1DB954",
    marginLeft: 15,
    borderWidth: 2,
    marginRight: 20,
    height: 70,
    width: 70,
    justifyContent: "center",
  },
  // compatibility: {
  //   color: "#1DB954",
  //   alignSelf: "center",
  //   fontSize: 20,
  //   marginBottom: 20
  //   // fontWeight: 'bold'

  // },
  percentage: {
    color: "#1DB950",
    alignSelf: "center",
    fontSize: 20,
    // top: -40,
    // marginBottom: -10,
    fontWeight: 'bold',
    textShadowColor: '#1DB954', 
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10, 
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
    marginTop: -10,
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
  buttonStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1DB954",
    borderRadius: 10,
    height: 42,
  },
  buttonContainer: {
    width: 270,
    top: 20
  },
});
