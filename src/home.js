import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
  
import NewUserQuestions from './newUserQuestions';

export default class Home extends Component {
    render() {
        return (
            <View >
            <Text> Begin creating your profile </Text>
            <Button
                title="Go to Profile"
                onPress={() => this.props.navigation.navigate('NewUserQuestions')}
            />
          </View>
        );
    }
}
