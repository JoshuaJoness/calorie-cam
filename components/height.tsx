import React from 'react';
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Workout from './svgs/workout';
import CustomButton from './button';
import { styles } from '../styles/global';

const windowHeight = Dimensions.get('window').height;


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
]


const Height = ({ navigation }) => {
	// AsyncStorage.getItem('feet').then(data => setFeet(data)) 
	// AsyncStorage.getItem('inches').then(data => setInches(data))  
	
	const [feet, setFeet] = React.useState(null);
	const [inches, setInches] = React.useState(null);


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
					// style={{ height: 45, width: 100, flex: 1, marginLeft: 100 }}
					onValueChange={(itemValue, itemIndex) => setFeet(itemValue)}
					// mode="dropdown"
				>
                    { FEET.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

                <Picker
					selectedValue={inches}
					// style={{ height: 45, width: 100, flex: 1, marginLeft: 200 }}
					onValueChange={(itemValue, itemIndex) => setInches(itemValue)}
				>
                    { INCHES.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

            </View>

            {feet && inches ? <View>
                <CustomButton 
					text='Continue' 
					onPress={async () => {
						try {
							await AsyncStorage.setItem('feet', feet);
							await AsyncStorage.setItem('inches', inches);
						} catch (err) {
							console.log(err)
						}
						navigation.navigate('Weight')	
					}} 
					disabled={!feet && !inches}/>
            </View> : null}
 
		</View>
	)
}

export default Height;