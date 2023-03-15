// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { Icon } from '@rneui/themed'

// export default function ProfileScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text
//                 onPress={() => navigation.navigate('Home')}
//                 style={{ fontSize: 26, fontWeight: 'bold' , color:'white'}}>Profile Screen</Text>
//              <View style={{ justifyContent: 'space-between', alignItems: 'flex-end',
//                         flexDirection: 'row', paddingHorizontal: '15%', }}>
//             <Icon
//             raised
//             name='times'
//             type='font-awesome'
//             color='#f50'
//             onPress={() => console.log('dislike')}
//             />

//             <Icon
//             reverse
//             name='heart'
//             type='ionicon'
//             color='#517fa4'
//             onPress={() => console.log('like')}
//             />
//         </View>
//         </View>
//     );
// }

import { StatusBar } from "expo-status-bar";
import { React, useEffect, useRef, useState, useCallback } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    // SplashScreen,
    Dimensions,
    SafeAreaView,
} from "react-native";

// adding this and commenting SplashScreen fixed the error "Possible Unhandled Promise Rejection (id: 0):
// TypeError: undefined is not an object (evaluating '_reactNative.SplashScreen.hideAsync')"
import * as SplashScreen from "expo-splash-screen";

// Importing Redux store
import { useDispatch, useSelector } from "react-redux";
import {
    setName,
    setEmail,
    setGender,
    setLocation,
    setOrientation,
    setPronouns,
    setAnswer1,
    setAnswer2,
    setAnswer3,
    setQuestion1,
    setQuestion2,
    setQuestion3,
    setBirthdate,
    setBio,
    setSocials,
    setPicture1,
    setPicture2,
    setPicture3,
    setPicture4,
    setID,
    setUserToken,
} from "../redux/UserData";
import {
    updateUserData,
    updatePictures,
    getQuestions,
    questionBank,
} from "../redux/UserData";

// Global width variable
const WIDTH = Dimensions.get("window").width;

export default function Edit_user_profile() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    var {
        id,
        name,
        email,
        gender,
        location,
        orientation,
        pronouns,

        question1,
        question2,
        question3,

        answer1,
        answer2,
        answer3,

        birthdate,
        bio,
        socials,
        picture1,
        picture2,
        picture3,
        picture4,

        spotifydata,
        toptracks,
        topgenres,
        topartists,

        userToken,
    } = useSelector((state) => state.id);

    // console.log(question1)
    // console.log(question2)
    // console.log(question3)

    // console.log(questionBank);
    // const questionBank = getQuestions();

    // console.log(questionBank._z);
    // console.log(userToken);

    const [image1, setImage1] = useState(picture1);
    const [image2, setImage2] = useState(picture2);
    const [image3, setImage3] = useState(picture3);
    const [image4, setImage4] = useState(picture4);

    let pictures = [picture1, picture2, picture3, picture4];

    const genders = [
        { key: "1", value: "Male" },
        { key: "2", value: "Female" },
        { key: "3", value: "Other" },
    ];

    const sexualOrientations = [
        { key: "1", value: "Straight" },
        { key: "2", value: "Gay" },
        { key: "3", value: "Lesbian" },
        { key: "4", value: "Bisexual" },
        { key: "5", value: "Pansexual" },
        { key: "6", value: "Other" },
    ];

    // var tempGender = "Gender";
    // if (gender != null) {
    //     tempGender = genders[gender+1].value
    // }

    // console.log(gender);
    // console.log(orientation);

    console.log(spotifydata);
    // console.log(topartists);
    // console.log(toptracks);
    // console.log(topgenres);



    //   var tempGender = "Gender";
    //   var tempOrientation = "Orientation";

    let tempBirthday = new Date(birthdate);
    let userBirthday = tempBirthday.getDate() + '/' + tempBirthday.getMonth() + '/' + tempBirthday.getFullYear();


    // var tempOrientation = "Orientation";
    // if (orientation != null) {
    //     tempOrientation = sexualOrientations[orientation+1].value
    // }

    var tempQuestion1 = "Question1";
    if (question1 != null) {
        tempQuestion1 = questionBank._z[question1].value;
    }
    var tempQuestion2 = "Question2";
    if (question2 != null) {
        tempQuestion2 = questionBank._z[question2].value;
    }
    var tempQuestion3 = "Question3";
    if (question3 != null) {
        tempQuestion3 = questionBank._z[question3].value;
    }

    // console.log(toptracks);

    // Changes image based on URI
    // Parameters: image - number from 1-4 that specifies which image is being updated
    const changeImage = async (image) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [1, 1],
            base64: true,
            quality: 0,
        });

        if (!result.canceled) {
            if (image === 1) {
                dispatch(setPicture1(result.assets[0].base64));
                setImage1(result.assets[0].uri);
                console.log("Image 1 Changed");
            }
            if (image === 2) {
                dispatch(setPicture2(result.assets[0].base64));
                setImage2(result.assets[0].uri);
                console.log("Image 2 Changed");
            }
            if (image === 3) {
                dispatch(setPicture3(result.assets[0].base64));
                setImage3(result.assets[0].uri);
                console.log("Image 3 Changed");
            }
            if (image === 4) {
                dispatch(setPicture4(result.assets[0].base64));
                setImage4(result.assets[0].uri);
                console.log("Image 4 Changed");
            }
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <SafeAreaView>
                {/* Sets status bar mode */}
                <StatusBar style="light" />

                {/* Image carousel */}
                <View style={styles.carousel}>
                    <ScrollView
                        showsHorizontalScrollIndicator={true}
                        indicatorStyle={"white"}
                        scrollIndicatorInsets={{ top: 0, left: 20, bottom: 20, right: 20 }}
                        pagingEnabled={true}
                        centerContent={true}
                        horizontal={true}
                        persistentScrollbar={true}
                    >
                        {
                            /* added the part key={index} to Fix the warning "Each child should have a unique key prop"*/
                            pictures.map((e, index) => (
                                <TouchableOpacity
                                    styles={{ marginLeft: 50 }}
                                    onPress={() => {
                                        changeImage(index + 1);
                                    }}
                                    key={index}
                                >
                                    <Image
                                        source={{ uri: `data:image/png;base64,${e}` }}
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>

                {/* Edit Name */}
                <Text style={styles.fieldTitle}>Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={(value) => {
                        dispatch(setName(value));
                        console.log(name);
                    }}
                    placeholder={"Name"}
                    style={styles.userNameInput}
                />

                {/* Edit birthdate and location */}
                <View style={styles.horizontal}>
                    <View>
                        <Text style={styles.fieldTitle}>Birthdate:</Text>
                        <Text style={styles.userBirthdateInput}>{userBirthday}</Text>
                    </View>

                    <View>
                        <Text style={styles.fieldTitle}>Location:</Text>
                        <TextInput
                            value={location}
                            onChangeText={(location) => {
                                dispatch(setLocation(location));
                            }}
                            placeholder={"Location"}
                            style={styles.userLocationInput}
                        />
                    </View>
                </View>

                {/* Edit bio */}
                <Text style={styles.fieldTitle}>Bio:</Text>
                <TextInput
                    value={bio}
                    onChangeText={(bio) => {
                        dispatch(setBio(bio));
                    }}
                    placeholder={"Bio"}
                    style={styles.bioInput}
                    multiline={true}
                />

                {/* Edit gender and sexual orientation */}
                <View style={styles.horizontal}>
                    <View>
                        <Text style={styles.fieldTitle}>Gender:</Text>
                        <SelectList
                            placeholder={gender}
                            setSelected={(gender) => {
                                dispatch(setGender(gender));
                            }}
                            data={genders}
                            save="value"
                            inputStyles={styles.selectionBoxText}
                            boxStyles={styles.selectionBox}
                            dropdownTextStyles={styles.selectionBoxDropdownText}
                            dropdownStyles={styles.selectionBoxDropdown}
                            search={false}
                            arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
                        />
                    </View>

                    <View>
                        <Text style={styles.fieldTitle}>Sexual Orientation:</Text>
                        <SelectList
                            placeholder={orientation}
                            setSelected={(value) => {
                                dispatch(setOrientation(value));
                            }}
                            data={sexualOrientations}
                            save="value"
                            inputStyles={styles.selectionBoxText}
                            boxStyles={styles.selectionBox}
                            dropdownTextStyles={styles.selectionBoxDropdownText}
                            dropdownStyles={styles.selectionBoxDropdown}
                            search={false}
                            arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
                        />
                    </View>
                </View>

                {/* Edit email */}
                <Text style={styles.fieldTitle}>Email:</Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => {
                        dispatch(setEmail(value));
                    }}
                    placeholder={"Bio"}
                    style={styles.bioInput}
                // multiline={true}
                />

                {/* Edit pronouns */}
                <Text style={styles.fieldTitle}>Pronouns:</Text>
                <TextInput
                    value={pronouns}
                    onChangeText={(value) => {
                        dispatch(setPronouns(value));
                    }}
                    placeholder={"Bio"}
                    style={styles.bioInput}
                // multiline={true}
                />

                {/* Edit socials */}
                <Text style={styles.fieldTitle}>Socials:</Text>
                <TextInput
                    value={socials}
                    onChangeText={(value) => {
                        dispatch(setSocials(value));
                    }}
                    placeholder={"Bio"}
                    style={styles.bioInput}
                // multiline={true}
                />

                {/* Edit questions */}
                <Text style={styles.questionsTitle}>Questions:</Text>

                {/* Question 1 */}
                <SelectList
                    // placeholder={questionBank[question1]["value"]}
                    placeholder={tempQuestion1}
                    setSelected={(value) => dispatch(setQuestion1(value))}
                    data={questionBank._z}
                    save="key"
                    inputStyles={styles.QselectionBoxText}
                    boxStyles={styles.selectionBox}
                    dropdownTextStyles={styles.QselectionBoxDropdownText}
                    dropdownStyles={styles.QselectionBoxDropdown}
                    search={false}
                    arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
                />

                {/* Answer 1 */}
                <TextInput
                    value={answer1}
                    onChangeText={(value) => {
                        dispatch(setAnswer1(value));
                    }}
                    placeholder={"Answer1"}
                    style={styles.textInput}
                    multiline={true}
                />

                {/* Question 2 */}
                <SelectList
                    // placeholder={questionBank[question2]["value"]}
                    placeholder={tempQuestion2}
                    setSelected={(value) => {
                        dispatch(setQuestion2(value));
                    }}
                    data={questionBank._z}
                    save="key"
                    inputStyles={styles.QselectionBoxText}
                    boxStyles={styles.selectionBox}
                    dropdownTextStyles={styles.QselectionBoxDropdownText}
                    dropdownStyles={styles.QselectionBoxDropdown}
                    search={false}
                    arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
                />

                {/* Answer 2 */}
                <TextInput
                    value={answer2}
                    onChangeText={(value) => {
                        dispatch(setAnswer2(value));
                    }}
                    placeholder={"Answer2"}
                    style={styles.textInput}
                    multiline={true}
                />

                {/* Question 3 */}
                <SelectList
                    // placeholder={questionBank[question3]["value"]}
                    placeholder={tempQuestion3}
                    setSelected={(value) => {
                        dispatch(setQuestion3(value));
                    }}
                    data={questionBank._z}
                    save="key"
                    inputStyles={styles.QselectionBoxText}
                    boxStyles={styles.selectionBox}
                    dropdownTextStyles={styles.QselectionBoxDropdownText}
                    dropdownStyles={styles.QselectionBoxDropdown}
                    search={false}
                    arrowicon={<Text style={{ color: "#fff" }}>⌄</Text>}
                />

                {/* Answer 3 */}
                <TextInput
                    value={answer3}
                    onChangeText={(answer) => {
                        dispatch(setAnswer3(answer));
                    }}
                    placeholder={"Answer3"}
                    style={styles.textInput}
                    multiline={true}
                />

                {/* Submit button - updates database with new information on call */}
                <View style={{ margin: 20 }}>
                    <Button
                        title="Submit"
                        color="#19AC52"
                        onPress={() => {
                            var tempGender = "";
                            switch (gender) {
                                case "Male":
                                    tempGender = "M";
                                    break;
                                case "Female":
                                    tempGender = "F";
                                    break;
                                default:
                                    tempGender = "O";
                                    break;
                            }

                            var tempOrientation = "";
                            switch (orientation) {
                                case "Straight":
                                    tempOrientation = "S";
                                    break;
                                case "Gay":
                                    tempOrientation = "G";
                                    break;
                                case "Lesbian":
                                    tempOrientation = "L";
                                    break;
                                case "Bisexual":
                                    tempOrientation = "B";
                                    break;
                                case "Pansexual":
                                    tempOrientation = "P";
                                    break;
                                default:
                                    tempOrientation = "O";
                                    break;
                            }

                            updatePictures({
                                id: id,
                                image1: image1,
                                image2: image2,
                                image3: image3,
                                image4: image4,
                            });

                            console.log("banana");

                            dispatch(
                                updateUserData({
                                    id: id,
                                    name: name,
                                    birthdate: birthdate,
                                    email: email,
                                    gender: tempGender,
                                    orientation: tempOrientation,
                                    location: location,
                                    pronouns: pronouns,
                                    bio: bio,
                                    questionid1: question1,
                                    questionid2: question2,
                                    questionid3: question3,
                                    answer1: answer1,
                                    answer2: answer2,
                                    answer3: answer3,
                                    instagram: socials,
                                })
                            );

                            alert("Saved successfully!");
                        }}
                    />
                    <Button
                        color="#a00"
                        title="Log Out"
                        onPress={() => {
                            // dispatch(setID(null));
                            // dispatch(setName(null));
                            // dispatch(setEmail(null));
                            // dispatch(setGender(null));
                            // dispatch(setLocation(null));
                            // dispatch(setOrientation(null));
                            // dispatch(setPronouns(null));
                            // dispatch(setAnswer1(null));
                            // dispatch(setAnswer2(null));
                            // dispatch(setAnswer3(null));
                            // dispatch(setQuestion1(null));
                            // dispatch(setQuestion2(null));
                            // dispatch(setQuestion3(null));
                            // dispatch(setBirthdate(null));
                            // dispatch(setBio(null));
                            // dispatch(setSocials(null));
                            // dispatch(setPicture1(null));
                            // dispatch(setPicture2(null));
                            // dispatch(setPicture3(null));
                            // dispatch(setPicture4(null));

                            navigation.navigate("Spotify Login Screen");
                        }}
                    ></Button>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#181818',
        backgroundColor: "#000",
    },

    horizontal: {
        flexDirection: "row",
        alignSelf: "center",
    },

    carousel: {
        width: 400,
        height: 400,
        marginTop: 25,
        alignSelf: "center",
    },

    carouselDots: {
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
        alignSelf: "center",
    },

    dotActive: {
        margin: 3,
        color: "#fff",
    },

    dot: {
        margin: 3,
        color: "#888",
    },

    image: {
        borderColor: "#1DB954",
        alignSelf: "center",
        borderWidth: 0.5,
        width: 350,
        height: 350,
        borderRadius: 33,
        marginHorizontal: 25,
    },

    fieldTitle: {
        marginLeft: 15,
        color: "#FE8AE3",
        fontSize: 15,
    },

    userNameInput: {
        textAlign: "center",
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        color: "#fff",
    },

    userBirthdateInput: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        color: "#fff",
        width: WIDTH * 0.37,
    },

    userLocationInput: {
        textAlign: "center",
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        color: "#fff",
        width: WIDTH * 0.47,
        // height: 55,
    },

    bioInput: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        color: "#fff",
    },

    questionsTitle: {
        fontSize: 22,
        margin: 25,
        color: "#FE8AE3",
        alignSelf: "center",
    },

    textInput: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        color: "#fff",
    },

    // Selection box stylings
    selectionBox: {
        justifyContent: "center",
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 15,
        color: "#fff",
        backgroundColor: "#000",
    },

    selectionBoxText: {
        color: "#fff",
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 20,
        width: WIDTH * 0.3,
    },

    selectionBoxDropdown: {
        color: "#fff",
        width: 120,
        alignSelf: "center",
    },

    selectionBoxDropdownText: {
        color: "#fff",
    },

    // Questions stylings
    QselectionBox: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 15,
        color: "#fff",
        backgroundColor: "#181818",
    },

    QselectionBoxText: {
        color: "#fff",
        fontSize: 20,
    },

    QselectionBoxDropdown: {
        color: "#fff",
        alignSelf: "center",
        width: WIDTH * 0.8,
    },

    QselectionBoxDropdownText: {
        color: "#fff",
    },
});
