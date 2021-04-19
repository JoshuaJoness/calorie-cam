import React from 'react'
import { View, Text, StyleSheet, TextInput, Animated, AsyncStorage, Alert } from 'react-native'
import { useFonts } from 'expo-font'
import Pushup from './svgs/pushup'
import CustomButton from './button'


const Weight = ({ navigation }) => {
	// AsyncStorage.getItem('weight').then(data => setWeight(data)) 
	const [weight, setWeight] = React.useState(null);
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
		  useNativeDriver: false,
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
				<Pushup />
			</View >

			<Animated.Text style={{ ...styles.subText, opacity: fadeAnim }}>Enter your
				<Text style={styles.boldText}> weight (lbs) </Text>
			</Animated.Text>
            
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>  
                <TextInput 
                        style={styles.input} 
                        value={weight} 
                        onChangeText={weight => {
                            const weightToNumber = Number(weight);
                            if (!weightToNumber && weight !== '') {
                                Alert.alert('Please enter numbers only.');
                                setWeight(null);
                            } else {
                                setWeight(weight)
                            }
                        }}
                        placeholder={'180lbs'}
                    />
                </View>
            {weight ? <View style={{ marginTop: 50 }}>
                <CustomButton 
                    text='Continue' 
                    onPress={async () => {
                        try {
                            await AsyncStorage.setItem('weight', weight);
                        } catch (err) {
                            console.log(err)
                        }
                        navigation.navigate('ActivityLevel');
                    }} 
                    disabled={!weight}/>
            </View> : null}
 
		</View>
	)
}

export default Weight

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