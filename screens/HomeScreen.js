import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import UserCard from '../components/UserCard';
// import { Icon } from 'react-native-elements';
import { Icon } from '@rneui/themed'


export default function App() {
  return (
    
    <View style={styles.container}>
    
    <UserCard />
  
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // width: 400,
    // height: 700,
    // flex: 1,
    backgroundColor: '#fff',
    
    // height:"0%",    
  },
  
});