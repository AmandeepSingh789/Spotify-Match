import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { encode, decode } from "base64-arraybuffer";
import { Buffer } from "buffer";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export const createUser = async (data) => {
  console.log("Creating user with data:");
  console.log(data);
  await axios
    .post("http://spotify-match.us-west-1.elasticbeanstalk.com/users", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchUserData = createAsyncThunk(
  "UserData/fetchUserData",
  async (id) => {
    const response = await axios.get(
      "http://spotify-match.us-west-1.elasticbeanstalk.com/users/" + id
    );
    // console.log(response.data)
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "UserData/updateUserData",
  async (data) => {
    await axios
      .put(
        "http://spotify-match.us-west-1.elasticbeanstalk.com/users/" +
          data["id"],
        data
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);

export const createPictures = async (data) => {
  console.log("Creating profile pictures");
  // console.log(data);
  const images = {
    id: data["id"],
    picture1: await formatImage(data["image1"]),
    picture2: await formatImage(data["image2"]),
    picture3: await formatImage(data["image3"]),
    picture4: await formatImage(data["image4"]),
  };

  // console.log(images)

  await axios
    .post(
      "http://spotify-match.us-west-1.elasticbeanstalk.com/profilepictures/",
      images
    )
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updatePictures = async (data) => {
  // console.log(data);
  const images = {
    id: data["id"],
    picture1: await formatImage(data["image1"]),
    picture2: await formatImage(data["image2"]),
    picture3: await formatImage(data["image3"]),
    picture4: await formatImage(data["image4"]),
  };

  // console.log(images)

  await axios
    .put(
      "http://spotify-match.us-west-1.elasticbeanstalk.com/profilepictures/" +
        images["id"],
      images
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getQuestions = async () => {
  const questionData = await axios.get(
    "http://spotify-match.us-west-1.elasticbeanstalk.com/profilequestions/"
  );
  console.log(questionData["data"].length);

  var questionBank = [];

  // if (questionBank.length > questionData["data"].length) {
  //   questionBank = []
  // }

  for (let i = 0; i < questionData["data"].length; i++) {
    questionBank.push({
      key: questionData["data"][i]["questionid"],
      value: questionData["data"][i]["questiontext"],
    });
  }
  // console.log(questionBank)
  return questionBank;
};
export var questionBank = getQuestions();

export const formatImage = async (image) => {
  if (image[0] == "/") {
    const shortByteArray = Buffer.from(image, "base64");
    const shortByteA = `\\x${shortByteArray.toString("hex")}`;
    return shortByteA;
  }
  const resizedImage = await ImageManipulator.manipulateAsync(
    image,
    [{ resize: { width: 200, height: 200 } }],
    { format: "jpeg" }
  );

  const newuri = resizedImage.uri;

  var base64 = await FileSystem.readAsStringAsync(newuri, {
    encoding: "base64",
  }).catch((error) => console.log(error));

  const byteArray = Buffer.from(base64, "base64");
  const byteaValue = `\\x${byteArray.toString("hex")}`;

  return byteaValue;
};

const userDataSlice = createSlice({
  name: "userdata",
  initialState: {
    id: null,
    name: null,
    email: null,
    gender: null,
    location: null,
    orientation: null,
    pronouns: null,

    questionids: null,
    question1: null,
    question2: null,
    question3: null,

    answers: null,
    answer1: "",
    answer2: "",
    answer3: "",

    birthdate: null,
    bio: null,
    socials: null,

    picture1: null,
    picture2: null,
    picture3: null,
    picture4: null,

    spotifydata: null,
    topartists: null,
    toptracks: null,
    topgenres: null,

    userToken: null,

    userExists: null,
    data: [],
    loading: false,
  },

  reducers: {
    setID(state, action) {
      state.id = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setGender(state, action) {
      // switch (action.payload) {
      //   case 'Male':
      //     state.gender = 'M';
      //     break;
      //   case 'Female':
      //     state.gender = 'F';
      //     break;
      //   default:
      //     state.gender = 'O';
      // }
      state.gender = action.payload;
      console.log(state.gender);
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setOrientation(state, action) {
      // console.log(action.payload)
      // switch (action.payload) {
      //   case 'Straight':
      //     state.orientation = 'S';
      //     break;
      //   case 'Gay':
      //     state.orientation = 'G';
      //     break;
      //   case 'Lesbian':
      //     state.orientation = 'L';
      //     break;
      //   case 'Bisexual':
      //     state.orientation = 'B';
      //     break;
      //   case 'Pansexual':
      //     state.orientation = 'P';
      //     break;
      //   default:
      //     state.orientation = 'O';
      // }

      state.orientation = action.payload;
      console.log(state.orientation);
    },
    setPronouns(state, action) {
      state.pronouns = action.payload;
    },

    setQuestionids(state, action) {
      state.questionids = action.payload;
    },

    setQuestion1(state, action) {
      state.question1 = action.payload;
    },
    setQuestion2(state, action) {
      state.question2 = action.payload;
    },
    setQuestion3(state, action) {
      state.question3 = action.payload;
    },

    setAnswers(state, action) {
      state.answers = action.payload;
    },
    setAnswer1(state, action) {
      state.answer1 = action.payload;
    },
    setAnswer2(state, action) {
      state.answer2 = action.payload;
    },
    setAnswer3(state, action) {
      state.answer3 = action.payload;
    },

    setBirthdate(state, action) {
      state.birthdate = action.payload;
    },
    setBio(state, action) {
      state.bio = action.payload;
    },
    setSocials(state, action) {
      state.socials = action.payload;
    },
    setPicture1(state, action) {
      state.picture1 = action.payload;
    },
    setPicture2(state, action) {
      state.picture2 = action.payload;
    },
    setPicture3(state, action) {
      state.picture3 = action.payload;
    },
    setPicture4(state, action) {
      state.picture4 = action.payload;
    },

    setUserToken(state, action) {
      state.userToken = action.payload;
    },

    setSpotifyData(state, action) {
      state.spotifydata = action.payload;
    },
    setTopArtists(state, action) {
      state.topartists = action.payload;
    },
    setTopTracks(state, action) {
      state.toptracks = action.payload;
    },
    setTopGenres(state, action) {
      state.topgenres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.userExists = true;
        state.id = action.payload["id"];
        state.name = action.payload["name"];

        console.log(state.name);
        state.email = action.payload["email"];

        if (action.payload["gender"] == "M") {
          state.gender = "Male";
        } else if (action.payload["gender"] == "F") {
          state.gender = "Female";
        } else {
          state.gender = "Other";
        }

        state.location = action.payload["location"];
        // console.log(state.location)

        switch (action.payload["orientation"]) {
          case "S":
            state.orientation = "Straight";
            break;
          case "G":
            state.orientation = "Gay";
            break;
          case "L":
            state.orientation = "Lesbian";
            break;
          case "B":
            state.orientation = "Bisexual";
            break;
          case "P":
            state.orientation = "Pansexual";
            break;
          default:
            state.orientation = "Other";
        }

        state.pronouns = action.payload["pronouns"];

        state.question1 = action.payload["questionid1"];
        state.question2 = action.payload["questionid2"];
        state.question3 = action.payload["questionid3"];

        state.answer1 = action.payload["answer1"];
        state.answer2 = action.payload["answer2"];
        state.answer3 = action.payload["answer3"];

        state.birthdate = action.payload["birthdate"];
        state.bio = action.payload["bio"];
        state.socials = action.payload["instagram"];

        if (action.payload["profilepictures"]) {
          if (action.payload["profilepictures"]["picture1"]) {
            state.picture1 = new Buffer.from(
              action.payload["profilepictures"]["picture1"]["data"]
            ).toString("base64");
            // console.log(state.picture1.length)
          }

          if (action.payload["profilepictures"]["picture2"]) {
            state.picture2 = new Buffer.from(
              action.payload["profilepictures"]["picture2"]["data"]
            ).toString("base64");
            // console.log(state.picture2.length)
          }

          if (action.payload["profilepictures"]["picture3"]) {
            state.picture3 = new Buffer.from(
              action.payload["profilepictures"]["picture3"]["data"]
            ).toString("base64");
            // console.log(state.picture3.length)
          }

          if (action.payload["profilepictures"]["picture4"]) {
            state.picture4 = new Buffer.from(
              action.payload["profilepictures"]["picture4"]["data"]
            ).toString("base64");
            // console.log(state.picture4.length)
          }
        }

        state.spotifydata = action.payload["spotifydata"];
        state.topartists = action.payload["topartists"];
        state.toptracks = action.payload["toptracks"];
        state.topgenres = action.payload["topgenres"];

        state.loading = false;
      } else {
        state.userExists = false;
      }
    });

    builder.addCase(fetchUserData.rejected, (state) => {
      state.loading = false;
      state.userExists = false;
    });
  },
});

export const {
  setID,
  setName,
  setEmail,
  setBirthdate,
  setAnswers,
  setAnswer1,
  setAnswer2,
  setAnswer3,
  setQuestion1,
  setQuestion2,
  setQuestion3,
  setBio,
  setGender,
  setLocation,
  setOrientation,
  setPronouns,
  setQuestionids,
  setSocials,

  setPicture1,
  setPicture2,
  setPicture3,
  setPicture4,

  setSpotifyData,
  setTopArtists,
  setTopGenres,
  setTopTracks,

  setUserToken,
} = userDataSlice.actions;
export default userDataSlice.reducer;
