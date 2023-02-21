import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,FlatList } from 'react-native';
import UserCard from '../components/UserCard';
// import { Icon } from 'react-native-elements';
import { Icon } from '@rneui/themed'
import Layout from '../ constants/Layout';

export default function App() {

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
  return (
    
    <View style={styles.container}>
    {/* <UserCard/> */}
    {/* <FlatList data={users}
          renderItem={({item}) => <UserCard item ={item} 
          style={{ 
            alignItems: 'center',
            flex:1}}/>}
          horizontal
          pagingEnabled 
          snapToAlignment='center'
          showHorizontalScrollIndicator= {false}
          style = {styles.flatList}
          /> */}
    <UserCard style={{ 
                  alignItems: 'center',
                  flex:1}}/>
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
    // flex:1
    
    // height:"95%",    
  },
  flatList: {
    flatList: {
      height: Layout.window.height
    },
    flexGrow: 0,
    marginBottom:5,
  },
  
});