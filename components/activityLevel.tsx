import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Picker, Animated, AsyncStorage, Dimensions, Alert } from 'react-native';
import Pilates from './svgs/pilates';
import CustomButton from './button';
import { styles } from '../styles/global';
import { store } from '../store';

const windowHeight = Dimensions.get('window').height;


const ACTIVITY_LEVELS = [
    { value: 'noExercise', label: 'Little/no exercise' },
    { value: 'lightExercise', label: 'Light exercise' },
    { value: 'moderatelyActive', label: 'Moderate exercise (3-5 days/wk)' },
    { value: 'veryActive', label: 'Very active (6-7 days/wk)' },
    { value: 'extraActive', label: 'Extra active (very active & physical job)' },
]

const ActivityLevel = ({ navigation }) => {
	// AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data));  
    const globalState = useContext(store);
    const { state, dispatch } = globalState;
	const [activityLevel, setActivityLevel] = useState(null);

	return (
		<View style={styles.container}>
			<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Pilates />
			</View >

			<Animated.Text style={{ ...styles.subText }}>Lastly, select your 
				<Text style={styles.boldText}> activity level </Text>
			</Animated.Text>
            
            <View>  
                <Picker
					selectedValue={activityLevel}
					style={styles.picker}
					// onValueChange={async (itemValue, itemIndex) => await setActivityLevel(itemValue)}
                    onValueChange={(itemValue ) => setTimeout(() => setActivityLevel(itemValue))}
				>
                    { ACTIVITY_LEVELS.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

            </View>

            <View style={{ marginTop: windowHeight <= 667 ? 150 : 200 }}>
                <CustomButton 
                    text='Continue' 
                    onPress={async() => {
                        if (!activityLevel) {
                            Alert.alert('Please select an activity level')
                        } else {
                            try {
                                // await AsyncStorage.setItem('activityLevel', activityLevel);
                                dispatch({ type: 'SET_ACTIVITY_LEVEL', data: activityLevel })
                            } catch (err) {
                                console.log(err)
                            } finally {
                                navigation.navigate('Results');
                            }
                        }
                    }} 
                    disabled={!activityLevel}
                    />
            </View>
 
		</View>
	)
}

export default ActivityLevel;