import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Buffer } from 'buffer';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const local = "http://localhost:3000/";
const server = "http://spotify-match.us-west-1.elasticbeanstalk.com/profilepictures/";
const host = server;
const userId = "0";



import axios from 'axios';

export default function App() {

  const [image, setImage] = useState(null);
  const [sentPic, setSentPic] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    const sendPicture = async () => {

      const resizedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 200, height: 200 } }],
        { format: 'jpeg' }
      );

      const newuri = resizedImage.uri
    
      const fileInfo = await FileSystem.getInfoAsync(newuri).catch(error => console.log(error));
      console.log(fileInfo);
      
      var base64 = await FileSystem.readAsStringAsync(newuri, { encoding: 'base64' }).catch(error => console.log(error));
      console.log("base64 image: " + base64);

      const byteArray = Buffer.from(base64, 'base64');
      const byteaValue = `\\x${byteArray.toString('hex')}`;

      

      console.log("Byte array:")
      console.log(byteaValue)

      const test64 = new Buffer.from(byteArray).toString('base64');
      console.log("base 64 of sent image:");
      console.log(test64);
      setSentPic(test64);
      
      
      const profilepictures = {
      id: userId,
      picture1: byteaValue,
      picture2: null,
      picture3: null,
      picture4: null
      };

      console.log(profilepictures);

    axios.put(host + userId, profilepictures)
          .then((response) => {
              console.log(response.data)
          })
          .catch(error => console.log(error));
    };

    const [picture, setPicture] = useState("");

    const getPicture = () => {
            axios
                .get(host + userId)
                .then((response) => {
                    console.log(response.data)
                    const picture1 = response.data[0].picture1.data;


                    console.log("picture data");


                    const pic = new Buffer.from(picture1).toString('base64');

                    console.log(pic)

                  
                    setPicture(pic);

                })
                .catch(error => console.log(error));
        };

  return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={{
              uri: "data:image/jpeg;base64," + picture,
            }}
          />
      <Button title={"Get Picture"}
                      onPress={getPicture} color="green" />
      <Button title={"Send Picture"}
                      onPress={sendPicture} color="red" />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Image
            style={styles.image}
            source={{
              uri: "data:image/jpeg;base64," + sentPic,
            }}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
          flex: 0.5,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "flex-start",
      },
  image: {
          width: 200,
          height: 200,
          resizeMode: 'cover',
          backgroundColor: 'red',
      },
  text: {
          fontSize: 1,
  }
});