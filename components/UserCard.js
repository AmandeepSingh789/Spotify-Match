import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, FlatList,ScrollView } from 'react-native'
import { Divider, Icon, Text } from '@rneui/themed'
import Layout from '../ constants/Layout'
import { useEffect,useState, } from 'react'
import axios from "axios"
import {Buffer} from 'buffer';


const compatibility='80%'

// Card component that displays user information
function Card({id}){
  
// State variables to store user data
    const [Name, setName] = useState([]);
    const [Bio, setBio] = useState([]);
    const [Age, setAge] = useState([]);
    const [Answer1, setAnswer1] = useState([]);
    const [Answer2, setAnswer2] = useState([]);
    const [Answer3, setAnswer3] = useState([]);
    const [Q1, setQ1] = useState([]);
    const [Q2, setQ2] = useState([]);
    const [Q3, setQ3] = useState([]);
    const [Q1id, setQ1id] = useState([]);
    const [Q2id, setQ2id] = useState([]);
    const [Q3id, setQ3id] = useState([]);
    const [pic1,setPic1] = useState({});
    const [pic2,setPic2] = useState([]);
    const [pic3,setPic3] = useState([]);
    const [pic4,setPic4] = useState([]);
    const [loaded, setLoaded] = useState(false);

// Array of pictures
const pics = [
  {
    id:1,
    uri:'data:image/jpeg;base64,'+ pic1,

  },
  {
    id:2,
    uri:'data:image/jpeg;base64,'+ pic2,
  },
  {
    id:3,
    uri:'data:image/jpeg;base64,'+ pic3,
  },
  {
    id:4,
    uri:'data:image/jpeg;base64,'+ pic4,
  },

]

 // Function to get user data from the server
    const getData = async ({id}) => {
      await axios
          .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/users/${id}`)
          .then((response) => {
            console.log(id);
            setName(response ["data"] ["name"]);
            setBio(response["data"]["bio"]);
            setAnswer1(response["data"]["answer1"])
            setAnswer2(response["data"]["answer2"])
            setAnswer3(response["data"]["answer3"])
            setQ1id(response["data"]["questionid1"])
            setQ2id(response["data"]["questionid2"] )
            setQ3id(response["data"]["questionid3"])
            getAge(response["data"]["birthdate"])

            // Convert profile pictures to base64
            const pic1Data= (response["data"] ["profilepictures"]["picture1"]["data"])
            const pic1Conversion = new Buffer.from(pic1Data).toString('base64')

            const pic2Data= (response["data"]["profilepictures"]["picture2"]["data"])
            const pic2Conversion = new Buffer.from(pic2Data).toString('base64')

            const pic3Data= (response["data"]["profilepictures"]["picture3"]["data"])
            const pic3Conversion = new Buffer.from(pic3Data).toString('base64')

            const pic4Data= (response["data"]["profilepictures"]["picture4"]["data"])
            const pic4Conversion = new Buffer.from(pic4Data).toString('base64')

            // Store profile pictures in state
            setPic1(pic1Conversion)
            setPic2(pic2Conversion)
            setPic3(pic3Conversion)
            setPic4(pic4Conversion)
            getQuestions()

          }).catch((error) => {
            // Handle any errors that occur
            console.error(error);
        });

  };

  // Function to get question data from the server
  const getQuestions = async () => {
    await axios
        .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/profilequestions/`)
        .then((response) => {

          // Store questions in state
          setQ1(response["data"][Q1id]["questiontext"])
          setQ2(response["data"][Q2id]["questiontext"])
          setQ3(response["data"][Q3id]["questiontext"])
          setLoaded(true);
        }).catch((error) => {
          // Handle any errors that occur
          console.error(error);
      });

};


//  Using the Axios library to make HTTP requests to retrieve data from a server.
// Specifically, it makes two requests using the axios.all() method to fetch data based on an id and questions.
// Once the requests are complete, it uses the axios.spread() method to access the response data.
  axios.all([getData({id}), getQuestions()])
  .then(axios.spread(function (data, questions) {
    getData({id});

}));

  useEffect(() => {
    console.log("loaded", loaded);
  }, []); 


  // Flatlist Image Item
  const Item = ({item}) => (

    <View style={styles.imageContainer}>
      {/* <Image source={{uri:"data:image/jpeg;base64,"+ `${pic2}`}}
      resizeMode="cover"
      style={styles.image} 
       /> */}

       <Image source={{uri:item.uri}}
      resizeMode="contain"
      style={styles.image} 
       />
       
    </View>

  );

  // Function to get age from DOB
  const getAge =(DOB) =>{
    var date = new Date(DOB)
    let today = new Date()

    var distance = date.getTime() - today.getTime()
    var daysOld =  Math.floor(distance / (1000*60*60 *24));
    var yearsOld = (Math.abs((daysOld/365).toFixed(0)))
    yearsOld.toString()
    setAge(yearsOld)
  }

    return (

        <View style={styles.container}>
        <ScrollView>
        {/* Image Container */}
        <View >
        {/* <Image source={{uri:"data:image/jpeg;base64,"+ pic1}}
      resizeMode="cover"
      style={styles.image} 
       /> */}
          <FlatList data={pics}
          renderItem={({item}) => <Item item ={item} />}
          horizontal
          pagingEnabled 
          snapToAlignment='center'
          showHorizontalScrollIndicator= {false}
          style = {styles.flatList}
          />
        </View> 

{/* -------------------------------------------------------------------- */}

        {/* Box with Name,Age and Meter*/}
         <View style={styles.upperBox}>

          <Text style={styles.name}>
             {`${Name}, ${Age}`}
            
             {/* Name, Age  */}
            
          </Text>
             
           <View style={styles.meter}>
             
            <Text style={styles.percentage}>{compatibility}</Text>
          </View> 
         </View>  


        {/* -------------------------------------------------------------------- */}
        
        {loaded ? <><View >
        <Text style={styles.bio}>
          {Bio}          
          </Text>
      
        </View>
        <Divider style={styles.divider} />
        
        <View >
        <Text style={styles.desc}>

        {`Q: ${Q1}`}
        </Text>
        </View>

        <View >
        <Text style={styles.desc}>

        {`A: ${Answer1}`}
        </Text>
        </View>
        <Divider style={styles.divider} />

        <View >
        <Text style={styles.desc}>

        {`Q: ${Q2}`}
        </Text>
        </View>

        <View >
        <Text style={styles.desc}>

        {`A: ${Answer2}`}
        </Text>
        </View>
        
        <Divider style={styles.divider} />
        <View >
        <Text style={styles.desc}>

        {`Q: ${Q3}`}
        </Text>
        </View>

        <View >
        <Text style={styles.desc}>

        {`A: ${Answer3}`}
        </Text>
        </View></>: null}
        {/* Bio and Questions */}
        
        

        <Divider style={styles.divider} /> 
        </ScrollView>
        {/* -------------------------------------------------------------------- */}
        
        
      </View>
    )
}

export default Card;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      borderWidth:1,
      borderColor:'#3EFF2D',
      backgroundColor:"#000000",
      marginHorizontal:40,
      marginTop:20,
      marginBottom:40,

      borderRadius:"20%"
      
    },
    imageContainer: {
      borderColor:'#3EFF2D',
      borderWidth:1,
      borderRadius:20,
      height: Layout.window.height/2-120,
      marginBottom:20,
    },
    flatList: {
      height: Layout.window.height/2-120,
      flexGrow: 0,
      marginBottom:15,
    },
    image: {
      width: Layout.window.width-84,
        height: Layout.window.height / 2 - 120, 
        borderRadius: 20,
        marginBottom:20,
    },
    upperBox:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
  
      },
    name: {
      color: '#fff',
      fontSize:28,
    },
     meter: {
      color: '#5E5E5E',
      fontSize:34,
      borderRadius:'100%',
      borderColor:'#3EFF2D',
       marginLeft:20,
      borderWidth:1,
      height:90,
      width:90,
      justifyContent:'center',
    },
    percentage: {
      color: '#fff',
      alignSelf: 'center',
      fontSize:30,
  
    },
    desc: {
      color: '#fff',
      alignSelf: 'flex-start',
      marginTop: 5,
      marginHorizontal: 30,
      fontSize: 20,
      flexShrink: 1,
      justifyContent:'center',
      alignContent:"center",
      
    },
    bio: {
      color: '#fff',
      alignSelf: 'center',
      marginTop: 5,
      marginHorizontal: 30,
      fontSize: 20,
      flexShrink: 1,
    },
   
    divider: {
      width: Layout.window.width - 120,
      margin: 10,
      alignSelf: 'center',
    },
    
  })