import React, { Component, useEffect, useState, useCallback } from "react";
import { Keyboard, StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
    
// export default class Bio extends Component {
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Bio = () => {
    const navigation = useNavigation(); 
    const [keyboardStatus, setKeyboardStatus] = useState('');
  //   const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded) {
  //         await SplashScreen.hideAsync();
  //     }
  // }, [fontsLoaded]);
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

        <View style={styles.instagramContainer}>
            <Image 
            source={require('../assets/instagram.png')} 
            style={styles.instagramIcon}
          />
        <TextInput 
                style={styles.answerBox} 
                multiline={false}
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
        </KeyboardAwareScrollView>  
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
      color: "#FE8AE3",
      fontWeight: 'bold',
    },
    textbox: {
        alignItems: "center",
    },
    input: {
        backgroundColor: "white",
        textAlignVertical: "top",
        height: HEIGHT*0.5,
        width: WIDTH*0.8,
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
        borderWidth: 0.8
   },
   footer: {
    alignItems: "center",
    marginTop: WIDTH*0.25,
   },
   answerBox: {
      flex: 3,
      flexDirection:"row",
      textAlign: "center",
      marginRight: WIDTH*0.1,
      marginBottom: WIDTH*0.03,
      color: "white",
      borderRadius: 20,
      height: 40,
      width: WIDTH*0.3,
      borderColor: "#1DB954",
      borderWidth: 0.8
   },
   instagramIcon: {
    flex: 1,
    flexDirection:"row",
    marginLeft: WIDTH*0.04,
    width: 40,
    height: 40,
    resizeMode: 'contain', 

   },
   instagramContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
   }
 });

 export default Bio;
