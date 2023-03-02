import React, { Component, useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
    
// export default class Bio extends Component {

const Bio = () => {
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
    return (
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
                onPress={() => navigation.navigate('SurveyGeneralQuestions')}
            />
        </View>
        <Text style={styles.questions}> Tell us a bit about yourself </Text>
        <View style={styles.textbox} >
            <TextInput 
                style={styles.input} 
                multiline={true}
                onSubmitEditing={Keyboard.dismiss}
            />
        </View>

        <View style={styles.footer} >
            <Button 
                type="clear" 
                icon={
                    <Icon
                    name="arrowright"
                    size={25}
                    color="white"
                    />
                }
                onPress={() => navigation.navigate('SurveyAdvancedQuestions')}
            />
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 5
    },
    header: {
        marginTop: 40,
        alignItems: "left",
    },
    questions: {
      textAlign: "center",
      color: "#B9DD5C",
      fontWeight: 'bold',
    },
    textbox: {
        alignItems: "center",
    },
    input: {
        backgroundColor: "white",
        textAlignVertical: "top",
        height: 400,
        width: 300,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        backgroundColor: "#black",
        color: "white",
        borderRadius: 20,
        borderColor: "#4D907D",
        borderWidth: 4
   },
   footer: {
    alignItems: "center",
    marginTop: 100,
   },
 });

 export default Bio;
