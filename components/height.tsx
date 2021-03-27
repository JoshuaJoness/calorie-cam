import React from 'react'
import { View, Text, StyleSheet, Picker, Animated, Switch } from 'react-native'
import { useFonts } from 'expo-font'
import Workout from './svgs/workout'
import CustomButton from './button'

const FEET = [
    { value: '1', label: "1'" },
    { value: '2', label: "2'" },
    { value: '3', label: "3'" },
    { value: '4', label: "4'" },
    { value: '5', label: "5'" },
    { value: '6', label: "6'" },
    { value: '7', label: "7'" },
]

const INCHES = [
    { value: '1', label: '1"' },
    { value: '2', label: '2"' },
    { value: '3', label: '3"' },
    { value: '4', label: '4"' },
    { value: '5', label: '5"' },
    { value: '6', label: '6"' },
    { value: '7', label: '7"' },
    { value: '8', label: '8"' },
    { value: '9', label: '9"' },
    { value: '10', label: '10"' },
    { value: '11', label: '11"' },
    { value: '12', label: '12"' },
]


const Height = ({ navigation }) => {
	const [feet, setFeet] = React.useState(null);
	const [inches, setInches] = React.useState(null);
	const [pounds, setPounds] = React.useState(null);
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

	// React.useEffect(() => {
	// 	if (fadeAnim === 1) {
	// 		Animated.timing(fadeAnimTwo, {
	// 			toValue: 1,
	// 			duration: 500,
	// 		}).start()
	// 	};
	//   }, [fadeAnim])

	// React.useEffect(() => {
	// 	if (gender) {
	// 		Animated.timing(fadeAnimThree, {
	// 			toValue: 1,
	// 			duration: 500,
	// 		}).start();
	// 	}
	// }, [gender])

    if (!loaded)
      return null

	return (
		<View style={styles.container}>
			<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Workout />
			</View >

			<Animated.Text style={{ ...styles.subText, opacity: fadeAnim }}>Almost there! Select your
				<Text style={styles.boldText}> height </Text>
			</Animated.Text>
            
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>  
                <Picker
					selectedValue={feet}
					style={{ height: 45, width: 100, flex: 1, marginLeft: 100 }}
					onValueChange={(itemValue, itemIndex) => setFeet(itemValue)}
				>
                    { FEET.map(({value,label}) => <Picker.Item value={value} label={label} />) }
				</Picker>

                <Picker
					selectedValue={inches}
					style={{ height: 45, width: 100, flex: 1, marginLeft: 200 }}
					onValueChange={(itemValue, itemIndex) => setInches(itemValue)}
				>
                    { INCHES.map(({value,label}) => <Picker.Item value={value} label={label} />) }
				</Picker>

            </View>

            <View style={{ marginTop: 250 }}>
                <CustomButton text='Continue' onPress={() => navigation.navigate('Weight')} disabled={!feet && !inches}/>
            </View>
 
		</View>
	)
}

export default Height

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
		textAlign: 'center'
	  },
})