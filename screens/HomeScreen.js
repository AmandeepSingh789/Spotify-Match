import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,Dimensions, Image} from 'react-native';
import UserCard from '../components/UserCard';
// import { Icon } from 'react-native-elements';
import { Icon } from '@rneui/themed'
import Layout from '../ constants/Layout';

import CardsSwipe from 'react-native-cards-swipe';

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
// const pics = [
//   {
//     id:1,
//     url:'https://picsum.photos/id/23/1080'
//   },
//   {
//     id:2,
//     url:'https://picsum.photos/id/10/1080'
//   },
//   {
//     id:3,
//     url:'https://picsum.photos/id/11/1080'
//   },
//   {
//     id:4,
//     url:'https://picsum.photos/id/12/1080'
//   },

// ]

export default function App() {


  return (
    
    <View style={styles.container}>
    {/* <UserCard/> */}
    {/* <FlatList data={users}
          renderItem={({item}) => <UserCard item ={item} 
          style={{ 
            alignItems: 'center',
            flex:1}}/>}
          
          pagingEnabled 
          snapToAlignment='center'
          showHorizontalScrollIndicator= {false}
          style = {styles.flatList}
          /> */}

  
  <CardsSwipe
        cards={users}
        cardContainerStyle={styles.cardContainer}
        renderCard={(card) => (
          <View >
            
            <UserCard />
          </View>
          
          )}
          />

 


    <View style={{ justifyContent: 'space-between',
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
            onPress={() => console.log('dislike')} 
            />

            <Icon
            reverse
            name='heart'
            type='ionicon'
            color='#517fa4'
            onPress={() => console.log('like')}
            />
        </View>
  
    </View>

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
  
});