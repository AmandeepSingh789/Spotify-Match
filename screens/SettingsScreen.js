import * as React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@rneui/themed'

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Settings Screen</Text>
             <View style={{ justifyContent: 'space-between', alignItems: 'flex-end',
                        flexDirection: 'row', paddingHorizontal: '15%', }}>
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