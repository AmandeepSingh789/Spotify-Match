import React from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Divider, Icon, Text } from '@rneui/themed'
import Layout from '../ constants/Layout'
import { useState } from 'react'

const pic = 'https://picsum.photos/id/237/1080'
const title = 'Example Name, Age'
const compatibility = '80%'

function Card(){

    // const [data, setData] = useState([]);
// const getName = async () => {
//   try {
//     const response = await fetch(
//       'http://spotify-match.us-west-1.elasticbeanstalk.com/users',
//     );
//     const json = await response.json();
//     console.log(json)
//   } catch (error) {
//     console.error(error);
//   }
// };

    return (
        <View style={styles.container}>


        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{uri:pic}} style={styles.image} />
        </View> 

{/* -------------------------------------------------------------------- */}

        {/* Box with Name,Age and Meter*/}
        <View style={styles.upperBox}>

          <Text h4 style={styles.name}>
            {title}
          </Text>
                
          <View style={styles.meter}>
            <Text style={styles.percentage}>{compatibility}</Text>
          </View>
        </View>


        {/* -------------------------------------------------------------------- */}
        
        {/* Bio and Questions */}


        <Text style={styles.desc}>Example One liner in Bio.</Text>
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
      // margin:20,
      borderRadius:"20%",
      marginBottom:30, 
      // marginLeft:5,
      // marginRight:5,
      // marginTop:30,
      // width: "80%",
      // height: "90%",
      justifyContent:'center',
      // height: Layout.window.height / 1,
      // width: Layout.window.width,
    },
    imageContainer: {
      marginVertical: 20,
      borderColor:'#3EFF2D',
      borderWidth:1,
      borderRadius:20,
    },
    image: {
      width: Layout.window.width - 120, 
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
      // color:"#000000",
    },
    
  })