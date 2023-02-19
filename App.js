import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Navigator from './components/Navigator';

export default function App() {
  return (
    
    <View style={styles.container}>
    
    <Navigator/>

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
