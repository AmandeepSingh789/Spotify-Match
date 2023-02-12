import * as React from 'react';
import { View, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Icon } from '@rneui/themed'

export default function MatchesScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Matches Screen</Text>
        
        </View>           
        );
}