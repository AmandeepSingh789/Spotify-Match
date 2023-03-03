import { StatusBar } from 'expo-status-bar';
import {React, useEffect, useRef, useState, useCallback} from 'react';
import {Camera} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import { useFonts } from 'expo-font';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  ActivityIndicator,
  ImageBase,
  TouchableOpacity,
  TouchableHighlight
 } from 'react-native';


export default function Add_images() {
  const navigation = useNavigation(); 
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);


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


  const pickImages = async () => {
    // no permission needed
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 4,
      orderedSelection: true

    });


    if (!result.canceled) {
      setImage1(result.assets[0].uri);
      setImage2(result.assets[1].uri);
      setImage3(result.assets[2].uri);
      setImage4(result.assets[3].uri);
    }
  };

  const changeImage = async (image) => {
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
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Add Images</Text>

      <Text style={styles.subtitle}>The first image will be your profile picture!</Text>
      <Text style={styles.subtitle}>Tap an image to edit it.</Text>
      
      
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={() => {changeImage(1);}}>
            <Image source={{ uri: image1 }} style={styles.profilePicture} />
          </TouchableOpacity>
        </View>



        <View style={styles.imageView}>
          <TouchableOpacity onPress={() => {changeImage(3);}}>
            <Image source={{ uri: image3 }} style={styles.image} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {changeImage(4);}}>
            <Image source={{ uri: image4 }} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {changeImage(2);}}>
            <Image source={{ uri: image2 }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity style={styles.button} onPress={pickImages}>
        <Text style={styles.buttonText}>Choose Images...</Text>
      </TouchableOpacity>

      <Button
        style={styles.button}
        title="Submit"
        onPress={() => {
          SaveToPhone(image1);
          SaveToPhone(image2);
          SaveToPhone(image3);
          SaveToPhone(image4);
          navigation.navigate('Home');
        }}
        color="#19AC52"
      />

    </SafeAreaView>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  title: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    margin: 20,
    alignSelf: 'flex-start'
  },

  subtitle: {
    fontSize: 14,
    color: "#1DB954",
    marginRight: 20,
    alignSelf: 'flex-end'
  },

  imageContainer: {
    margin: 50,
    alignSelf: 'center'
  }, 
  
  imageView: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  profilePicture: {
    borderColor: '#1DB954',
    borderWidth: 0.5,
    width: 200,
    height: 200,
    borderRadius: 43,
    margin: 5
  },

  image: {
    borderColor: '#1DB954',
    borderWidth: 0.5,
    width: 120,
    height: 120,
    borderRadius: 33,
    margin: 5
  },

  button: {
    margin: 10,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 50,
  },

  buttonText: {
    fontFamily:'Inter-Bold'
  }

});