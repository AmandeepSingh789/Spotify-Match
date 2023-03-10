// import React, { Component } from "react";
// import { StyleSheet, Text, View, Button } from 'react-native';
  
// export default class SpotifyLoginClass extends Component {
//     render() {
//         return (
//             <View >
//             <Text style={{color: 'green'}}> Spotify Login Page </Text>
//             <Button
//                 title="Go to Survey"
//                 onPress={() => this.props.navigation.navigate('SurveyGeneralQuestions')}
//             />
//           </View>
//         );
//     }
// }

import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const logo = require('../assets/spotify_match_logo.png');

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const ADD_TOKEN = 'ADD_TOKEN';

const addToken = token => {
  return {type: ADD_TOKEN, token: token};
};

const SpotifyLoginScreen =() => {
  const navigation = useNavigation();
  var dataPlaylistsID = [];
  var profileData = [];

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
        'user-follow-read',
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
    }
  }, [response]);

  useEffect(() => {
    if(token) {
      //Current User's Profile
      axios
        .get(
          'https://api.spotify.com/v1/me', {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            }
          }
        ).then(function(profile) {
          console.log(profile.data.id);
          profileData = profile; 
          axios
            .get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/exists/' + profile.data.id)
            .then(function(response) {
                console.log(response.data)
                if(response.data == false){
                    axios
                        .post(
                        'http://spotify-match.us-west-1.elasticbeanstalk.com/users',
                        {
                            "id": profileData.data.id,
                            "name": profileData.data.display_name,
                            "birthdate": "1972-04-12T07:00:00.000Z",
                            "email": profileData.data.email,
                            "gender": "M",
                            "orientation": "P",
                            "location": profileData.data.country,
                            "pronouns": "he/him",
                            "bio": null,
                            "questionid1": null,
                            "questionid2": null,
                            "questionid3": null,
                            "answer1": null,
                            "answer2": null,
                            "answer3": null
                        }).catch(function(error) {
                            console.log(error);
                        })
                    navigation.navigate('SurveyGeneralQuestions');
                } else {
                    navigation.navigate('Home');
                }
            })
            .catch(function(error) {
                console.log(error);
            })

        //   axios
        //     .post(
        //       'http://spotify-match.us-west-1.elasticbeanstalk.com/users',
        //       {
        //         "id": profile.data.id,
        //         "name": profile.data.display_name,
        //         "birthdate": "1972-04-12T07:00:00.000Z",
        //         "email": profile.data.email,
        //         "gender": "M",
        //         "orientation": "P",
        //         "location": profile.data.country,
        //         "pronouns": "he/him",
        //         "bio": null,
        //         "questionid1": null,
        //         "questionid2": null,
        //         "questionid3": null,
        //         "answer1": null,
        //         "answer2": null,
        //         "answer3": null
        //       }
        //     ).catch ((error) => {
        //       console.error(error.profile.data);
        //     })
        //   navigation.navigate('SurveyGeneralQuestions');
        }).catch((error) => {
          console.log("error", error.message);
        });
      


    
      //Current User Playlist IDs
      // axios.
      //   get(
      //     'https://api.spotify.com/v1/me/playlists', {
      //       params: { limit: 50, offset: 0 },
      //       headers: {
      //         Authorization: 'Bearer ' + token,
      //       }
      //   }).then(function(all_playlists) {
      //     for(let i = 0; i < all_playlists.data.items.length; i++) {

            // Individual Playlist Items
            // axios
            //   .get(
            //     'https://api.spotify.com/v1/playlists/' + all_playlists.data.items[i].id + '/tracks', {
            //     params: { limit : 50, offset: 0 },
            //     headers: {
            //       Authorization: 'Bearer ' + token,
            //     }
            //   }).then(function(playlist) {

                //Get tracks in playlist

                // for(let i = 0; i < playlist.data.items.length; i++) {
                //   axios
                //     .get(
                //       'https://api.spotify.com/v1/tracks/' + playlist.data.items[i].track.id, {
                //         headers: {
                //           Authorization: 'Bearer ' + token,
                //         }
                //       }).then(function(track) {

                        // Get audio feature
                        // axios.get(
                        //   'https://api.spotify.com/v1/audio-features/' + track.data.id, {
                        //     headers: {
                        //       Authorization: 'Bearer ' + token,
                        //     }
                        //   })
                        //   // .then(function(audio_feature) {
                        //   //   //Store audio feature thing in back end
                            
                        //   // })
                        
                        // // Get audio anaylsis
                        // axios.get(
                        //   'https://api.spotify.com/v1/audio-analysis/' + track.data.id, {
                        //     headers: {
                        //       Authorization: 'Bearer ' + token,
                        //     }
                        //   })
                          
                        //   // .then(function(audio_analysis) {
                        //     //Store audio analysis thing in back end

                        //   // })
                //       })
                // }

          //     });
          // }
        // });

      // //Get Artists Followed
      // axios
      //   .get(
      //     'https://api.spotify.com/v1/me/following?type=artist', {
      //       headers: {
      //         Authorization: 'Bearer ' + token,
      //         "Accept": "application/json",
      //         'Content-Type': 'application/json',
      //       }
      //     }
      //   ).then(function(artist) {
      //     // console.log(artist)
      //   })
      
      // // Get Top artists
      // axios
      //   .get(
      //     'https://api.spotify.com/v1/me/top/artists', {
      //       headers: {
      //         Authorization: 'Bearer ' + token,
      //         "Accept": "application/json",
      //         'Content-Type': 'application/json',
      //       }
      //     }
      //   ).then(function(topArtists) {
      //     // console.log(topArtists)
      //   })
        
      // // Get Top tracks
      // axios
      // .get(
      //   'https://api.spotify.com/v1/me/top/tracks', {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //       "Accept": "application/json",
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // ).then(function(topTracks) {
      //   // console.log(topTracks)
      // })

      // Get User's saved albums
      // axios
      // .get(
      //   'https://api.spotify.com/v1/me/albums', {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //       "Accept": "application/json",
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // ).then(function(userSavedAlbum) {
      //   console.log(userSavedAlbum)
      // })

      //Get User's Liked Songs (saved tracks)
    //   axios
    //   .get(
    //     'https://api.spotify.com/v1/me/tracks', {
    //       params: { limit : 50, offset: 0 },
    //       headers: {
    //         Authorization: 'Bearer ' + token,
    //         "Accept": "application/json",
    //         'Content-Type': 'application/json',
    //       }
    //     }).then(function(userSavedTracks) {
    //       for(let i = 0; i < userSavedTracks.data.items.length; i++) {
    //         // Get audio feature
    //         axios.get(
    //           'https://api.spotify.com/v1/audio-features/' + track.data.id, {
    //             headers: {
    //               Authorization: 'Bearer ' + token,
    //             }
    //         })
    //         .then(function(audio_feature) {
    //           //Store audio feature thing in back end
                
    //         })
              
    //         // Get audio anaylsis
    //         axios.get(
    //           'https://api.spotify.com/v1/audio-analysis/' + track.data.id, {
    //             headers: {
    //               Authorization: 'Bearer ' + token,
    //             }
    //         })
    //         .then(function(audio_analysis) {
    //           //Store audio analysis thing in back end

    //         })
    //       }
    //       console.log(userSavedTracks.data.items[9].track.id)
          
    //     })
      
    }
  }, [token]);


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
    fontSize: 50,
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
    height: 120, 
    width: 330, 
    justifyContent: 'center', 
    marginTop: -50, 
    marginBottom: 90, 
    marginLeft: 30
  }
});

export default SpotifyLoginScreen;