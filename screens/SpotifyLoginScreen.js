import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
  
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