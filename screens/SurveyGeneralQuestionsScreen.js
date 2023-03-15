import React, {
  useState,
  setState,
  useCallback,
  Component,
  useEffect,
} from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
// import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";

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
  getQuestions,
} from "../redux/UserData";
import { SafeAreaView } from "react-native-safe-area-context";

const WIDTH = Dimensions.get("window").width;

const NewUserQuestions = () => {
  const dispatch = useDispatch();
  var {
    // id,
    name,
    // email,
    gender,
    location,
    orientation,
    pronouns,

    // question1,
    // question2,
    // question3,

    // answer1,
    // answer2,
    // answer3,

    birthdate,
    // bio,
    // socials,
    // picture1,
    // picture2,
    // picture3,
    // picture4,

    // spotifydata,
    // toptracks,
    // topgenres,
    // topartists,
  } = useSelector((state) => state.name);

  const genders = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ];

  const sexualOrientations = [
    { key: "1", value: "Straight" },
    { key: "2", value: "Gay" },
    { key: "3", value: "Lesbian" },
    { key: "4", value: "Bisexual" },
    { key: "5", value: "Pansexual" },
    { key: "6", value: "Other" },
  ];

  // var genderPlaceholder = "Select gender";
  // if (gender) {
  //   genderPlaceholder = genders[gender-1].value
  // }

  // var orientationPlaceholder = "Select orientation";
  // if (orientation) {
  //   orientationPlaceholder = sexualOrientations[orientation-1].value
  // }

  // getQuestions();

  // if (sexualOrientations[orientation].value) {
  //   orientationPlaceholder = sexualOrientations[orientation].value;
  // }

  // const [userID, setUserID] = useState(1);
  // const [name, setName] = useState(null);
  // const [birthday, setBirthday] = useState(null);

  //setGenderValue
  //setSOValue
  // const [genderChoice, setGenderChoice] = useState(null);
  // const [sexualOrientationChoice, setsexualOrientationChoice] = useState(null);
  // const [pronouns, setPronouns] = useState(null);
  // const [location, setLocation] = useState(null);
  // const [bio, setBio] = useState(null);
  // const [answer1, setAnswer1] = useState(null);
  // const [answer2, setAnswer2] = useState(null);
  // const [answer3, setAnswer3] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [datePickerVisible, setDatePickerVisible] = useState(false);

  // const ageCheck = () => {
  //   let today = new Date();
  //   // console.log(birthdate.getFullYear());
  //   // console.log(today.getFullYear());

  //   if (birthdate) {
  //     let tempAge = today.getFullYear() - birthdate.getFullYear();

  //     if (tempAge > 18) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // const showDatePicker = () => {
  //   setDatePickerVisible(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);
  // };

  // const handleConfirm = (date) => {
  //   setSelectedDate(date);
  //   hideDatePicker();
  // };

  // const [genderOpen, setGenderOpen] = useState(false);
  // const [genderValue, setGenderValue] = useState(null);
  // const [gender, setGender] = useState([
  //   { label: "Male", value: "male" },
  //   { label: "Female", value: "female" },
  //   { label: "Non-Binary", value: "nb" },
  //   { label: "Prefer Not to Say", value: "neutral" },
  // ]);
  // const [soOpen, setSOOpen] = useState(false);
  // const [soValue, setSOValue] = useState(null);
  // const [so, setSO] = useState([
  //   { label: "Straight", value: "straight" },
  //   { label: "Gay", value: "gay" },
  //   { label: "Lesbian", value: "lesbian" },
  //   { label: "Queer", value: "queer" },
  //   { label: "Bisexual", value: "bi" },
  //   { label: "Pansexual", value: "pan" },
  //   { label: "Asexual", value: "ace" },
  //   { label: "Demisexual", value: "demi" },
  //   { label: "Not Listed", value: "notlisted" },
  //   { label: "Prefer Not to Say", value: "neutral" },
  // ]);
  // const [loading, setLoading] = useState(false);
  // const onGenderOpen = useCallback(() => {
  //   setSOOpen(false);
  // }, []);

  // const onSOOpen = useCallback(() => {
  //   setGenderOpen(false);
  // }, []);
  // const { handleSubmit, control } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data, "data");
  // };
  const navigation = useNavigation();
  // console.log(name)

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.welcome}> Welcome! </Text>
          {/* <Text  style={styles.spotifyUsername}>spotify_username!</Text> */}
          <Text style={styles.info}>
            {" "}
            Please fill out the information below to complete your profile.{" "}
          </Text>

          <Text style={styles.questions}> What is your name? </Text>
          <TextInput
            placeholder={name}
            style={styles.smallInput}
            placeholderTextColor="#fff"
            onChangeText={(value) => {
              dispatch(setName(value));
            }}
          />

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
            <DateTimePicker
              style={{ flex: 0.7 }}
              // display="default"
              display="calendar"
              value={selectedDate}
              themeVariant="dark"
              onChange={(event, date) => {
                const {
                  type,
                  nativeEvent: { timestamp },
                } = event;
                console.log(event.type);
                if (event.type == "set") {
                  // console.log(date.getDate());
                  // setBirthday(date);
                  // let today = new Date()
                  // console.log(date.getDate());
                  // let userDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

                  // // console.log(date.getFullYear())
                  // // console.log(today.getFullYear())
                  // console.log(userDate)

                  // console.log(date.getUTCFullYear())
                  // date.getFullYear
                  dispatch(setBirthdate(date));
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

          <SelectList
            placeholder="Gender"
            setSelected={(value) => dispatch(setGender(value))}
            save="value"
            data={genders}
            inputStyles={styles.selectionBoxText}
            boxStyles={styles.selectionBox}
            dropdownTextStyles={styles.selectionBoxDropdownText}
            dropdownStyles={styles.selectionBoxDropdown}
            search={false}
            arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
          />

          {/* <Controller
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
        /> */}

          <Text style={styles.questions}>Sexual Orientation</Text>
          <SelectList
            placeholder="Orientation"
            setSelected={(value) => dispatch(setOrientation(value))}
            save="value"
            data={sexualOrientations}
            inputStyles={styles.selectionBoxText}
            boxStyles={styles.selectionBox}
            dropdownTextStyles={styles.selectionBoxDropdownText}
            dropdownStyles={styles.selectionBoxDropdown}
            search={false}
            arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
          />

          {/* <Controller
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
        /> */}

          <Text style={styles.questions}> Pronouns </Text>
          <TextInput
            style={styles.smallInput}
            placeholder={pronouns}
            placeholderTextColor="#fff"
            onChangeText={(value) => dispatch(setPronouns(value))}
          />

          <Text style={styles.questions}> Where are you from? </Text>
          <TextInput
            style={styles.smallInput}
            placeholder={location}
            placeholderTextColor="#fff"
            onChangeText={(value) => dispatch(setLocation(value))}
          />

          <View style={styles.footer}>
            <Button
              type="clear"
              icon={<Icon name="arrowright" size={25} color="white" />}
              onPress={() => {
                console.log({
                  name,
                  gender,
                  birthdate,
                  pronouns,
                  location,
                });
                // console.log(ageCheck());
                if (name && gender && birthdate && pronouns && location) {
                  // if (ageCheck()) {
                  navigation.navigate("SurveyBio");
                  // } else {
                    // alert("Invalid Age. Must be over 18.");
                  // }
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
  questions: {
    textAlign: "center",
    color: "#FE8AE3",
  },
  welcome: {
    marginTop: WIDTH * 0.11,
    color: "#FFF",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  spotifyUsername: {
    color: "#FF2DB6",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  info: {
    color: "#FE8AE3",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginBottom: WIDTH * 0.05,
    marginLeft: WIDTH * 0.05,
    marginRight: WIDTH * 0.05,
  },
  smallInput: {
    textAlign: "center",
    marginLeft: WIDTH * 0.1,
    marginRight: WIDTH * 0.1,
    marginBottom: WIDTH * 0.03,
    color: "white",
    borderRadius: 20,
    height: 40,
    borderColor: "#1DB954",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#FF2DB6",
    color: "white",
  },
  dropdown: {
    width: WIDTH * 0.8,
    borderColor: "#1DB954",
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: WIDTH * 0.02,
    backgroundColor: "black",
  },
  listItemLabelStyle: {
    color: "white",
  },
  dropDownContainerStyle: {
    backgroundColor: "black",
    borderColor: "#1DB954",
    width: WIDTH * 0.82,
    marginLeft: 35,
  },
  textStyle: {
    color: "white",
  },
  footer: {
    alignItems: "center",
    marginBottom: WIDTH * 0.2,
  },
  dobbutton: {
    justifyContent: "flex-start",
    display: "flex",
    alignContent: "left",
  },
  dob: {
    justifyContent: "flex-end",
    color: "white",
    display: "flex",
    marginTop: 12,
    marginLeft: 20,
  },
  DOBsmallInput: {
    flexDirection: "row",
    alignItems: "left",
    marginLeft: WIDTH * 0.1,
    marginRight: WIDTH * 0.1,
    marginBottom: WIDTH * 0.03,
    color: "white",
    borderRadius: 20,
    height: 45,
    borderColor: "#1DB954",
    borderWidth: 1,
  },
  placeholderStyles: {
    color: "white",
    textAlign: "center",
  },

  selectionBox: {
    justifyContent: "center",
    width: WIDTH * 0.8,
    borderColor: "#1DB954",
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: WIDTH * 0.05,
    backgroundColor: "black",
  },

  selectionBoxText: {
    color: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    width: WIDTH * 0.4,
  },

  selectionBoxDropdown: {
    color: "#fff",
    width: 120,
    alignSelf: "center",
    marginBottom: 20,
  },

  selectionBoxDropdownText: {
    color: "#fff",
  },
});

export default NewUserQuestions;
