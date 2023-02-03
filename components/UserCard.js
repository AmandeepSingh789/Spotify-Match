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
        <View style={styles.imageContainer}>
          <Image source={{uri:pic}} style={styles.image} />
        </View>
        <Text h4 style={styles.name}>
          {title}
        </Text>
        
        <Text style={styles.desc}>Example One liner in Bio.</Text>
        <Divider style={styles.divider} />

        <Text style={styles.desc}>
          Example funniest joke ever
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.meter}>
        <Text style={styles.percentage}>{compatibility}</Text>
        </View>
        
        
        <Divider style={styles.divider} />
        
        <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth:1,
    
    // height: Layout.window.height / 2,
    
    
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'center',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'center',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,

  },
  meter: {
    color: '#5E5E5E',


    marginHorizontal: 30,
    fontSize: 14,
    borderRadius:'100%',
    borderWidth:1,
    height:100,
    width:100,
    justifyContent:'center',
    alignItems:'center'

  },
  percentage: {
    color: '#5E5E5E',
    alignSelf: 'center',
    fontSize:40,

  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: Layout.window.width - 60,
    margin: 10,
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