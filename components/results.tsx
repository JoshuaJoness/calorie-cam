import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import CustomButton from './button'
import { store } from '../store';

const Results = ({ navigation }) => {
    const globalState = useContext(store);
	const { state, dispatch } = globalState;

    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [feet, setFeet] = useState(null);
    const [inches, setInches] = useState(null);
    const [weight, setWeight] = useState(null);
    const [activityLevel, setActivityLevel] = useState(null);
    const [bmr, setBmr] = useState(null);
    const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);    

    useEffect(() => {
        const getData = async () => {
            await AsyncStorage.getItem('age').then(data => setAge(data))
            await AsyncStorage.getItem('gender').then(data => setGender(data))
            await AsyncStorage.getItem('feet').then(data => setFeet(data))
            await AsyncStorage.getItem('inches').then(data => setInches(data))
            await AsyncStorage.getItem('weight').then(data => setWeight(data))
            await AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data))
        }
        getData();
    }, []);

    useEffect(() => {        
        if (age && gender && feet && inches && weight && activityLevel) {
            const feetToInches = feet * 12;
            const totalInches = Number(inches) + Number(feetToInches);

            if (gender === 'female') {
                setBmr(655 + (4.35 * JSON.parse(weight)) + (4.7 * totalInches) - (4.7 * age))
            } else {
                setBmr(66 + (6.23 * JSON.parse(weight)) + (12.7 * totalInches) - (6.8 * age))
            }
        }
    }, [age, gender, feet, inches, weight, activityLevel]);

    useEffect(() => {
        if (activityLevel === 'notVeryActive') {
            setTotalDailyCalorieNeeds(bmr * 1.2);
        } else if (activityLevel === 'moderatelyActive') {
            setTotalDailyCalorieNeeds(bmr * 1.375);
        } else {
            setTotalDailyCalorieNeeds(bmr * 1.55);
        }
    }, [bmr]);

    useEffect(() => {
        if (totalDailyCalorieNeeds)
            dispatch({
                type: 'CALORIE_NEEDS_UPDATED',
                data: totalDailyCalorieNeeds
            });
    }, [totalDailyCalorieNeeds]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds))} 
                <Text style={styles.text}> calories is the amount of calories that your body needs for it's daily energy expenditure.</Text>
            </Text>
            <Text style={{ ...styles.text, marginTop: 50 }}>
                This is known as your <Text style={styles.boldText}>maintenance</Text> calories
            </Text>
            <Text style={{ ...styles.text, marginTop: 50 }}>
                Would you like to
            </Text>
            <View style={{display:'flex', flexDirection: 'column' }}>
                <CustomButton 
                    text={'Lose Weight'} 
                    onPress={async () => {
                        try {
                            await AsyncStorage.setItem('goal', 'loseWeight');        
                            await AsyncStorage.setItem('totalDailyCalorieNeeds', JSON.stringify(totalDailyCalorieNeeds));        
                            dispatch({ type: 'SET_GOAL', data: 'loseWeight' });        
                        } catch (err) {
                            console.log(err)
                        }
                        navigation.navigate('Home');
                    }}
                />
                <CustomButton 
                    text={'Maintain Weight'}
                    onPress={async () => {
                        try {

                            await AsyncStorage.setItem('goal', 'maintainWeight');
                            await AsyncStorage.setItem('totalDailyCalorieNeeds', JSON.stringify(totalDailyCalorieNeeds));     
                            dispatch({ type: 'SET_GOAL', data: 'maintainWeight' });
                        } catch (err) {
                            console.log(err)
                        }
                        navigation.navigate('Home');
                    }}
                    />
                <CustomButton 
                    text={'Gain Weight'} 
                    onPress={async () => {
                        try {
            
                            await AsyncStorage.setItem('goal', 'gainWeight');
                            await AsyncStorage.setItem('totalDailyCalorieNeeds', JSON.stringify(totalDailyCalorieNeeds));     
                            dispatch({ type: 'SET_GOAL', data: 'gainWeight' });
                        } catch (err) {
                            console.log(err)
                        }
                        navigation.navigate('Home');
                    }}
                />
            </View>
        </View>
    )
}

export default Results;

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
    title: {
        fontFamily: 'Pacifico',
		color: '#6b705c',
		fontSize: 35,
		paddingLeft: '10%',
		paddingRight: '10%',
        marginBottom: 30,
		textAlign: 'center',
    },
	text: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 25,
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