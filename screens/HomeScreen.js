import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, SafeAreaView} from 'react-native';
import UserCard from '../components/UserCard';
import { Icon } from '@rneui/themed';
import Layout from '../ constants/Layout';
import { useRef,useState,useEffect} from 'react';
import CardsSwipe from 'react-native-cards-swipe';
import axios from "axios";

const users=[
  {
  id:1
},
{
  id:2
},
{
  id:3
},
{
  id:4
},
]

// const ex_id= "0000000000000000000000"

export default function App() {
  const [Matches, setMatches] = useState([]);
  const [numMatches, setNumMatches] = useState([]);

  const getMatches= () => {
    axios
        .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/home/1`)
        .then((response) => {
          
          setNumMatches(response ["data"])
          setMatches(response ["data"][0]["id"])
          // console.log(response["data"]);
          console.log(Matches);

          // Gives 6 for now for response.length
          
        });
  };
  useEffect(() => {

    getMatches();     
  }, []);
  
  return (
    
    <SafeAreaView style={styles.container}>
  
  <CardsSwipe
        cards={numMatches}
        cardContainerStyle={styles.cardContainer}
        loop={false}
        // renderYep
        // renderNope
        renderNoMoreCard={() => (
          <View >
            <Text style={styles.noMorePeople}>{'Check Again Soon!'}</Text>
          </View>
        )}
        onSwipedLeft ={()=>(
          console.log("dislike")
        )}
        onSwipedRight ={()=>(
          console.log("like")
        )}
        
        renderYep={() => (
          <View style={styles.like}>
            <Text style={styles.likeLabel}>YEP</Text>
          </View>
        )}
        
        renderNope={() => (
          <View style={styles.nope}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </View>
        )}

        renderCard={(card) => (
          <View >
            
            <UserCard id={ Matches}/>
          </View>
          
          )}
          />


    {/* <View style={{ justifyContent: 'space-between',
                   alignItems: 'center',
                        flexDirection: 'row', 
                        paddingVertical: '1%',
                        paddingHorizontal: '7%', 
                        positon: 'absolute',
                        bottom: 27}}>
            <Icon
            raised
            name='times'
            type='font-awesome'
            color='#f50'
            />
            <Icon
            reverse
            name='heart'
            type='ionicon'
            color='#517fa4'
            />
        </View>
   */}
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    // width: 400,
    // height: 700,
    // flex: 1,
    backgroundColor: '#fffff',
    // alignItems: 'center',
    flex:1
    
    // height:"95%",    
  },
  flatList: {
    flatList: {
      height: Layout.window.height -80
    },
    flexGrow: 0,
    // marginBottom:5,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  noMorePeople: {
    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#FF2DB6',
    fontWeight: 'bold',
    fontSize:44,
    fontFamily:'Baskerville-SemiBold',
    
  },
  like: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginLeft: 30,
    marginTop: 20,
    borderColor: 'lightgreen',
    transform: [{ rotateZ: '-22deg' }],
  },
  likeLabel: {
    fontSize: 100,
    color: '#3EFF2D',
    fontWeight: 'bold',
  },
  nope: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginRight: 30,
    marginTop: 25,
    borderColor: 'red',
    transform: [{ rotateZ: '22deg' }],
  },
  nopeLabel: {
    fontSize: 100,
    color: 'red',
    fontWeight: 'bold',
  },
});