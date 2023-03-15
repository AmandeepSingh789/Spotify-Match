# Spotify Match

## Group Members-
- Amaan
- Amandeep
- Vani
- Mrin
- Calder
- Rami

## What this app is about-
This app utilizes the Spotify API to analyze a user's music preferences and employs that analysis to facilitate connections with like-minded individuals or fellow musicians, with the aim of fostering connections.

## Project Scope-
- Link to a user's Spotify account and analyze their musical taste 
- Match people based on their music taste
- Have people find new music through other people
- Find like minded individuals

## Tech Stack
- React Native for front-end application
- Express.JS for the server
- Spotify API for getting the music statistics
- PostgreSQL for the Database
- AWS for hosting the Database
- Figma for UI/UX design

Note - The project is divided into two repositories, one for the frontend and one for the backend. This repository is the frontend of the app.

The backend repository is present in the assets folder as a zip file (it is a repository and has a readme for instructions). The name of the zipfile is node-api-postgres. It also contains unit tests for the backend. Please read the README file for that repository.

## Setup Notes-

`git clone https://github.com/AmandeepSingh789/Spotify-Match.git`

`npm install --force` and `yarn add` need to be used for the packages to get installed.
Its also reccomended to clear the cache. (recommended)

Indivisual packages installation-
`npm install` or `yarn add` or `npx expo install <indivisual package name>` 

Possibly other seperate installations that may need to be completed-
- `npx expo install jest-expo jest`
- `npx expo install expo-media-library@~15.0.`
- `npx expo install expo-auth-session@~3.8.0`

Note- After installing all the packages, there will be npm dependency issues or vulnerabilities warning. But the app will still work.

### to run the app-
`npx expo start` or
`npx expo start --tunnel`

### to run the test-
`npm run test`

### to clear the cache and run-
`npx expo start --clear`
OR ADD "clean": "npx expo start --clear" to package.json scripts for cache clearing

## Unit test-

The unit tests are placed in the tests directory. 

To run them-
`npm run test` 

## Navigation Sturcture-
- Stack.Navigator
 - - Spotify Login (Screen)
 - - Survey General (Screen)
 - - Survey Bio (Screen)
 - - Survey Advanced (Screen)
 - - Add Images (Screen)
 - - Home Page (Tab.Navigator and Screen)
  - - - - Percentage Breakdown (Pop up)
  - - - Matches (Screen)
   - - - - Socials (Screen)
  - - - Profile (Screen)

## Dependencies -

    rneui/base
    rneui/themed
    expo-font

    react-navigation/native
    react-native-community/masked-view
    react-navigation/stack
    react-navigation/bottom-tabs

    expo-status-bar
    expo-image-picker
    expo-media-library
    @react-native-community/datetimepicker
    react-native-dropdown-select-list
    react-native-keyboard-aware-scroll-view
    axios
    expo-splash-screen

    expo-linear-gradient
    react-native-gesture-handler
    react-native-safe-area-context
    react-native-screens

    react-native-dropdown-picker
    react-native-modal-datetime-picker
    react-hook-form

    react-native-reanimated
    react-native-cards-swipe
    react-native-gesture-handler
    buffer

    expo-auth-session
    
    (other packages mentioned in package.json)
