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

        <View style={{ justifyContent: 'space-between', alignItems: 'center',
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

// import React from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { func, string } from 'prop-types'
// import Icon from 'react-native-vector-icons/AntDesign'


// const IconButton = ({ onPress, name, backgroundColor, color }) => (
//   <TouchableOpacity
//     style={[styles.singleButton, { backgroundColor }]}
//     onPress={onPress}
//     activeOpacity={0.85}
//   >
//     <Icon
//       name={name}
//       size={20}
//       color={color}
//     />
//   </TouchableOpacity>
// )
// IconButton.defaultProps = {
//   color: '#fff',
//   backgroundColor: '#3CA3FF',
// }
// IconButton.propTypes = {
//   onPress: func.isRequired,
//   name: string.isRequired,
//   color: string,
//   backgroundColor: string,
// }

// const styles = StyleSheet.create({
//     singleButton: {
//         backgroundColor: 'transparent',
//         borderRadius: 50,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: 'black',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowRadius: 6,
//         shadowOpacity: 0.3,
//         elevation: 2,
//         padding: 15,
//       },
//     buttonsContainer: {
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'row',
//         paddingHorizontal: '15%',
//       },  
// });

// export default IconButton