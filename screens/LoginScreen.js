import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/spotify_match_logo.png');

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const ADD_TOKEN = 'ADD_TOKEN';

const addToken = token => {
  return {type: ADD_TOKEN, token: token};
};

const LoginScreen =() => {
  const navigation = useNavigation(); 

  const [token, setToken] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'f2d7af74f02549329025eed26cfbf6c1',
      scopes: [
        'ugc-image-upload',
        'user-read-playback-state',
        'user-read-currently-playing',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-follow-modify',
        'user-read-playback-position',
        'user-top-read', 
        'user-read-recently-played', 
        'user-library-read',
        'user-read-email',
        'user-read-private',
      ],
      usePKCE: false,
      redirectUri: "exp://localhost:19000/",
    },
    discovery
  );

  useEffect(() => {
    if(response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      navigation.navigate('HomeScreen');
    }
  }, [response]);


  return (
    <View style={styles.container}>
      <View style={{marginBottom: -40}}>
        <Text
          style = {styles.welcometext}
        >
          Welcome{"\n"}
          to{"\n"}
        </Text>
        <Image 
          source={logo} 
          style= {styles.logo}
        />
      </View>
      <View style={{bottom: -100}}>
        <Button
          disabled={!request}
          title="Login with Spotify"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontWeight: 'bold', color: 'black' }}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcometext: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 60,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#3EFF2D',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    height: 60
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 40,
    marginVertical: 10
  },
  logo: {
    height: 100, 
    width: 300, 
    justifyContent: 'center', 
    marginTop: -50, 
    marginBottom: 90, 
    marginLeft: 10
  }
});

export default LoginScreen;