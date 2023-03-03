import React, { useState, setState, useCallback, Component, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import axios from 'axios';

const NewUserQuestions = () => {
  const [userID, setUserID] = useState(1);
  const [name, setName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  //setGenderValue
  //setSOValue
  // const [genderChoice, setGenderChoice] = useState(null);
  // const [sexualOrientationChoice, setsexualOrientationChoice] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [location, setLocation] = useState(null);
  const [bio, setBio] = useState(null);
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);

  useEffect(() => {
    axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/'+userID)
    .then(function(response) {
      setName(response["data"][0]["name"]);
      setBirthday(response["data"][0]["birthday"]);
      setLocation(response["data"][0]["location"]);
      setGenderChoice(response["data"][0]["genderChoice"]);
      setsexualOrientationChoice(response["data"][0]["sexualOrientationChoice"]);
      setPronouns(response["data"][0]["pronouns"]);
      setLocation(response["data"][0]["location"]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "nb" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const [soOpen, setSOOpen] = useState(false);
  const [soValue, setSOValue] = useState(null);
  const [so, setSO] = useState([
    { label: "Straight", value: "straight" },
    { label: "Gay", value: "gay" },
    { label: "Lesbian", value: "lesbian" },
    { label: "Queer", value: "queer" },
    { label: "Bisexual", value: "bi" },
    { label: "Pansexual", value: "pan" },
    { label: "Asexual", value: "ace" },
    { label: "Demisexual", value: "demi" },
    { label: "Not Listed", value: "notlisted" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setSOOpen(false);
  }, []);

  const onSOOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}> Welcome! </Text>
        {/* <Text  style={styles.spotifyUsername}>spotify_username!</Text> */}
        <Text style={styles.info}> Please fill out the information below to complete your profile. </Text>

        <Text style={styles.questions}> What is your name? </Text>
        <TextInput style={styles.smallInput} />

        <Text style={styles.questions}> Date of Birth? </Text>
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.DOBsmallInput}>
        <View style={{flex:1}}>
          <Button 
          type="clear" 
          icon={
                  <Icon
                    name="calendar"
                    size={20}
                    color="white"
                  />
                }
            style={styles.dobbutton}
            onPress={showDatePicker} 
          />
        </View>
        <View style={{flex:2}}>
        <Text style={styles.dob}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        </View>
        </View>
        {/* <TextInput style={styles.smallInput} /> */}


        <Text style={styles.questions}>Gender</Text>
        <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
                <View >
                    <DropDownPicker
                    style={styles.dropdown}
                    open={genderOpen}
                    value={genderValue} //genderValue
                    items={gender}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGender}
                    placeholder="Select Gender"
                    placeholderStyle={styles.placeholderStyles}
                    onOpen={onGenderOpen}
                    onChangeValue={onChange}
                    zIndex={3000}
                    zIndexInverse={1000}
                    dropDownDirection={"TOP"}
                    />
                </View>
            )}
        />

        <Text style={styles.questions}>Sexual Orientation</Text>
        <Controller
            name="so"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
                <View>
                    <DropDownPicker
                    style={styles.dropdown}
                    open={soOpen}
                    value={soValue} //soValue
                    items={so}
                    setOpen={setSOOpen}
                    setValue={setSOValue}
                    setItems={setSO}
                    placeholder="Select Sexual Orientation"
                    placeholderStyle={styles.placeholderStyles}
                    loading={loading}
                    activityIndicatorColor="#5188E3"
                    onOpen={onSOOpen}
                    onChangeValue={onChange}
                    zIndex={1000}
                    zIndexInverse={3000}
                    dropDownDirection={"TOP"}
                    />
                </View>
            )}
        />
    
        <Text style={styles.questions}> Pronouns </Text>
        <TextInput style={styles.smallInput} />

        <Text style={styles.questions}> Where are you from? </Text>
        <TextInput style={styles.smallInput} />
        
        <View style={styles.footer}>
          <Button 
            type="clear" 
            icon={
                <Icon
                  name="arrowright"
                  size={25}
                  color="white"
                />
              }
              onPress={() => navigation.navigate('SurveyBio')}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 5
    },
    questions: {
        textAlign: "center",
        color: "#B9DD5C",
        fontWeight: "bold"
    },
    welcome: {
        marginTop: 40,
        color: "#FF2DB6",
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: "center"
    },
    spotifyUsername: {
        color: "#FF2DB6",
        textAlign: "center",
        fontSize: 40,
        fontWeight: 'bold',
    },
    info: {
        color: "#FE8AE3",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    smallInput: {
        textAlign: "center",
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        color: "white",
        borderRadius: 20,
        height: 40,
        borderColor: "#4D907D",
        borderWidth: 4
    }, 
   button: {
    backgroundColor: "#FF2DB6",
    color: "white",
   },
   dropdown: {
    width: 300,
    borderColor: "#4D907D",
    borderRadius: 20,
    borderWidth: 4,
    alignSelf: "center",
    marginBottom: 10,
  },
  placeholderStyles: {
    color: "grey",
  },
   footer: {
    alignItems: "center",
    marginBottom: 10,
   },
   dobbutton: {
    justifyContent: 'flex-start',
    display: 'flex',
    alignContent: "left",
   },
   dob: {
    justifyContent: 'flex-end',
    color: "white",
    display: 'flex',
    marginTop: 12,
    marginLeft: 20, 
   },
   DOBsmallInput: {
    flexDirection:"row",
    alignItems: "left",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    color: "white",
    borderRadius: 20,
    height: 45,
    borderColor: "#4D907D",
    borderWidth: 4
   }
});

export default NewUserQuestions;
