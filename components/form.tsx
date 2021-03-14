import React from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import { useFonts } from 'expo-font'
import StatsImage from './stats'

const Form = () => {
    const [loaded] = useFonts({
		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
		MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
	  })

    if (!loaded)
      return null

    return (
        <View style={styles.container}>
            <View style={{marginLeft:'auto', marginRight:'auto'}}>
                <StatsImage />
            </View >
            <Text style={styles.subText}>First, please enter your 
                <Text style={styles.boldText}> age, </Text>
                <Text style={styles.boldText}> weight, </Text>
                and 
                <Text style={styles.boldText}> gender.</Text>
            </Text>
            <View style={{marginTop:'10%', marginRight:'auto', alignItems: 'left'}}>
                <TextInput style={styles.boldText}>Age: </TextInput>
                <TextInput style={styles.boldText}>Gender: </TextInput>
                <TextInput style={styles.boldText}>Weight: </TextInput>
            </View>
        </View>
    )
}

export default Form

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: '20%'
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',

	},
	text: {
		fontFamily: 'Pacifico',
		color: '#6b705c',
		fontSize: 35,
		paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
	},
    subText: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 25,
        marginTop: '5%',
        paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
	},
    boldText: {
        fontFamily: 'MontserratMedium',
		color: '#6b705c',
		fontSize: 25,
        marginTop: '5%',
        paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
    }
})