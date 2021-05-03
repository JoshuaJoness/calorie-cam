import React, { useContext, useEffect } from 'react';
import { View, Text, Picker, Animated, AsyncStorage } from 'react-native';
import Girl from './svgs/girl';
import CustomButton from './button';
import { styles } from '../styles/global';
import { store } from '../store';


const Gender = ({ navigation }) => {
	// AsyncStorage.getItem('gender').then(data => setGender(data));
	const globalState = useContext(store);
	const { state, dispatch } = globalState;
	const [gender, setGender] = React.useState('male');

	return (
		<View style={styles.container}>
			<View style={{ marginLeft:'auto', marginRight:'auto', marginTop: '15%' }}>
				<Girl />
			</View >

			<Animated.Text style={{ ...styles.subText }}>Next, please select a 
				<Text style={styles.boldText}> gender </Text>
			</Animated.Text>

			<View style={{ marginRight:'auto', alignItems: 'left', width: '100%' }}>
				<Picker
					selectedValue={gender}
					style={styles.genderPicker}
					onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
				>
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Female" value="female" />
				</Picker>
			</View>

			{gender ? <View style={{ marginTop: '35%' }}>
				<CustomButton 
					text='Continue'
					onPress={async() => {
						try {
							// await AsyncStorage.setItem('gender', gender)
							dispatch({ type: 'SET_GENDER', data: gender })
						} catch (err) {
							console.log(err)
						}
						navigation.navigate('Height');
					}
					} />
			</View> : null}
		</View>
	)
}

export default Gender;