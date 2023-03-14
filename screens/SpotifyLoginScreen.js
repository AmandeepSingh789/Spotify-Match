import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Importing Redux store
import { useDispatch, useSelector } from 'react-redux';

import {
  setID,
  setSpotifyData,
  setTopArtists,
  setTopGenres,
  setTopTracks,
  setEmail,
  setUserToken
} from '../redux/UserData';
import { updateUserData, updatePictures, questionBank, fetchUserData } from '../redux/UserData';
// import { set } from "react-native-reanimated";

const logo = require('../assets/spotify_match_logo.png');

const NUMTOPARTISTS = 50;
const NUMTOPTRACKS = 50;
const NUMTOPGENRES = 50;


const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

async function getSpotifyUser(token) {
  if (token) {
    //Current User's Profile
    return axios
      .get(
        'https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }
      }
      )
  }
}

const SpotifyLoginScreen = () => {
  const dispatch = useDispatch();
  var {
    id,
    spotifydata,
    topartists,
    toptracks,
    topgenres,
    userToken,
  } = useSelector(((state) => state.id));

  const navigation = useNavigation();

  const [token, setToken] = useState('');

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
    {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    }
  );

  async function getTopArtists(token, userID) {
    // Get Top artists
    axios
      .get(
        'https://api.spotify.com/v1/me/top/artists', {
        params: { limit: NUMTOPARTISTS, offset: 0 },
        headers: {
          Authorization: 'Bearer ' + token,
          "Accept": "application/json",
          'Content-Type': 'application/json',
        }
      }
      ).then(function (topArtists) {

        let genres = {}
        let artists = []

        // console.log("Top Artists")
        for (let i = 0; i < topArtists.data.items.length; i += 1) {
          let artistData = topArtists.data.items[i];
          let artistObj = {
            artistid: artistData.id,
            artistname: artistData.name,
            rank: i + 1
          }
          artists.push(artistObj)
          // console.log(artistObj)
          // iterate through each genre associated with the artist and add them to the counter
          for (let genre in artistData.genres) {
            genres[artistData.genres[genre]] = (genres[artistData.genres[genre]] || 0) + 1;
          }
        }
        // console.log("\n")
        // console.log("Genres")
        // console.log(genres)
        // console.log("\n")

        const genresRanked = Object.entries(genres).sort((a, b) => b[1] - a[1]);

        let genreList = []

        let i = 0;
        while (i < NUMTOPGENRES && i < genresRanked.length) {
          let genre = {
            genre: genresRanked[i][0],
            rank: i + 1
          };
          genreList.push(genre);
          i += 1;
        }

        dispatch(setTopGenres(genreList));
        dispatch(setTopArtists(artists));

      })
  }

  async function getTopTracks(token, userID) {
    return axios
      .get(
        'https://api.spotify.com/v1/me/top/tracks', {
        params: { limit: NUMTOPTRACKS, offset: 0 },
        headers: {
          Authorization: 'Bearer ' + token,
          "Accept": "application/json",
          'Content-Type': 'application/json',
        }
      }
      ).then(function (topTracks) {
        let tracks = []
        let trackids = []
        for (let i = 0; i < topTracks.data.items.length; i += 1) {
          let trackInfo = topTracks.data.items[i];
          let track = {
            trackid: trackInfo.id,
            trackname: trackInfo.name,
            rank: i + 1
          }
          tracks.push(track)
          trackids.push(trackInfo.id)
        }

        dispatch(setTopTracks(tracks));
        return trackids;
      }
      )
  }

  async function getAudioFeatures(trackids, token, userID) {
    axios.get(
      'https://api.spotify.com/v1/audio-features', {
      params: { ids: trackids.toString() },
      headers: {
        Authorization: 'Bearer ' + token,
        "Accept": "application/json",
        'Content-Type': 'application/json',
      }
    }
    ).then(function (audioFeatures) {
      let data = {
        id: userID,
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0,
        valence: 0
      }

      // console.log("Top Tracks Audio Features")

      let num_tracks = audioFeatures.data.audio_features.length;

      for (let track = 0; track < audioFeatures.data.audio_features.length; track += 1) {
        let track_data = audioFeatures.data.audio_features[track]
        data.acousticness += track_data.acousticness
        data.danceability += track_data.danceability
        data.energy += track_data.energy
        data.instrumentalness += track_data.instrumentalness
        data.liveness += track_data.liveness
        data.speechiness += track_data.speechiness
        data.valence += track_data.valence
      }

      data.acousticness /= num_tracks
      data.danceability /= num_tracks
      data.energy /= num_tracks
      data.instrumentalness /= num_tracks
      data.liveness /= num_tracks
      data.speechiness /= num_tracks
      data.valence /= num_tracks

      // console.log(data)
      // console.log("\n")

      // console.log(userID);

      dispatch(setSpotifyData(data));
    }
    )
  }

  const setData = (userID, userEmail) => {
    dispatch(setID(userID));
    dispatch(setEmail(userEmail));
    // dispatch(fetchUserData(id));
    console.log(id)
  }


  var userID;
  var userEmail;
  // console.log(token);
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      // setToken(access_token);
      dispatch(setUserToken(access_token));
      // token = access_token;
    }
  }, [response]);


  useEffect(() => {
    async function fetchData() {
      // setToken('');
      console.log(userToken);
      // console.log(token)

      const profile = await getSpotifyUser(userToken);

      // var userID;

      if (profile.data) {
        userID = profile.data.id;
        userEmail = profile.data.email;
        setData(userID, userEmail)
      }

      const userExists = await axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/exists/' + userID)
        .catch((response) => { console.log(response) });

      // const userExists = await axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/exists/')
      // .catch((response) => { console.log(response) });

      console.log(userExists.data);
      // console.log(id)

      if (userExists.data) {
        dispatch(fetchUserData(userID));
        navigation.navigate('Home');
      } else {

        await getTopArtists(token, userID);
        let trackids = await getTopTracks(token, userID);
        // console.log(trackids);
        await getAudioFeatures(trackids, token, userID);
        navigation.navigate('SurveyGeneralQuestions');
      }
    }

    fetchData();
  }, [token]);

  // dispatch(setID(userID))
  // dispatch(fetchUserData(userID));


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: -40 }}>
        <Text
          style={styles.welcometext}
        >
          Welcome{"\n"}
          to{"\n"}
        </Text>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>
      <View style={{ bottom: -100 }}>
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
  },
  
});

export default SpotifyLoginScreen;