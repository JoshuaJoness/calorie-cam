import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Animated, AsyncStorage, Alert, Switch } from 'react-native'
import Pushup from './svgs/pushup'
import CustomButton from './button'
import { styles } from '../styles/global';


const Weight = ({ navigation }) => {
	// AsyncStorage.getItem('weight').then(data => setWeight(data)) 
	const [weight, setWeight] = React.useState(null);
	const [lbs, setLbs] = useState(true);
	const [kgs, setKgs] = useState(false);

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => {
		setLbs(!lbs);
		setKgs(!kgs);
		setWeight(null);
		setIsEnabled(previousState => !previousState);
	};

	useEffect(() => {
		console.log(weight, 'weight')
	}, [weight])

	return (
		<View style={styles.container}>
			<View style={{marginLeft:'auto', marginRight:'auto'}}>
				<Pushup />
			</View >

			<View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 50 }}>
				<Text style={{ fontFamily: 'MontserratLight', fontSize: 25, color: '#6b705c', }}>Lbs</Text>
				<Switch
					trackColor={{ false: "#ffe8d6", true: "#a5a58d" }}
					thumbColor={isEnabled ? "#ffe8d6" : "#a5a58d"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
					style={{ marginLeft: 20, marginRight: 20 }}
				/>
				<Text style={{ fontFamily: 'MontserratLight', fontSize: 25, color: '#6b705c', }}>Kg</Text>
			</View>


			<Animated.Text style={{ ...styles.subText, marginTop: 0 /*, opacity: fadeAnim */ }}>Enter your
				<Text style={styles.boldText}> weight ({lbs ? 'lbs' : 'kg'}) </Text>
			</Animated.Text>
            
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>  
                <TextInput 
                        style={styles.weightInput} 
                        value={weight} 
                        onChangeText={weight => {
                            const weightToNumber = Number(weight);
                            if (!weightToNumber && weight !== '') {
                                Alert.alert('Please enter numbers only.');
                                setWeight(null);
                            } else {
								const lbsToKgs = kgs ? Number(weight) * 2.20462 : null;
                                setWeight(lbsToKgs || weight);
                            }
                        }}
                        placeholder={lbs ? '180lbs' : '60kg'}
                    />
                </View>
            <View style={{ marginTop: 50 }}>
                <CustomButton 
                    text='Continue' 
                    onPress={async () => {
						if (!weight) {
							Alert.alert('Please enter your weight.')
						} else {
							try {
								await AsyncStorage.setItem('weight', JSON.stringify(weight));
							} catch (err) {
								console.log(err)
							}
							navigation.navigate('ActivityLevel');
						}
                    }} 
                    disabled={!weight}/>
            </View>
 
		</View>
	)
}

export default Weight;