import React, { useState, setState, useCallback, Component, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const WIDTH = Dimensions.get('window').width;
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
    <KeyboardAwareScrollView  style={styles.container} >
    <View style={styles.container}>
        <Text style={styles.welcome}> Welcome! </Text>
        {/* <Text  style={styles.spotifyUsername}>spotify_username!</Text> */}
        <Text style={styles.info}> Please fill out the information below to complete your profile. </Text>

        <Text style={styles.questions}> What is your name? </Text>
        <TextInput style={styles.smallInput} />

        <Text style={styles.questions}> Date of Birth? </Text>
        {/* <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}
          {/* <DateTimePicker
          date={selectedDate}
          isVisible={datePickerVisible}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}
  
        <View style={styles.DOBsmallInput}>
     {/* <View style={{flex:1}}>
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
        </View> */}
        <DateTimePicker style={{flex: 0.7}}
        // display="default" 
        display="calendar" 
        value={selectedDate}
        themeVariant="dark"
        onChange={(event, date) => {
            const {
                type,
                nativeEvent: {timestamp},
            } = event;
            console.log(event.type)
            if (event.type == 'set') {
                // console.log(date.getDate());
                setBirthday(date);
            }
        }}
      />
        {/* <View style={{flex:2}}>
        <Text style={styles.dob}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        </View> */}
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
                    textStyle={styles.textStyle}
                    open={genderOpen}
                    value={genderValue} //genderValue
                    items={gender}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGender}
                    listItemLabelStyle={styles.listItemLabelStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
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
                    textStyle={styles.textStyle}
                    open={soOpen}
                    value={soValue} //soValue
                    items={so}
                    setOpen={setSOOpen}
                    setValue={setSOValue}
                    setItems={setSO}
                    listItemLabelStyle={styles.listItemLabelStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
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
    </KeyboardAwareScrollView>  
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 5
    },
    questions: {
        textAlign: "center",
        color: "#FE8AE3",
    },
    welcome: {
        marginTop: WIDTH*0.11,
        color: "#FFF",
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
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center",
        marginBottom: WIDTH*0.05,
        marginLeft: WIDTH*0.05,
        marginRight: WIDTH*0.05,
    },
    smallInput: {
        textAlign: "center",
        marginLeft: WIDTH*0.1,
        marginRight: WIDTH*0.1,
        marginBottom: WIDTH*0.03,
        color: "white",
        borderRadius: 20,
        height: 40,
        borderColor: "#1DB954",
        borderWidth: 0.8
    }, 
   button: {
    backgroundColor: "#FF2DB6",
    color: "white",
   },
   dropdown: {
    width: WIDTH*0.8,
    borderColor: "#1DB954",
    borderRadius: 20,
    borderWidth: 0.8,
    alignSelf: "center",
    marginBottom: WIDTH*0.02,
    backgroundColor: "black",
  },
  listItemLabelStyle: {
    color: "white",
  },
  dropDownContainerStyle: {
    backgroundColor: "black",
    borderColor: "#1DB954",
    width: WIDTH*0.82,
    marginLeft: 35,
  },
  textStyle: {
    color:"white",
  },
   footer: {
    alignItems: "center",
    marginBottom: WIDTH*0.2,
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
    marginLeft: WIDTH*0.1,
    marginRight: WIDTH*0.1,
    marginBottom: WIDTH*0.03,
    color: "white",
    borderRadius: 20,
    height: 45,
    borderColor: "#1DB954",
    borderWidth: 0.8
   },
   placeholderStyles: {
    color: "white",
    textAlign: "center"
  },
});

export default NewUserQuestions;
