import { StatusBar } from "expo-status-bar";
import { React, useEffect, useRef, useState, useCallback } from "react";
// import { Camera } from "expo-camera";
// import { shareAsync } from "expo-sharing";
// import { useFonts } from "expo-font";
// import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { fetchUserData } from "../redux/UserData";


import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  ActivityIndicator,
  ImageBase,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

// Import Redux store
import { useDispatch, useSelector } from "react-redux";
import {
  setPicture1,
  setPicture2,
  setPicture3,
  setPicture4,
} from "../redux/UserData";

import { createPictures, createUser } from "../redux/UserData";

export default function Add_images() {
  const dispatch = useDispatch();
  var {
    id,
    name,
    email,
    gender,
    location,
    orientation,
    pronouns,

    question1,
    question2,
    question3,

    answer1,
    answer2,
    answer3,

    birthdate,
    bio,
    socials,
    picture1,
    picture2,
    picture3,
    picture4,

    spotifydata,
    toptracks,
    topgenres,
    topartists,
  } = useSelector((state) => state.id);

  const navigation = useNavigation();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const pickImages = async () => {
    // no permission needed
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 4,
      orderedSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      setImage1(result.assets[0].uri);
      dispatch(setPicture1(result.assets[0].base64));

      setImage2(result.assets[1].uri);
      dispatch(setPicture2(result.assets[1].base64));

      setImage3(result.assets[2].uri);
      dispatch(setPicture3(result.assets[2].base64));

      setImage4(result.assets[3].uri);
      dispatch(setPicture4(result.assets[3].base64));
    }
  };

  const changeImage = async (image) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      if (image === 1) {
        setImage1(result.assets[0].uri);
        dispatch(setPicture1(result.assets[0].base64));
        console.log("image1");
      }
      if (image === 2) {
        setImage2(result.assets[0].uri);
        dispatch(setPicture2(result.assets[0].base64));
        console.log("image 2");
      }
      if (image === 3) {
        setImage3(result.assets[0].uri);
        dispatch(setPicture3(result.assets[0].base64));
        console.log("image 3");
      }
      if (image === 4) {
        setImage4(result.assets[0].uri);
        dispatch(setPicture4(result.assets[0].base64));
        console.log("image 4");
      }
    }
  };

  const postData = async () => {
    console.log({
      id: id,
      name: name,
      birthdate: birthdate,
      email: email,
      gender: gender,
      orientation: orientation,
      location: location,
      pronouns: pronouns,
      bio: bio,
      questionid1: question1,
      questionid2: question2,
      questionid3: question3,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      instagram: socials,
    });
    if (
      name != null &&
      birthdate != null &&
      gender != null &&
      orientation != null &&
      location &&
      pronouns &&
      bio &&
      question1 != null &&
      question2 != null &&
      question3 != null &&
      answer1 &&
      answer2 &&
      answer3 &&
      socials &&
      image1 &&
      image2 &&
      image3 &&
      image4
    ) {
      console.log("Creating user");

      var tempGender = "";
      switch (gender) {
        case "Male":
          tempGender = "M";
          break;
        case "Female":
          tempGender = "F";
          break;
        default:
          tempGender = "O";
          break;
      }

      var tempOrientation = "";
      switch (orientation) {
        case "Straight":
          tempOrientation = "S";
          break;
        case "Gay":
          tempOrientation = "G";
          break;
        case "Lesbian":
          tempOrientation = "L";
          break;
        case "Bisexual":
          tempOrientation = "B";
          break;
        case "Pansexual":
          tempOrientation = "P";
          break;
        default:
          tempOrientation = "O";
          break;
      }




      await createUser({
        "id": id,
        "name": name,
        "birthdate": birthdate,
        "email": email,
        "gender": tempGender,
        "orientation": tempOrientation,
        "location": location,
        "pronouns": pronouns,
        "bio": bio,
        "questionid1": question1,
        "questionid2": question2,
        "questionid3": question3,
        "answer1": answer1,
        "answer2": answer2,
        "answer3": answer3,
        "instagram": socials,
      });

      // console.log(spotifydata)
      await axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/toptracks/' + id,
        {
          "id": id,
          "data": toptracks
        }
      ).catch((error) => { console.error(error); });


      await axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/topgenres/' + id,
        {
          "id": id,
          "data": topgenres
        }
      ).catch((error) => { console.error(error); });

      await axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/topartists/' + id,
        {
          "id": id,
          "data": topartists
        }
      ).catch((error) => { console.error(error); });

      console.log(spotifydata);
      await axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/',
        
        spotifydata
        
      ).then((response) => {
        console.log(response);
      }).catch((error) => { console.error(error); });

      console.log("Creating Profile Pictures");

      await createPictures({
        "id": id,
        "image1": image1,
        "image2": image2,
        "image3": image3,
        "image4": image4,
      });
      dispatch(fetchUserData(id));
      navigation.navigate("Home");
    } else {
      alert("Please fill out all fields!");
    }
  };

  // console.log(name)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Icon
        style={styles.header}
        name="arrowleft"
        size={25}
        color="gray"
        onPress={() => navigation.navigate("SurveyGeneralQuestions")}
      />

      {/* <View style={styles.header}>
        <Button
          title=""
          type="clear"
          icon={
            <Icon
              name="arrowleft"
              size={25}
              color="gray"
            />
          }
          onPress={() => navigation.navigate('SurveyGeneralQuestions')}
        />
      </View> */}

      {/* <Text style={styles.title}>Add Images</Text> */}

      <Text style={styles.questions}>
        Add images to your profile! Tap 'Choose images' to select them. Tap an
        image to edit it.
      </Text>
      {/* <Text style={styles.questions}>Tap an image to edit it.</Text> */}

      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => {
              changeImage(1);
            }}
          >
            <Image source={{ uri: image1 }} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeImage(2);
            }}
          >
            <Image source={{ uri: image2 }} style={styles.image} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => {
              changeImage(3);
            }}
          >
            <Image source={{ uri: image3 }} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeImage(4);
            }}
          >
            <Image source={{ uri: image4 }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      <Button
        style={styles.button}
        title="Choose images"
        onPress={pickImages}
        color="#19AC52"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          postData();
        }}
      >
        <Text style={styles.buttonText}>Complete Profile!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    margin: 10,
    alignItems: "left",
  },

  title: {
    fontSize: 40,
    color: "#fff",
    margin: 20,
    alignSelf: "flex-start",
  },

  subtitle: {
    fontSize: 14,
    color: "#1DB954",
    marginRight: 20,
    alignSelf: "flex-end",
  },

  imageContainer: {
    margin: 50,
    marginTop: 25,
    alignSelf: "center",
  },

  imageView: {
    flexDirection: "row",
    alignSelf: "center",
  },

  profilePicture: {
    borderColor: "#1DB954",
    borderWidth: 1,
    width: 200,
    height: 200,
    borderRadius: 43,
    margin: 5,
  },

  image: {
    borderColor: "#1DB954",
    borderWidth: 1,
    width: 160,
    height: 160,
    borderRadius: 33,
    margin: 5,
  },

  button: {
    margin: 40,
    backgroundColor: "#1DB954",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    borderRadius: 50,
  },

  buttonText: {
    fontSize: 20,
  },
  questions: {
    textAlign: "center",
    color: "#FE8AE3",
    fontWeight: "bold",
    margin: 24,
  },
});
