import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
  
// import SurveyGeneralQuestions from './SurveyGeneralQuestionsScreen';

export default class SpotifyLoginClass extends Component {
    render() {
        return (
            <View >
            <Text style={{color: 'green'}}> Spotify Login Page </Text>
            <Button
                title="Go to Survey"
                onPress={() => this.props.navigation.navigate('SurveyGeneralQuestions')}
            />
          </View>
        );
    }
}