import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import EatingImage from './animatedEating'
import CustomButton from './button'

const GetStarted = () => {
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
            <EatingImage />
            <Text style={styles.text}>Welcome to Calorie Cam!</Text>
            <Text style={styles.subText}>
                To begin, we just need to ask you a few questions which well help us tailor your weight loss journey.
            </Text>
            <CustomButton text='Get Started' />
        </View>
    )
}

export default GetStarted

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
})