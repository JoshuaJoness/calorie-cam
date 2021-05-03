import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage, Dimensions, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import Workout from './svgs/workout';
import CustomButton from './button';
import { styles } from '../styles/global';
import { store } from '../store';

const windowHeight = Dimensions.get('window').height;


const FEET = [
    { value: 1, label: "1'" },
    { value: 2, label: "2'" },
    { value: 3, label: "3'" },
    { value: 4, label: "4'" },
    { value: 5, label: "5'" },
    { value: 6, label: "6'" },
    { value: 7, label: "7'" },
]

const INCHES = [
    { value: 1, label: '1"' },
    { value: 2, label: '2"' },
    { value: 3, label: '3"' },
    { value: 4, label: '4"' },
    { value: 5, label: '5"' },
    { value: 6, label: '6"' },
    { value: 7, label: '7"' },
    { value: 8, label: '8"' },
    { value: 9, label: '9"' },
    { value: 10, label: '10"' },
    { value: 11, label: '11"' },
]


const Height = ({ navigation }) => {
	// AsyncStorage.getItem('feet').then(data => setFeet(data)) 
	// AsyncStorage.getItem('inches').then(data => setInches(data))  
	const globalState = useContext(store);
    const { state, dispatch } = globalState;
	
	const [feet, setFeet] = useState(null);
	const [inches, setInches] = useState(null);

	return (
		<View style={styles.container}>
			<View style={{ marginLeft:'auto', marginRight:'auto', marginTop: windowHeight <= 667 ? 20 : null }}>
				<Workout />
			</View >

			<Animated.Text style={{ ...styles.subText }}>Almost there! Select your
				<Text style={styles.boldText}> height </Text>
			</Animated.Text>
            
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>  
                <Picker
					selectedValue={feet}
					style={{ height: 45, width: 100, flex: 1, marginLeft: 100 }}
					onValueChange={(itemValue, itemIndex) => setFeet(itemValue)}
				>
                    { FEET.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

                <Picker
					selectedValue={inches}
					style={{ height: 45, width: 100, flex: 1, marginLeft: 200 }}
					onValueChange={(itemValue, itemIndex) => setInches(itemValue)}
				>
                    { INCHES.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

            </View>

            <View style={{ marginTop: 250 }}>
                <CustomButton 
					text='Continue' 
					onPress={async () => {
						if (!feet || !inches) {
							Alert.alert('Please select both feet and inches above.')
						} else {
							try {
								// await AsyncStorage.setItem('feet', JSON.stringify(feet));
								// await AsyncStorage.setItem('inches', JSON.stringify(inches));
								dispatch({ type: 'SET_HEIGHT', data: { feet, inches }})
							} catch (err) {
								console.log(err)
							} finally {
								setFeet(null)
								setInches(null)
								navigation.navigate('Weight')
							}
						}
					}} 
				/>
            </View>
 
		</View>
	)
}

export default Height;