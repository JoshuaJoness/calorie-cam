import React from 'react';
import { View, Text, TextInput, Animated, Alert, AsyncStorage } from 'react-native';
import Birthday from './svgs/birthday';
import CustomButton from './button';
import { styles } from '../styles/global';
 

const Age = ({ navigation }) => {
	// AsyncStorage.getItem('age').then(data => setAge(data)) 
	const [age, setAge] = React.useState(null);
	// const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0.1))
	// const [fadeAnimTwo] = React.useState(new Animated.Value(0))
	// const [fadeAnimThree] = React.useState(new Animated.Value(0))

	// React.useEffect(() => {
	// 	Animated.timing(fadeAnim, {
	// 	  toValue: 1,
	// 	  duration: 500,
	// 	  useNativeDriver: false,
	// 	}).start()

	// 	setTimeout(() => {
	// 		setFadeAnim(1)
	// 	}, 1000)
	//   }, [])

	// React.useEffect(() => {
	// 	if (fadeAnim === 1) {
	// 		Animated.timing(fadeAnimTwo, {
	// 			toValue: 1,
	// 			duration: 500,
	// 			useNativeDriver: false,
	// 		}).start()
	// 	};
	//   }, [fadeAnim])

	// React.useEffect(() => {
	// 	if (age) {
	// 		Animated.timing(fadeAnimThree, {
	// 			toValue: 1,
	// 			duration: 500,
	// 			useNativeDriver: false,
	// 		}).start();
	// 	}
	// }, [age])

	return (
		<View style={styles.container}>
			<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Birthday />
			</View>
			<Text style={{ ...styles.subText, }}>Great! Let's start with your 
				<Text style={styles.boldText}> age </Text>
			</Text>
			<View style={{marginTop:'10%', marginRight:'auto'/*, alignItems: 'left'*/, width: '100%' }}>
				<TextInput 
					style={styles.ageInput} 
					value={age} 	
					maxLength={3}
					onChangeText={age => {
						const ageToNumber = Number(age);
						if (!ageToNumber && age !== '') { // TODO fix to handle empty edge case
							Alert.alert('Please enter numbers only.');
							setAge(null);
						} else {
							setAge(age)
						}
					}}
					placeholder={'24'}
				/>
			</View>
		
			{age ? <CustomButton 
					text='Continue' 
					disabled={!age}
					onPress={async () => {
						try {
							await AsyncStorage.setItem('age', age)
						} catch (err) {
							console.log(err)
						}
						navigation.navigate('Gender');
					}} 
				/>
			: null}
		</View>
	)
}

export default Age;