import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, FlatList,ScrollView } from 'react-native'
import { Divider, Icon, Text } from '@rneui/themed'
import Layout from '../ constants/Layout'
import { useEffect,useState } from 'react'
import axios from "axios"

const pics = [
  {
    id:1,
    url:'https://picsum.photos/id/237/1080'
  },
  {
    id:2,
    url:'https://picsum.photos/id/10/1080'
  },
  {
    id:3,
    url:'https://picsum.photos/id/11/1080'
  },
  {
    id:4,
    url:'https://picsum.photos/id/12/1080'
  },

]
const title =('Example Name, Age')
const compatibility='80%'

function Card({id}){

    const [Name, setName] = useState([]);
    const [Bio, setBio] = useState([]);
    const [DOB, setDOB] = useState([]);
    const [Age, setAge] = useState([]);
    const [Answer1, setAnswer1] = useState([]);
    const [Answer2, setAnswer2] = useState([]);
    const [Answer3, setAnswer3] = useState([]);
    const [Q1, setQ1] = useState([]);
    const [Q2, setQ2] = useState([]);
    const [Q3, setQ3] = useState([]);

    const getData = ({id}) => {
      axios
          .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/users/${id}`)
          .then((response) => {
            // console.log(response["data"][0]["name"])
            setName(response["data"][0]["name"]);
            setBio(response["data"][0]["bio"]);
            setDOB(response["data"][0]["birthdate"])
            setAnswer1(response["data"][0]["answer1"])
            setAnswer2(response["data"][0]["answer2"])
            setAnswer3(response["data"][0]["answer3"])
            setQ1(response["data"][0]["questionid1"])
            setQ2(response["data"][0]["questionid2"])
            setQ3(response["data"][0]["questionid3"])
            
            // console.log(Name)
            // console.log(Bio)
            // console.log(DOB)
            
          });
  };

  useEffect(() => {

    getData({id});
    getAge(DOB);
    
    
  }, []);


  const Item = ({item}) => (
    
    <View style={styles.imageContainer}>
      <Image source={{uri: item.url}}
      resizeMode="contain"
      style={styles.image} 
       />
       
    </View>

  );
  const getAge =(DOB) =>{
    var date = new Date(DOB)
    let today = new Date()

    var distance = date.getTime() - today.getTime()
    var daysOld =  Math.floor(distance / (1000*60*60 *24));
    var yearsOld = (Math.abs((daysOld/365).toFixed(0)))
    yearsOld.toString()
    // console.log(yearsOld)
    setAge(yearsOld)
  }

    return (
        <View style={styles.container}>

        <ScrollView>
        {/* Image Container */}
        <View >
          {/* <Image source={{uri:'https://picsum.photos/id/237/1080'}} style={styles.image} /> */}
          <FlatList data={pics}
          renderItem={({item}) => <Item item ={item}/>}
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
        
        
        {/* Bio and Questions */}
        <View >
        <Text style={styles.bio}>
          {Bio}          
          </Text>
      
        </View>
        <Divider style={styles.divider} />
        
        <View >
        <Text style={styles.desc}>
        {`${Q1}: ${Answer1}`}
        </Text>
        </View>
        
        <Divider style={styles.divider} />

        <View >
        <Text style={styles.desc}>
        {`${Q2}: ${Answer2}`}
        </Text>
        </View>
        
        
        <Divider style={styles.divider} />
        <View 
        >
        <Text style={styles.desc}>
        {`${Q3}: ${Answer3}`}
        </Text>
        </View>
        

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
  