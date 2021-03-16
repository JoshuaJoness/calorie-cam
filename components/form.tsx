import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, Animated } from 'react-native'
import { useFonts } from 'expo-font'
import Birthday from './birthday'
import CustomButton from './button'
import FormTwo from './formTwo'

const Form = ({ navigation }) => {
	const [age, setAge] = React.useState(null);
	const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0.1))
	const [fadeAnimTwo] = React.useState(new Animated.Value(0))



    const [loaded] = useFonts({
		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
		MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
	  })

	React.useEffect(() => {
		Animated.timing(fadeAnim, {
		  toValue: 1,
		  duration: 1500,
		}).start()

		setTimeout(() => {
			setFadeAnim(1)
		}, 1000)
	  }, [])

	React.useEffect(() => {
		if (fadeAnim === 1) {
			Animated.timing(fadeAnimTwo, {
				toValue: 1,
				duration: 1000,
			}).start()
		};
	  }, [fadeAnim])

    if (!loaded)
      return null

	if (!age) {
		return (
			<View style={styles.container}>
				  <View style={{marginLeft:'auto', marginRight:'auto'}}>
					<Birthday />
				</View >
				<Animated.Text style={{...styles.subText, opacity: fadeAnim}}>Great! Let's start with your 
					<Text style={styles.boldText}> age </Text>
				</Animated.Text>
				<Animated.View style={{marginTop:'10%', marginRight:'auto', alignItems: 'left', width: '100%', opacity: fadeAnimTwo}}>
					<TextInput 
						style={styles.input} 
						value={age} 
						onSubmitEditing={(age) => setAge(age)}
						  placeholder={'24'}
					/>
				</Animated.View>
	
				{/* <CustomButton text='Continue' onPress={() => navigation.navigate('FormTwo')} /> */}
			</View>
		)
	} else {
		return (
			<FormTwo />
		)
	}

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
    },
	input: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderBottomColor: '#6B705C',
		borderBottomWidth: 2,
		borderRadius: 4,
        height: 45,
        width: 200,
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
})