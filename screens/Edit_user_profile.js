import { StatusBar } from 'expo-status-bar';
import { React, useEffect, useRef, useState, useCallback } from 'react';
import { useFonts } from 'expo-font';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import DateTimePicker from '@react-native-community/datetimepicker';

import { SelectList } from 'react-native-dropdown-select-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    SplashScreen,
    Dimensions
    } from 'react-native';

import axios from "axios";


// Global width variable
const WIDTH = Dimensions.get('window').width;


export default function Edit_user_profile() {
    // User attributes as state variables
    const [imgActive, setimgActive] = useState(null);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    
    // List of URI's
    let images = [image1, image2, image3, image4]

    const [userID, setUserID] = useState('1');
    // user 2 is test user

    const [name, setName] = useState(null);
    const [birthdate, setBirthdate] = useState(new Date());

    const [bio, setBio] = useState(null);

    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState(null);
    
    const [sexualOrientation, setSexualOrientation] = useState(null);
    const [pronouns, setPronouns] = useState(null);

    const [location, setLocation] = useState(null);

    const [question1, setquestion1] = useState(null);
    const [question2, setquestion2] = useState(null);
    const [question3, setquestion3] = useState(null);

    const [answer1, setAnswer1] = useState(null);
    const [answer2, setAnswer2] = useState(null);
    const [answer3, setAnswer3] = useState(null);

    const genders = [
        {key: '1', value: 'M'},
        {key: '2', value: 'F'},
        {key: '3', value: 'Other'},
    ]

    const sexualOrientations = [
        {key: '1', value: 'Straight'},
        {key: '2', value: 'Gay'},
        {key: '3', value: 'Lesbian'},
        {key: '4', value: 'Bisexual'},
        {key: '5', value: 'Pansexual'},
        {key: '6', value: 'Other'},
    ]

    const data = [
        {key:'1', value:'What kind of instrument do you play?'},
        {key:'2', value:'What is your favorite place?'},
        {key:'3', value:'Is a hotdog a sandwich?'},
    ]


    // Recieves information from database on start
    useEffect(() => {
        axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/' + userID)
        .then(function (response) {
            setName(response["data"][0]["name"]);
            setLocation(response["data"][0]["location"])
            setBirthdate(new Date(response["data"][0]["birthdate"]));
            setGender(response["data"][0]["gender"]);
            setEmail(response["data"][0]["email"]);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [])
    
    // Updates information on the database on call
    const updateDB = () => {
        axios.put('http://spotify-match.us-west-1.elasticbeanstalk.com/users/' + userID, 
        {
            "id": userID,
            "name": name,
            "birthdate": birthdate,
            "email": email,
            "gender": gender,
            "location": location
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    
    // Loading of fonts
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    // Changes image based on URI
    // Parameters: image - number from 1-4 that specifies which image is being updated
    const changeImage = async (image) => {
        console.log(image)
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (image === 1) {
        setImage1(result.assets[0].uri);
        console.log(image1);
        } 
        if (image === 2) {
        setImage2(result.assets[0].uri);
        console.log("image 2");
        }
        if (image === 3) {
        setImage3(result.assets[0].uri);
        console.log("image 3");
        } 
        if (image === 4) {
        setImage4(result.assets[0].uri);
        console.log("image 4");
        }
    }

    // Function to save image to local phone image gallery
    // Parameters: item - URI of the image being saved
    const SaveToPhone = async (item) => {
        // item is a image uri
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
        try {
            const asset = await MediaLibrary.createAssetAsync(item);
            const album = MediaLibrary.getAlbumAsync('SpotifyMatch');

            if (album == null) {
            MediaLibrary.createAlbumAsync('SpotifyMatch', asset, false)
            .then(() => {
                console.log('file saved');
            })
            .catch(() => {
                console.log('error saving');
            });
            console.log("album not here");
            // MediaLibrary.addAssetsToAlbumAsync(asset, album, false)

            } else {
            console.log("album here");
            MediaLibrary.addAssetsToAlbumAsync(asset, 'SpotifyMatch', true)
            }
            
        } catch (error) {
            console.log(error);
        }
        } else {
        console.log('need photo permission');
        }
    };


    return (
        <KeyboardAwareScrollView  style={styles.container} onLayout={onLayoutRootView}>
            {/* Sets status bar mode */}
            <StatusBar style="auto" />

            {/* Image carousel */}
            <View style={styles.carousel}>
                <ScrollView
                    showsHorizontalScrollIndicator = {true}
                    indicatorStyle={'white'}
                    scrollIndicatorInsets={{top: 0, left: 20, bottom: 20, right: 20}}
                    pagingEnabled={true}
                    centerContent={true}
                    horizontal={true}
                    persistentScrollbar={true} 
                >
                    {
                        images.map((e, index) => 
                            <TouchableOpacity styles= {{marginLeft: 50}} onPress={() => {changeImage(index+1);}}>
                                <Image source={{ uri: e }} style={styles.image} />
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>
            </View>


            {/* Edit Name */}
            <Text style={styles.fieldTitle}>Name:</Text>
            <TextInput
                    value={name}
                    onChangeText={(name) => {setName(name); console.log(name)}}
                    placeholder={'Name'}
                    style={styles.userNameInput}
                    
        
            />


            {/* Edit birthdate and location */}
            <View style={styles.horizontal}>
                <View>
                    <Text style={styles.fieldTitle}>Birthdate:</Text>
                    <View style={styles.userBirthdateInput}>
                        <DateTimePicker 
                            display="default" 
                            value={birthdate}
                            themeVariant="dark"
                            onChange={(event, date) => {
                                const {
                                    type,
                                    nativeEvent: {timestamp},
                                } = event;
                                console.log(event.type)
                                if (event.type == 'set') {
                                    console.log(date.getDate());
                                    setBirthdate(date);
                                }
                            }}
                        />

                    </View>
                </View>
                
                <View>
                    <Text style={styles.fieldTitle}>Location:</Text>
                    <TextInput
                        value={location}
                        onChangeText={(location) => {setLocation(location)}}
                        placeholder={'Location'}
                        style={styles.userLocationInput}
                    />
                </View>
            </View>
            

            {/* Edit bio */}
            <Text style={styles.fieldTitle}>Bio:</Text>
            <TextInput
                    value={bio}
                    onChangeText={(bio) => {setBio(bio)}}
                    placeholder={'Bio'}
                    style={styles.bioInput}
                    multiline={true}
            />


            {/* Edit gender and sexual orientation */}
            <View style={styles.horizontal}>
                <View>
                    <Text style={styles.fieldTitle}>Gender:</Text>
                    <SelectList
                        placeholder={gender}
                        setSelected={(gender) => setGender(gender)}
                        data = {genders}
                        inputStyles={styles.selectionBoxText}
                        boxStyles={styles.selectionBox}
                        dropdownTextStyles={styles.selectionBoxDropdownText}
                        dropdownStyles={styles.selectionBoxDropdown}
                        search={false}
                        arrowicon={<Text style={{color: '#fff'}}>⌄</Text>}
                    />
                </View>
                
                <View>
                    <Text style={styles.fieldTitle}>Sexual Orientation:</Text>
                    <SelectList
                        setSelected={(sexualOrientation) => setSexualOrientation(sexualOrientation)}
                        data = {sexualOrientations}
                        inputStyles={styles.selectionBoxText}
                        boxStyles={styles.selectionBox}
                        dropdownTextStyles={styles.selectionBoxDropdownText}
                        dropdownStyles={styles.selectionBoxDropdown}
                        search={false}
                        arrowicon={<Text style={{color: '#fff'}}>⌄</Text>}
                    />

                </View>
            </View>
            


            {/* Edit questions */}
            <Text style={styles.questionsTitle}>Questions:</Text>
            
            {/* Question 1 */}
            <SelectList 
                setSelected={(question1) => setquestion1(question1)} 
                data={data} 
                save="value"
                inputStyles={styles.QselectionBoxText}
                boxStyles={styles.selectionBox}
                dropdownTextStyles={styles.QselectionBoxDropdownText}
                dropdownStyles={styles.QselectionBoxDropdown}
                search={false}
                arrowicon={<Text style={{color: '#fff'}}>⌄</Text>}
            />
            {/* Answer 1 */}
            <TextInput
                value={answer1}
                onChangeText={(answer1) => setAnswer1(answer1)}
                placeholder={'Answer1'}
                style={styles.textInput}
            />

            {/* Question 2 */}
            <SelectList
                setSelected={(question2) => setquestion2(question2)} 
                data={data} 
                save="value"
                inputStyles={styles.QselectionBoxText}
                boxStyles={styles.selectionBox}
                dropdownTextStyles={styles.QselectionBoxDropdownText}
                dropdownStyles={styles.QselectionBoxDropdown}
                search={false}
                arrowicon={<Text style={{color: '#fff'}}>⌄</Text>}
            />
            {/* Answer 2 */}
            <TextInput
                value={answer2}
                onChangeText={(answer2) => setAnswer2(answer2)}
                placeholder={'Answer2'}
                style={styles.textInput}
            />

            {/* Question 3 */}
            <SelectList 
                setSelected={(question3) => setquestion3(question3)} 
                data={data} 
                save="value"
                inputStyles={styles.QselectionBoxText}
                boxStyles={styles.selectionBox}
                dropdownTextStyles={styles.QselectionBoxDropdownText}
                dropdownStyles={styles.QselectionBoxDropdown}
                search={false}
                arrowicon={<Text style={{color: '#fff'}}>⌄</Text>}
            />

            {/* Answer 3 */}
            <TextInput
                value={answer3}
                onChangeText={(answer3) => setAnswer3(answer3)}
                placeholder={'Answer3'}
                style={styles.textInput}
                autoFocus={true}
            />

            {/* Submit button - updates database with new information on call */}
            <View style={{margin:20}}>
                <Button 
                    title='Submit' 
                    color= '#19AC52'
                    onPress={() => {updateDB()}}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },

    horizontal: {
        flexDirection: 'row',
        alignSelf: 'center'

    },

    carousel: {
        width: 400,
        height: 400,
        marginTop: 25,
        alignSelf: 'center'
    },

    carouselDots: {
        position: 'absolute',
        bottom: 10, 
        flexDirection: 'row', 
        alignSelf: 'center'
    },

    dotActive: {
        margin: 3, 
        color: '#fff'
    },

    dot: {
        margin: 3, 
        color: '#888'
    },

    image: {
        borderColor: '#1DB954',
        alignSelf: 'center',
        borderWidth: 0.5,
        width: 350,
        height: 350,
        borderRadius: 33,
        marginHorizontal: 25
    },

    fieldTitle: {
        marginLeft: 15,
        color: '#FE8AE3',
        fontSize: 15,
    },

    userNameInput: {
        textAlign: 'center',
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 10,
        color: '#fff'
    },


    userBirthdateInput: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 10,
        color: '#fff',
        width: WIDTH *0.37
    },

    userLocationInput: {
        textAlign: 'center',
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 10,
        color: '#fff',
        width: WIDTH *0.47,
        height: 55
    },


    bioInput: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 10,
        color: '#fff'
    },


    questionsTitle: {
        fontSize: 22,
        margin: 25,
        color:'#FE8AE3',
        alignSelf: 'center'
    },

    textInput: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 10,
        color: '#fff'
    },

    // Selection box stylings
    selectionBox: {
        justifyContent: 'center',
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 15,
        color: '#fff',
        backgroundColor: '#181818'
    },

    selectionBoxText: {
        color: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        width: WIDTH *0.3
    },

    selectionBoxDropdown: {
        color: '#fff',
        width: 120,
        alignSelf: 'center'
    },

    selectionBoxDropdownText: {
        color: '#fff'
    },

    // Questions stylings
    QselectionBox: {
        margin: 15,
        fontSize: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1DB954',
        padding: 15,
        color: '#fff',
        backgroundColor: '#181818'
    },

    QselectionBoxText: {
        color: '#fff',
        fontSize: 20,
    },

    QselectionBoxDropdown: {
        color: '#fff',
        alignSelf: 'center'
    },

    QselectionBoxDropdownText: {
        color: '#fff'
    },
});
  