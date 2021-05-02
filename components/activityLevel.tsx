import React from 'react';
import { View, Text, Picker, Animated, AsyncStorage, Dimensions } from 'react-native';
import Pilates from './svgs/pilates';
import CustomButton from './button';
import { styles } from '../styles/global';

const windowHeight = Dimensions.get('window').height;


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
					onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}
				>
                    { ACTIVITY_LEVELS.map(({value,label}) => <Picker.Item value={value} label={label} key={value} />) }
				</Picker>

            </View>

            {activityLevel ? <View>
                <CustomButton 
                    text='Continue' 
                    onPress={async() => {
                        try {
                            await AsyncStorage.setItem('activityLevel', activityLevel);
                        } catch (err) {
                            console.log(err)
                        }
                        navigation.navigate('Results');
                    }} 
                    disabled={!activityLevel}
                    />
            </View> : null}
 
		</View>
	)
}

export default ActivityLevel;