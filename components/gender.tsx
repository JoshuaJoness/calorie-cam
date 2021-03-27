import React from 'react'
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage } from 'react-native'
import { useFonts } from 'expo-font'
import Girl from './svgs/girl'
import CustomButton from './button'


const Gender = ({ navigation }) => {
	const [gender, setGender] = React.useState(null);
	const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0.1))
	const [fadeAnimTwo] = React.useState(new Animated.Value(0))
	const [fadeAnimThree] = React.useState(new Animated.Value(0))

    const [loaded] = useFonts({
		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
		MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
	  })

	React.useEffect(() => {
		Animated.timing(fadeAnim, {
		  toValue: 1,
		  duration: 500,
		}).start()

		setTimeout(() => {
			setFadeAnim(1)
		}, 1000)
	  }, [])

	React.useEffect(() => {
		if (fadeAnim === 1) {
			Animated.timing(fadeAnimTwo, {
				toValue: 1,
				duration: 500,
			}).start()
		};
	  }, [fadeAnim])

	React.useEffect(() => {
		if (gender) {
			Animated.timing(fadeAnimThree, {
				toValue: 1,
				duration: 500,
			}).start();
		}
	}, [gender])

    if (!loaded)
      return null

	return (
		<View style={styles.container}>
			<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Girl />
			</View >

			<Animated.Text style={{ ...styles.subText, opacity: fadeAnim }}>Next, please select a 
				<Text style={styles.boldText}> gender </Text>
			</Animated.Text>

			<Animated.View style={{ marginRight:'auto', alignItems: 'left', width: '100%', opacity: fadeAnimTwo }}>
				<Picker
					selectedValue={gender}
					style={styles.picker}
					onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
				>
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Female" value="female" />
				</Picker>
			</Animated.View>

			<View style={{ marginTop: '35%' }}>
				<CustomButton 
					text='Continue'
					onPress={async() => {
						try {
							await AsyncStorage.setItem('gender', gender)
						} catch (err) {
							console.log(err)
						}
						navigation.navigate('Height');
					}
					} />
			</View> 
		</View>
	)
}

export default Gender

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: '5%'
	},
	imgender: {
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
	picker: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderRadius: 4,
        height: 45,
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
})