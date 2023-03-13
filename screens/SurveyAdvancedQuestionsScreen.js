import React, { useState, useCallback, Component, useEffect } from "react";
import { Keyboard, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// export default class Survey extends Component {
  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
const Survey = () => { 
  const navigation = useNavigation(); 

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [questionOpen, setQuestionOpen] = useState(false);
  const [questionValue, setQuestionValue] = useState(null);
  const [questions, setQuestions] = useState([
    { label: "My love language is...", value: "1"},
    { label: "Best first date idea?", value: "2" },
    { label: "Something interesting about me that no one expects is…", value: "3" },
    { label: "Are there any causes you are really passionate about?", value: "4" },
    { label: "Do you have a favorite quote?", value: "5" },
    { label: "If you could choose to relive one day, what would it be and why?", value: "6" },
    { label: "When you were a kid, what was your ultimate dream job?", value: "7" },
    { label: "What's something you've always wanted to learn how to do?", value: "8" },
    { label: "Where would you time travel, if you could?", value: "9" },
  ]);
  const [question2Open, setQuestion2Open] = useState(false);
  const [question2Value, setQuestion2Value] = useState(null);
  const [questions2, setQuestions2] = useState([
    { label: "My love language is...", value: "1"},
    { label: "Best first date idea?", value: "2" },
    { label: "Something interesting about me that no one expects is…", value: "3" },
    { label: "Are there any causes you are really passionate about?", value: "4" },
    { label: "Do you have a favorite quote?", value: "5" },
    { label: "If you could choose to relive one day, what would it be and why?", value: "6" },
    { label: "When you were a kid, what was your ultimate dream job?", value: "7" },
    { label: "What's something you've always wanted to learn how to do?", value: "8" },
    { label: "Where would you time travel, if you could?", value: "9" },
  ]);
  const [question3Open, setQuestion3Open] = useState(false);
  const [question3Value, setQuestion3Value] = useState(null);
  const [questions3, setQuestions3] = useState([
    { label: "My love language is...", value: "1"},
    { label: "Best first date idea?", value: "2" },
    { label: "Something interesting about me that no one expects is…", value: "3" },
    { label: "Are there any causes you are really passionate about?", value: "4" },
    { label: "Do you have a favorite quote?", value: "5" },
    { label: "If you could choose to relive one day, what would it be and why?", value: "6" },
    { label: "When you were a kid, what was your ultimate dream job?", value: "7" },
    { label: "What's something you've always wanted to learn how to do?", value: "8" },
    { label: "Where would you time travel, if you could?", value: "9" },
  ]);

  const [loading, setLoading] = useState(false);
  const onQuestionOpen = useCallback(() => {
    setQuestion2Open(false);
    setQuestion3Open(false);
  }, []);
  const onQuestion2Open = useCallback(() => {
    setQuestionOpen(false);
    setQuestion3Open(false);
  }, []);
  const onQuestion3Open = useCallback(() => {
    setQuestionOpen(false);
    setQuestion2Open(false);
  }, []);

  const [selectValue, setSelectValue] = React.useState("");
  const onChange = (event) => {
    setSelectValue(event)
  };
  const [selectValue2, setSelectValue2] = React.useState("");
  const onChange2 = (event) => {
    setSelectValue2(event)
  };
  const [selectValue3, setSelectValue3] = React.useState("");
  const onChange3 = (event) => {
    setSelectValue3(event)
  };

  const submitData = () => {
    console.log(selectValue, selectValue2, selectValue3)
    const questionSet = new Set([selectValue, selectValue2, selectValue3]);
    if (questionSet.size < 3) {
      console.log("Error: User needs to choose 3 different questions")
    } else {
      console.log("User has chosen 3 unique questions")
    }
  }
  const { handleSubmit, control } = useForm();
  return (
    <KeyboardAwareScrollView  style={styles.container} >
      <View style={styles.container}>
        <View style={styles.header}>
        <Button 
                type="clear" 
                icon={
                    <Icon
                    name="arrowleft"
                    size={25}
                    color="gray"
                    />
                }
                onPress={() => navigation.navigate('SurveyBio')}
            />
        </View>
        <Controller
              name="question1"
              defaultValue=""
              control={control}
              render={({ field: { value } }) => (
                  <View style={{ zIndex: 2}}>
                      <DropDownPicker
                      style={styles.dropdown}
                      open={questionOpen}
                      value={questionValue} //genderValue
                      items={questions}
                      setOpen={setQuestionOpen}
                      setValue={setQuestionValue}
                      setItems={setQuestions}
                      placeholder="Choose your first question"
                      placeholderStyle={styles.placeholderStyles}
                      textStyle={styles.textStyle}
                      listItemLabelStyle={styles.listItemLabelStyle}
                      onOpen={onQuestionOpen}
                      // onChange={onChange}
                      onChangeValue={onChange}
                      position="absolute"
                      zIndexInverse={1}
                      dropDownDirection={"BOTTOM"}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      // dropDownContainerStyle={{
                      //   borderColor: "#4D907D",
                      //   alignSelf: "center",
                      //   width: 350,
                      //   height: 100,
                      // }}
                      />
                  </View>
              )}
          />
        <TextInput 
          style={styles.input} 
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Controller
              name="question2"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                  <View style={{ zIndex: 4 }}>
                      <DropDownPicker
                      style={styles.dropdown}
                      open={question2Open}
                      value={question2Value} //genderValue
                      items={questions2}
                      setOpen={setQuestion2Open}
                      setValue={setQuestion2Value}
                      setItems={setQuestions2}
                      placeholder="Choose your second question"
                      placeholderStyle={styles.placeholderStyles}
                      textStyle={styles.textStyle}
                      listItemLabelStyle={styles.listItemLabelStyle}
                      onOpen={onQuestion2Open}
                      onChangeValue={onChange2}
                      zIndex={3000}
                      zIndexInverse={1000}
                      dropDownDirection={"TOP"}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      // dropDownContainerStyle={{
                      //   borderColor: "#4D907D",
                      //   alignSelf: "center",
                      //   width: 350,
                      //   height: 100,
                      // }}
                      />
                  </View>
              )}
          />
        <TextInput 
          style={styles.input} 
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Controller
              name="question3"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                  <View >
                      <DropDownPicker
                      style={styles.dropdown}
                      open={question3Open}
                      value={question3Value} //genderValue
                      items={questions3}
                      setOpen={setQuestion3Open}
                      setValue={setQuestion3Value}
                      setItems={setQuestions3}
                      placeholder="Choose your third question"
                      textStyle={styles.textStyle}
                      placeholderStyle={styles.placeholderStyles}
                      listItemLabelStyle={styles.listItemLabelStyle}
                    // dropDownContainerStyle={styles.dropDownContainerStyle}
                    // searchPlaceholder={styles.searchPlaceholder}
                      onOpen={onQuestion3Open}
                      onChangeValue={onChange3}
                      zIndex={3000}
                      zIndexInverse={1000}
                      dropDownDirection={"TOP"}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      
                      />
                  </View>
              )}
        />
        <TextInput 
          style={styles.input} 
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
        />
        <View style={styles.footer} >
            <Button 
                type="clear" 
                icon={
                    <Icon
                    name="checkcircleo"
                    size={25}
                    color="white"
                    />
                }
                // onPress={submitData}
                onPress={(submitData) => navigation.navigate('AddImages')}
            />
        </View>
    </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1
    },
    header: {
      marginTop: 40,
      alignItems: "left",
  },
    dropdown: {
      borderColor: "#1DB954",
      borderRadius: 20,
      borderWidth: 1,
      alignSelf: "center",
      width: 300,
    },
    input: {
        backgroundColor: "white",
        height: HEIGHT*0.13,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 32,
        backgroundColor: "#black",
        color: "white",
        borderRadius: 20,
        borderColor: "#1DB954",
        borderWidth: 1
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
    textAlign: "center"
  },
  dropDownContainerStyle: {
    backgroundColor: "black",
    borderColor: "#1DB954",
    width: WIDTH*0.82,
    marginLeft: 35,
    height: HEIGHT*0.15,
  },
  textStyle: {
    color:"white",
    textAlign: "center"
  },
   placeholderStyles: {
    color: "white",
    textAlign: "center"
  },
  footer: {
    alignItems: "center",
   },
 });

 export default Survey;