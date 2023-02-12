import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import UserCard from '../components/UserCard';
// import { Icon } from 'react-native-elements';
import { Icon } from '@rneui/themed'


export default function App() {
  return (
    
    <View style={styles.container}>
    <UserCard/>
    {/* <UserCard style={{ 
                  alignItems: 'center',
                  flex:1}}/> */}
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
  
});