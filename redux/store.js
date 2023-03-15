import { configureStore } from "@reduxjs/toolkit";
// import messageReducer from './UserData';

import idReducer from "./UserData";
import nameReducer from "./UserData";
import emailReducer from "./UserData";
import genderReducer from "./UserData";
import locationReducer from "./UserData";
import orientationReducer from "./UserData";
import pronounsReducer from "./UserData";
import questionidsReducer from "./UserData";
import answersReducer from "./UserData";

import answer1Reducer from "./UserData";
import answer2Reducer from "./UserData";
import answer3Reducer from "./UserData";

import question1Reducer from "./UserData";
import question2Reducer from "./UserData";
import question3Reducer from "./UserData";

import birthdateReducer from "./UserData";
import bioReducer from "./UserData";
import socialsReducer from "./UserData";

import picture1Reducer from "./UserData";
import picture2Reducer from "./UserData";
import picture3Reducer from "./UserData";
import picture4Reducer from "./UserData";

import spotifydataReducer from "./UserData";
import topgenresReducer from "./UserData";
import topartistsReducer from "./UserData";
import toptracksReducer from "./UserData";

import loadingReducer from "./UserData";
import userExistsReducer from "./UserData";

import userTokenReducer from "./UserData";

// import dataReducer from './UserData'

export const store = configureStore({
  reducer: {
    // message: messageReducer,

    id: idReducer,
    name: nameReducer,
    email: emailReducer,
    gender: genderReducer,
    location: locationReducer,
    orientation: orientationReducer,
    pronouns: pronounsReducer,
    questionids: questionidsReducer,

    question1: question1Reducer,
    question2: question2Reducer,
    question3: question3Reducer,

    answer1: answer1Reducer,
    answer2: answer2Reducer,
    answer3: answer3Reducer,

    answers: answersReducer,

    birthdate: birthdateReducer,
    bio: bioReducer,
    socials: socialsReducer,

    picture1: picture1Reducer,
    picture2: picture2Reducer,
    picture3: picture3Reducer,
    picture4: picture4Reducer,

    spotifydata: spotifydataReducer,
    toptracks: toptracksReducer,
    topgenres: topgenresReducer,
    topartitsts: topartistsReducer,

    loading: loadingReducer,
    userExists: userExistsReducer,

    userToken: userTokenReducer,

    // data: dataReducer,
  },
});
