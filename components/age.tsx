import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Animated, Alert, AsyncStorage } from 'react-native'
import { useFonts } from 'expo-font'
import Birthday from './svgs/birthday'
import CustomButton from './button'
import { store } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Age = ({ navigation }) => {
	const globalState = useContext(store);

	React.useEffect(() => {
		console.log(globalState)
	}, [globalState])

	const { dispatch } = globalState;
	const [age, setAge] = React.useState(null);
	const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0.1))
	const [fadeAnimTwo] = React.useState(new Animated.Value(0))
	const [fadeAnimThree] = React.useState(new Animated.Value(0))

    const [loaded] = useFonts({
		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
		MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
	})

	// AsyncStorage.getItem('age').then(data => setAge(data))

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
		if (age) {
			Animated.timing(fadeAnimThree, {
				toValue: 1,
				duration: 500
			}).start();
		}
	}, [age])

    if (!loaded)
      return null

	return (
		<View style={styles.container}>
				<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Birthday />
			</View>
			<Text style={{ ...styles.subText, }}>Great! Let's start with your 
				<Text style={styles.boldText}> age </Text>
			</Text>
			<View style={{marginTop:'10%', marginRight:'auto', alignItems: 'left', width: '100%' }}>
				<TextInput 
					style={styles.input} 
					value={age} 
					// keyboardType='number-pad'
					onSubmitEditing={() => dispatch({ type: 'SET_AGE', data: age })}
					maxLength={3}
					onChangeText={age => {
						console.log(age, 'AGE')
						const ageToNumber = Number(age);
						if (!ageToNumber && age !== '') {
							Alert.alert('Please enter numbers only.');
							setAge(null);
						} else {
							setAge(age)
						}
					}}
					placeholder={'24'}
				/>
			</View>

			<Animated.View style={{ marginTop: '5%', opacity: fadeAnimThree }}>
				<CustomButton 
					text='Continue' 
					disabled={!age}
					onPress={async () => {
						try {
							await AsyncStorage.setItem('age', age)
						} catch (err) {
							console.log(err)
						}
						
						dispatch({ type: 'SET_AGE', data: age });
						navigation.navigate('Gender');
					}} 
				/>
			</Animated.View> 
		</View>
	)
}

export default Age

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: '5%'
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