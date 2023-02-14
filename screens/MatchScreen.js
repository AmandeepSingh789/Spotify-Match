import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import * as React from "react";
import { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const matches = [
  {
    id: "1",
    uri: "https://i.pinimg.com/originals/b2/86/a6/b286a65bfc482ebc7b3138dbb6568b37.jpg",
    name: "Mrin",
  },
  {
    id: "2",
    uri: "https://i.pinimg.com/originals/cc/7a/8f/cc7a8fa84c296ac4de2a227a92324a77.jpg",
    name: "Rami",
  },
  {
    id: "3",
    uri: "https://i.pinimg.com/originals/99/63/78/996378defcb190e5e0d067e2d3c62477.jpg",
    name: "Cal",
  },
  {
    id: "4",
    uri: "https://i.pinimg.com/originals/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg",
    name: "Amandeep",
  },
  {
    id: "5",
    uri: "https://i.pinimg.com/originals/94/25/2b/94252bec792f63f96e1e481ee0cd2669.jpg",
    name: "Amaan",
  }
];

const messages = [
  {
    id: "1",
    uri: "https://i.pinimg.com/originals/e4/18/e2/e418e22729bd7a202c563e08463b6ad9.jpg",
    name: "Jane Doe",
    text: "do you play the guitar?",
  },
  {
    id: "2",
    uri: "https://i.pinimg.com/564x/eb/ae/2f/ebae2fd689ea2196625491b719a855eb.jpg",
    name: "Deer Doe",
    text: "btw whats your insta?",
  },
  {
    id: "3",
    uri: "https://i.pinimg.com/originals/ad/81/eb/ad81ebb84107d9fc10a7e1c335d4c823.jpg",
    name: "Doe Doe",
    text: "no way i like that song 2!",
  },
  {
    id: "4",
    uri: "https://i.pinimg.com/originals/ad/81/eb/ad81ebb84107d9fc10a7e1c335d4c823.jpg",
    name: "Doe Doe",
    text: "no way i like that song 2!",
  },
];

const NewMatches = ({ uri }) => {
  const navigation = useNavigation();

  return (
    <>
      <LinearGradient
        colors={["#B9DD5C", "#8C0C58"]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.matchProfile}
      >
        <Pressable onPress={() => navigation.navigate("ChatScreen")}>
            
          <Image
            source={{
              uri,
            }}
            style={styles.profilePic}
          />

        </Pressable>
      </LinearGradient>
    </>
  );
};

const CurrMessages = ({ uri, name, text }) => {
  const navigation = useNavigation();
  return (
    <>
    <View style={{flex: 1}}>
      <Pressable onPress={() => navigation.navigate("ChatScreen")}>

        <View style={styles.messageContainer}>

          <View style={styles.messageProfile}>
            <Image
              source={{
                uri,
              }}
              style={styles.profilePic}
            />
          </View>

          <View style={styles.ProfileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>

        </View>

      </Pressable>

      <Divider
        style={{ marginTop: 15, marginBottom: 15 }}
        orientation="horizontal"
        color="white"
      />
    </View>
    </>
  );
};

const MatchScreen = () => {
  // const [screenHeight, setScreenHeight] = React.useState(0);
  // const {height} = Dimensions.get('window');

  // const onContentSizeChange = (contentWidth, contentHeight) => {
  //     setScreenHeight(contentHeight);
  // };

  // const scrollEnabled = screenHeight > height;

  const scrollViewRef = useRef(null);

  return (
    <View style={styles.container}>

      <SafeAreaView>

        <Text style={styles.header}>Matches</Text>

        <Text style={styles.numMatches}>
          You have {matches.length} new matches!
        </Text>

        <View style={{ alignSelf: "flex-start"}}>
          <Text style={styles.desc}>New Matches</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0}}
        >
          <View style={styles.storyContainer}>
            {matches.map(({ id, uri, name }) => (
              <>
                <View style={{ flexDirection: "column"}}>
                  <NewMatches key={id} uri={uri} />
                  <Text style={styles.matchName}> {name} </Text>
                </View>
              </>
            ))}
          </View>
        </ScrollView>

        <View style={{ alignSelf: "flex-start"}}>
            <Text style={styles.desc}>Messages</Text>
        </View>

        </SafeAreaView>

        <View>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                style={{height: '100%', width: '100%'}}
                // ref={scrollViewRef} 
                // onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
                // contentInset={{bottom: 40}}
            >
                {messages.map(({ id, uri, name, text }) => (
                    <CurrMessages key={id} uri={uri} name={name} text={text} />
                ))}
            </ScrollView>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },

  header: {
    fontSize: 40,
    color: "white",
    marginTop: 0,
    fontWeight: "bold",
    alignSelf: "center",
  },

  numMatches: {
    fontSize: 20,
    color: "#FE8AE3",
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },

  desc: {
    fontSize: 20,
    color: "#3EFF2D",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },

  storyContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },

  matchProfile: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderWidth: 2,
    padding: 2,
    overflow: "hidden",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 90 / 2,
    borderColor: "black",
    borderWidth: 3,
  },

  matchName: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    marginRight: 15,
  },

  messageContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    flex: 1
  },

  messageProfile: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  ProfileInfo: {
    marginLeft: 15,
    flex: 1
  },

  name: {
    color: "#FE8AE3",
    fontSize: "20",
    fontWeight: "bold",
    marginBottom: 7,
  },

  text: {
    color: "#ABABAB",
    fontSize: "15",
    fontWeight: "bold",
  },
});

export default MatchScreen;
