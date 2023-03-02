import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
  
import NewUserQuestions from './SurveyNewUserQuestions';

export default class SpotifyLogin extends Component {
    render() {
        return (
            <View >
            <Text> Spotify Login Page </Text>
            <Button
                title="Go to Survey"
                onPress={() => this.props.navigation.navigate('NewUserQuestions')}
            />
          </View>
        );
    }
}