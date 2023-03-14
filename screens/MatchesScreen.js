// import * as React from 'react';
// import { View, Text } from 'react-native';
// // import { Icon } from 'react-native-elements';
// import { Icon } from '@rneui/themed'

// export default function MatchesScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text
//                 onPress={() => navigation.navigate('Home')}
//                 style={{ fontSize: 26, fontWeight: 'bold', color:'white' }}>Matches Screen</Text>
        
//         </View>           
//         );
// }

import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
    FlatList,
  } from "react-native";
  import * as React from "react";
  import { useRef } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { useNavigation, useIsFocused } from "@react-navigation/native";
  import { useEffect, useState } from "react";
  import axios from 'axios';
  import { Buffer } from 'buffer';
  
  // const matches = [
  //   {
  //     id: "1",
  //     uri: "https://i.pinimg.com/originals/b2/86/a6/b286a65bfc482ebc7b3138dbb6568b37.jpg",
  //     name: "Rami",
  //   },
  //   {
  //     id: "2",
  //     uri: "https://i.pinimg.com/originals/cc/7a/8f/cc7a8fa84c296ac4de2a227a92324a77.jpg",
  //     name: "Mrin",
  //   },
  //   {
  //     id: "3",
  //     uri: "https://i.pinimg.com/originals/99/63/78/996378defcb190e5e0d067e2d3c62477.jpg",
  //     name: "Cal",
  //   },
  //   {
  //     id: "4",
  //     uri: "https://i.pinimg.com/originals/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
  //     name: "Amandeep",
  //   },
  //   {
  //     id: "5",
  //     uri: "https://i.pinimg.com/originals/94/25/2b/94252bec792f63f96e1e481ee0cd2669.jpg",
  //     name: "Amaan",
  //   },
  //   {
  //     id: "6",
  //     uri: "https://i.pinimg.com/originals/e4/18/e2/e418e22729bd7a202c563e08463b6ad9.jpg",
  //     name: "Jane",
  //   },
  //   {
  //     id: "7",
  //     uri: "https://i.pinimg.com/564x/eb/ae/2f/ebae2fd689ea2196625491b719a855eb.jpg",
  //     name: "Deer",
  //   },
  //   {
  //     id: "8",
  //     uri: "https://i.pinimg.com/originals/ad/81/eb/ad81ebb84107d9fc10a7e1c335d4c823.jpg",
  //     name: "Doe",
  //   }
  // ];
  let matches = [];
  
  const NewMatches = ({ id, uri }) => {
    const navigation = useNavigation();
    const pfp = new Buffer.from(uri.data).toString('base64');

    return (
      <>
        <LinearGradient
          colors={["#B9DD5C", "#8C0C58"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.matchProfile}
        >
          <Pressable onPress={() => navigation.navigate("Socials", {id: id})}>
              
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
  
  const {height} = Dimensions.get('window');
  
  const MatchScreen = () => {

    // state: {
    //   screenHeight: 0
    // }
    // const [screenHeight, setScreenHeight] = React.useState(0);

  
    // const onContentSizeChange = (contentWidth, contentHeight) => {
    //     setScreenHeight(contentHeight);
    // };
  
    const [matches, setMatches] = useState([]);
    const isFocused = useIsFocused();

    const getMatches = () => {
      axios
        .get('http://spotify-match.us-west-1.elasticbeanstalk.com/matches/0')
        .then((response) => {
          console.log(response.data);
          setMatches(response ["data"])
        })
    };

    useEffect(() => {
      getMatches();     
    }, []);

    useEffect(() => {
      isFocused && getMatches()
    },[isFocused]);

    const scrollEnabled = matches.length > 9;
  
    return (
      <View style={styles.container}>
  
        <SafeAreaView>
  
          <Text style={styles.header}>Matches</Text>
  
          <View>
            {(() => {
              if (matches.length == 1){
                  return (
                    <Text style={styles.numMatches}>
                      You have {matches.length} new match!
                    </Text>
                  )
              }
              
              return (
                <Text style={styles.numMatches}>
                  You have {matches.length} new matches!
                </Text>
              );
            })()}
          </View>
  
          <View style={{ alignSelf: "flex-start"}}>
            <Text style={styles.desc}>New Matches</Text>
          </View>
        </SafeAreaView>
        
        <FlatList
          data={matches}
          style={styles.storyContainer}
          numColumns={3}
          scrollEnabled={scrollEnabled}
          renderItem={({item}) =>
            <>
              <View style={{ flexDirection: "column"}}>
                <NewMatches key={item.id} id={item.id} uri={item.picture1} />
                <Text style={styles.matchName}> {item.name} </Text>
              </View>
            </>
          }
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      flex: 1,
    },
  
    header: {
      fontSize: 40,
      color: "#FFF",
      marginBottom: 10,
      fontWeight: "bold",
      alignSelf: "center",
    },
  
    numMatches: {
      fontSize: 20,
      color: "#FE8AE3",
      marginTop: 10,
      fontWeight: "bold",
      alignSelf: "center",
    },
  
    desc: {
      fontSize: 20,
      color: "#1DB954",
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "bold",
      alignSelf: "flex-start",
      marginHorizontal: 10,
    },
  
    storyContainer: {
      flexDirection: "column",
      paddingHorizontal: 10,
    },
  
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
  
    profilePic: {
      width: 95,
      height: 95,
      borderRadius: 95 / 2,
      borderColor: "black",
      borderWidth: 5,
    },
  
    matchName: {
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 30,
      textAlign: "center",
      marginRight: 15,
    },

  });
  
  export default MatchScreen;