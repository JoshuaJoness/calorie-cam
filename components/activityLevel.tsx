import React from 'react'
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage } from 'react-native'
import { useFonts } from 'expo-font'
import Pilates from './svgs/pilates'
import CustomButton from './button'


const ACTIVITY_LEVELS = [
    { value: 'notVeryActive', label: 'Not very active' },
    { value: 'moderatelyActive', label: 'Moderately active' },
    { value: 'veryActive', label: 'Very active' },
    // { value: , label: },
    // { value: , label: },
]

const ActivityLevel = ({ navigation }) => {
	// AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data));  

	const [activityLevel, setActivityLevel] = React.useState(null);
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
				<Pilates />
			</View >

			<Animated.Text style={{ ...styles.subText, opacity: fadeAnim }}>Lastly, select your 
				<Text style={styles.boldText}> activity level </Text>
			</Animated.Text>
            
            <View>  
                <Picker
					selectedValue={activityLevel}
					style={styles.picker}
					onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}
				>
                    { ACTIVITY_LEVELS.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

            </View>

            <View style={{ marginTop: 200 }}>
                <CustomButton 
                    text='Continue' 
                    onPress={async() => {
                        try {
                            await AsyncStorage.setItem('activityLevel', activityLevel);
                        } catch (e) {
                            console.log(e)
                        }
                        navigation.navigate('Results');
                    }} 
                    disabled={!activityLevel}
                    />
            </View>
 
		</View>
	)
}

export default ActivityLevel

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
        height: 45,
        width: 200,
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
})