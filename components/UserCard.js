import React from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Divider, Icon, Text } from '@rneui/themed'
import Layout from '../ constants/Layout'


const pic = 'https://picsum.photos/id/237/1080'
const title ='Example Name, Age'
const compatibility='80%'

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
)

class UserCard extends React.Component {

  render() {
    return (

      <SafeAreaView style={styles.container}>


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
        
        {/* -------------------------------------------------------------------- */}
        
        {/* <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth:1,
    backgroundColor:"#000000",
    
    
    // height: Layout.window.height / 2,
    
    
  },
  imageContainer: {
    margin: 20,
    borderColor:'#3EFF2D',
    borderWidth:1,
    borderRadius:20,

  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#fff',
    // alignSelf: 'flex-start',
    // justifyContent:'flex-end',
    

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
  meter: {
    color: '#5E5E5E',
    fontSize: 14,
    borderRadius:'100%',
    borderColor:'#3EFF2D',
    marginLeft:"20%",
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
  divider: {
    backgroundColor: '#3EFF2D',
    width: Layout.window.width - 60,
    margin: 10,
    color:'#3EFF2D',
  },
  socialLinks: {
    flex: 1,

    justifyContent:'center',
    flexDirection: 'row',
    width: Layout.window.width,
    
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
})

export default UserCard