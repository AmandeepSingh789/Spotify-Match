// Importing Packages
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";

import {
  setID,
  setSpotifyData,
  setTopArtists,
  setTopGenres,
  setTopTracks,
  setEmail,
  setUserToken,
} from "../redux/UserData";
import {
  updateUserData,
  updatePictures,
  questionBank,
  fetchUserData,
} from "../redux/UserData";

// Get app logo
const logo = require("../assets/spotify_match_logo.png");

async function postData(data, endpoint, id) {
  axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/', data).catch((error) => { console.error(error); })
}

async function postDummySpotifyData() {
  let genres = ["hip-hop", "lo-fi", "indie", "pop", "rock", "swedish-house", "death-metal", "math-rock", "jazz"];
  let artists = [["Dua Lipa", "6M2wZ9GZgrQXHCFfjv46we"],
  ["JAY-Z", "3nFkdlSjzX9mRTtwJOzDYB"],
  ["Nujabes", "3Rq3YOF9YG9YfCWD4D56RZ"],
  ["Men I Trust", "3zmfs9cQwzJl575W1ZYXeT"],
  ["Rihanna", "5pKCCKE2ajJHZ9KAiaK11H"],
  ["SZA", "7tYKF4w9nC0nq9CsPZTHyP"],
  ["Thad Jones", "6DbqS0X8cSFOPGsvyze2yh"],
  ["Miles Davis", "0kbYTNQb4Pb1rPbbaF0pT4"],
  ["Doja Cat", "5cj0lLjcoR7YOSnhnX0Po5"]]

  let tracks = [["Both Sides Of The Moon", "3zBCukLskhPfajaRaGgEvc"],
  ["telepatía // acoustic", "2syQErCMMM1rXeZqtuaqxg"],
  ["Aces", "4pV6Kx1T9L49PBFwH1g8ca"],
  ["Mercury", "3ixe45hov7EBKXm8tYBmvX"],
  ["Shibuya (feat. Syd)", "6WVSnyKQGzs1fosa2I3FMQ"],
  ["One Beer", "4BnrGx9tWNF8aiXl1UhDBa"],
  ["505", "58ge6dfP91o9oXMzq3XkIS"],
  ["Cruisin to the Park", "3XITcXbaKS08ardf8ahKqM"],
  ["Walkin", "1q8DwZtQen5fvyB7cKbShC"]]

  // add spotify data

  console.log(dummyArtists);
  // console.log(dummyGenres);
  // console.log(dummyTracks);

  for (let id = 0; id < 17; id++) {
    let dummyGenres = [];
    for (let i = 0; i < 4; i++) {
      dummyGenres.push({
        "genre": genres[Math.floor(Math.random() * 8)],
        "rank": i + 1,
      })
    }

    let dummyArtists = [];
    for (let i = 0; i < 4; i++) {
      let val = Math.floor(Math.random() * 8)
      dummyArtists.push({
        "artistid": artists[val][1],
        "artistname": artists[val][0],
        "rank": i + 1,
      })
    }

    let dummyTracks = [];
    for (let i = 0; i < 4; i++) {
      let val = Math.floor(Math.random() * 8);
      dummyTracks.push({
        "rank": i + 1,
        "trackid": tracks[val][1],
        "trackname": tracks[val][0],
      })
    }

    axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/',
      {
        "id": id,
        "acousticness": Math.random(),
        "danceability": Math.random(),
        "energy": Math.random(),
        "instrumentalness": Math.random(),
        "liveness": Math.random(),
        "speechiness": Math.random(),
        "valence": Math.random()
      }
    ).catch((error) => { console.error(error); });

    // axios.post('http://spotify-match.us-west-1.elasticbeanstalk.com/spotifydata/topartists/13',
    //   dummyArtists
    // ).catch((error) => { console.error(error); });

  }
};

// Number of artists / tracks / genres to retrieve from Spotify API
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
    return axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }
}

const SpotifyLoginScreen = () => {
  const dispatch = useDispatch();
  var { id, spotifydata, topartists, toptracks, topgenres, userToken } =
    useSelector((state) => state.id);

  console.log(id);
  // postDummySpotifyData();

  const navigation = useNavigation();

  const [token, setToken] = useState("");

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "f2d7af74f02549329025eed26cfbf6c1",
      scopes: [
        "ugc-image-upload",
        "user-read-playback-state",
        "user-read-currently-playing",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-follow-read",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played",
        "user-library-read",
        "user-read-email",
        "user-read-private",
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
      .get("https://api.spotify.com/v1/me/top/artists", {
        params: { limit: NUMTOPARTISTS, offset: 0 },
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (topArtists) {
        let genres = {};
        let artists = [];

        // console.log("Top Artists")
        for (let i = 0; i < topArtists.data.items.length; i += 1) {
          let artistData = topArtists.data.items[i];
          let artistObj = {
            artistid: artistData.id,
            artistname: artistData.name,
            rank: i + 1,
          };
          artists.push(artistObj);
          // console.log(artistObj)
          // iterate through each genre associated with the artist and add them to the counter
          for (let genre in artistData.genres) {
            genres[artistData.genres[genre]] =
              (genres[artistData.genres[genre]] || 0) + 1;
          }
        }
        // console.log("\n")
        // console.log("Genres")
        // console.log(genres)
        // console.log("\n")

        const genresRanked = Object.entries(genres).sort((a, b) => b[1] - a[1]);

        let genreList = [];

        let i = 0;
        while (i < NUMTOPGENRES && i < genresRanked.length) {
          let genre = {
            genre: genresRanked[i][0],
            rank: i + 1,
          };
          genreList.push(genre);
          i += 1;
        }

        dispatch(setTopGenres(genreList));
        dispatch(setTopArtists(artists));
      });
  }

  async function getTopTracks(token, userID) {
    return axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        params: { limit: NUMTOPTRACKS, offset: 0 },
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (topTracks) {
        let tracks = [];
        let trackids = [];
        for (let i = 0; i < topTracks.data.items.length; i += 1) {
          let trackInfo = topTracks.data.items[i];
          let track = {
            trackid: trackInfo.id,
            trackname: trackInfo.name,
            rank: i + 1,
          };
          tracks.push(track);
          trackids.push(trackInfo.id);
        }

        console.log(tracks);
        dispatch(setTopTracks(tracks));
        return trackids;
      });
  }

  async function getAudioFeatures(trackids, token, userID) {
    axios
      .get("https://api.spotify.com/v1/audio-features", {
        params: { ids: trackids.toString() },
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (audioFeatures) {
        let data = {
          id: userID,
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          liveness: 0,
          speechiness: 0,
          valence: 0,
        };

        // console.log("Top Tracks Audio Features")

        let num_tracks = audioFeatures.data.audio_features.length;

        for (
          let track = 0;
          track < audioFeatures.data.audio_features.length;
          track += 1
        ) {
          let track_data = audioFeatures.data.audio_features[track];
          data.acousticness += track_data.acousticness;
          data.danceability += track_data.danceability;
          data.energy += track_data.energy;
          data.instrumentalness += track_data.instrumentalness;
          data.liveness += track_data.liveness;
          data.speechiness += track_data.speechiness;
          data.valence += track_data.valence;
        }

        data.acousticness /= num_tracks;
        data.danceability /= num_tracks;
        data.energy /= num_tracks;
        data.instrumentalness /= num_tracks;
        data.liveness /= num_tracks;
        data.speechiness /= num_tracks;
        data.valence /= num_tracks;

        console.log(data)
        // console.log("\n")

        // console.log(userID);

        dispatch(setSpotifyData(data));
      });
  }

  const setData = (userID, userEmail) => {
    dispatch(setID(userID));
    dispatch(setEmail(userEmail));
    // dispatch(fetchUserData(id));
    console.log(id);
  };

  var userID;
  var userEmail;
  // console.log(token);
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      dispatch(setUserToken(access_token));
      // token = access_token;
    }
  }, [response]);

  useEffect(() => {
    postDummySpotifyData();

    async function fetchData() {
      // setToken('');
      // console.log(userToken);
      console.log(token);

      const profile = await getSpotifyUser(token);

      // var userID;


      if (profile.data) {
        userID = profile.data.id;
        userEmail = profile.data.email;
        setData(userID, userEmail);
      }



      const userExists = await axios
        .get(
          "http://spotify-match.us-west-1.elasticbeanstalk.com/users/exists/" +
          userID
        )
        .catch((response) => {
          console.log(response);
        });

      // const userExists = await axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/exists/')
      // .catch((response) => { console.log(response) });

      // console.log(userExists.data);
      // console.log(spotifydata)
      // console.log(id)

      if (userExists.data) {
        dispatch(fetchUserData(userID));
        let trackids = await getTopTracks(token, userID);
        await getTopArtists(token, userID);
        await getAudioFeatures(trackids, token, userID);
        navigation.navigate("Home");
      } else {
        await getTopArtists(token, userID);
        let trackids = await getTopTracks(token, userID);
        await getTopArtists(token, userID);
        await getAudioFeatures(trackids, token, userID);
        navigation.navigate("SurveyGeneralQuestions");
      }
    }

    fetchData();
  }, [token]);

  // dispatch(setID(userID))
  // dispatch(fetchUserData(userID));

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: -40 }}>
        <Text style={styles.welcometext}>
          Welcome{"\n"}
          to{"\n"}
        </Text>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={{ bottom: -100 }}>
        <Button
          disabled={!request}
          title="Login with Spotify"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontWeight: "bold", color: "black" }}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  welcometext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#3EFF2D",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 30,
    height: 60,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 40,
    marginVertical: 10,
  },
  logo: {
    height: 120,
    width: 330,
    justifyContent: "center",
    marginTop: -50,
    marginBottom: 90,
    marginLeft: 30,
  },
});

export default SpotifyLoginScreen;
