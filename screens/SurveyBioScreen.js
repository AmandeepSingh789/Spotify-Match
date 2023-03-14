import React, { Component, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setGender,
  setLocation,
  setOrientation,
  setPronouns,
  setAnswer1,
  setAnswer2,
  setAnswer3,
  setQuestion1,
  setQuestion2,
  setQuestion3,
  setBirthdate,
  setBio,
  setSocials,
  setPicture1,
  setPicture2,
  setPicture3,
  setPicture4,
} from "../redux/UserData";
import {
  updateUserData,
  updatePictures,
  questionBank,
} from "../redux/UserData";
import { SafeAreaView } from "react-native-safe-area-context";

// export default class Bio extends Component {
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Bio = () => {
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

  // const [keyboardStatus, setKeyboardStatus] = useState('');

  //   const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded) {
  //         await SplashScreen.hideAsync();
  //     }
  // }, [fontsLoaded]);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardStatus('Keyboard Shown');
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardStatus('Keyboard Hidden');
  //   });
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };

  // }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.container}>
          {/* Sets status bar mode */}

          <View style={styles.header}>
            <Button
              type="clear"
              icon={<Icon name="arrowleft" size={25} color="gray" />}
              onPress={() => navigation.navigate("SurveyGeneralQuestions")}
            />
          </View>

          <Text style={styles.questions}> Tell us a bit about yourself </Text>
          <View style={styles.textbox}>
            <TextInput
              onChangeText={(value) => {
                dispatch(setBio(value));
              }}
              style={styles.input}
              multiline={true}
              placeholder={bio}
              placeholderTextColor="#fff"
              // onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <Text style={styles.questions}>
            {" "}
            Add your Instagram! This is how your matches will be able to get in
            contact with you.{" "}
          </Text>
          <View style={styles.instagramContainer}>
            <Image
              source={require("../assets/instagram.png")}
              style={styles.instagramIcon}
            />
            <TextInput
              onChangeText={(value) => {
                dispatch(setSocials(value));
              }}
              style={styles.answerBox}
              multiline={false}
              placeholder={socials}
              placeholderTextColor="#fff"
            />
          </View>

          <View style={styles.footer}>
            <Button
              type="clear"
              icon={<Icon name="arrowright" size={25} color="white" />}
              onPress={() => {
                if (bio && socials) {
                  navigation.navigate("SurveyAdvancedQuestions");
                } else {
                  alert("Please fill out all fields!");
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 5,
  },
  header: {
    // marginTop: 40,
    alignItems: "left",
  },
  questions: {
    textAlign: "center",
    color: "#FE8AE3",
    fontWeight: "bold",
  },
  textbox: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    textAlignVertical: "top",
    height: HEIGHT * 0.5,
    width: WIDTH * 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    marginTop: 5,
    backgroundColor: "#black",
    color: "white",
    borderRadius: 20,
    borderColor: "#1DB954",
    borderWidth: 0.8,
  },
  footer: {
    alignItems: "center",
    marginTop: WIDTH * 0.05,
  },
  answerBox: {
    flex: 3,
    flexDirection: "row",
    textAlign: "center",
    marginRight: WIDTH * 0.1,
    marginBottom: WIDTH * 0.03,
    color: "white",
    borderRadius: 20,
    height: 40,
    width: WIDTH * 0.3,
    borderColor: "#1DB954",
    borderWidth: 0.8,
  },
  instagramIcon: {
    flex: 1,
    flexDirection: "row",
    marginLeft: WIDTH * 0.04,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  instagramContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 10,
  },
});

export default Bio;
