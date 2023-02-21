import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, FlatList } from 'react-native'
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

function Card(){

    const [Name, setName] = useState([]);
    const [Bio, setBio] = useState([]);
    const [DOB, setDOB] = useState([]);
    const [Age, setAge] = useState([]);

    const getData = () => {
      axios
          .get(`http://spotify-match.us-west-1.elasticbeanstalk.com/users/1`)
          .then((response) => {
            console.log(response["data"][0]["name"])
            setName(response["data"][0]["name"]);
            setBio(response["data"][0]["bio"]);
            setDOB(response["data"][0]["birthdate"]);
          });
  };
  useEffect(() => {
    
    getData();
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
    console.log(yearsOld)
    setAge(yearsOld)
  }

    return (
        <View style={styles.container}>


        {/* Image Container */}
        <View >
          {/* <Image source={{uri:pic4}} style={styles.image} /> */}
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

          <Text h4 style={styles.name}>
             
            {Name},
      
            {Age}
            
          </Text> 
          
                
           <View style={styles.meter}>
            <Text style={styles.percentage}>{compatibility}</Text>
          </View> 
         </View>  


        {/* -------------------------------------------------------------------- */}
        
        {/* Bio and Questions */}


        <Text style={styles.desc}>{Bio}</Text>
        <Divider style={styles.divider} />

        <Text style={styles.desc}>
          Q1
        </Text>
        
        <Divider style={styles.divider} />

        <Text style={styles.desc}>
          Q2
        </Text>

        <Divider style={styles.divider} />

        <Text style={styles.desc}>
          Q3
        </Text>

        <Divider style={styles.divider} /> 
        
        {/* -------------------------------------------------------------------- */}
        
        {/* <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View> */}
      </View>
    )
}

export default Card;


const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      borderWidth:1,
      borderColor:'#3EFF2D',
      backgroundColor:"#000000",
      margin:40,
      borderRadius:"20%"
      // height: Layout.window.height / 2,
      
    },
    imageContainer: {
      // marginVertical: 40,
      borderColor:'#3EFF2D',
      borderWidth:1,
      borderRadius:20,
      height: Layout.window.height/2-120,
      
  
    },
    flatList: {
      height: Layout.window.height/2-120,
      flexGrow: 0,
      marginBottom:5,
    },
    image: {
      width: Layout.window.width-84,
        height: Layout.window.height / 2 - 120, 
        borderRadius: 20,
    },
    name: {
      color: '#fff',
      // marginLeft:20,
      // alignSelf: 'flex-start',
      // justifyContent:'flex-end',
  
    },
     meter: {
      color: '#5E5E5E',
      fontSize: 14,
      borderRadius:'100%',
      borderColor:'#3EFF2D',
       marginLeft:20,
      borderWidth:1,
      height:80,
      width:80,
      justifyContent:'center',
      // alignItems:'flex-end',
      // alignSelf:'flex-start',
  
    },
    percentage: {
      color: '#fff',
      alignSelf: 'center',
      fontSize:24,
  
    },
    desc: {
      color: '#fff',
      alignSelf: 'flex-start',
      marginTop: 5,
      marginHorizontal: 30,
      fontSize: 20,
  
    },
    upperBox:{
      flexDirection:'row',
      alignItems:'center',
  
      },
   
    divider: {
      // backgroundColor: '#3EFF2D',
      width: Layout.window.width - 120,
      margin: 10,
      color:'#3EFF2D',
    },
    
  })
  