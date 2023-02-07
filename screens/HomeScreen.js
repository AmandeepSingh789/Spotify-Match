import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import UserCard from '../components/UserCard';

export default function App() {
  return (
    
    <View style={styles.container}>
    
    <UserCard />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    // height:"0%",    
  },
  
});