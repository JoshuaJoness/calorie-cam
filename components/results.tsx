import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import CustomButton from './button'
import { store } from '../store';
import { ScrollView } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;

// BMR for Men = 66.47 + (13.75 * weight [kg]) + (5.003 * size [cm]) − (6.755 * age [years])
// BMR for Women = 655.1 + (9.563 * weight [kg]) + (1.85 * size [cm]) − (4.676 * age [years])

// Little/no exercise: BMR * 1.2 = Total Calorie Need
// Light exercise: BMR * 1.375 = Total Calorie Need
// Moderate exercise (3-5 days/wk): BMR * 1.55 = Total Calorie Need
// Very active (6-7 days/wk): BMR * 1.725 = Total Calorie Need
// Extra active (very active & physical job): BMR * 1.9 = Total Calorie Need

// const ACTIVITY_LEVELS = [
//     { value: 'noExercise', label: 'Little/no exercise' },
//     { value: 'lightExercise', label: 'Light exercise' },
//     { value: 'moderatelyActive', label: 'Moderate exercise (3-5 days/wk)' },
//     { value: 'veryActive', label: 'Very active (6-7 days/wk)' },
//     { value: 'extraActive', label: 'Extra active (very active & physical job)' },
// ]

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

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             await AsyncStorage.getItem('age').then(data => setAge(data))
    //             await AsyncStorage.getItem('gender').then(data => setGender(data))
    //             await AsyncStorage.getItem('feet').then(data => setFeet(JSON.parse(data)))
    //             await AsyncStorage.getItem('inches').then(data => setInches(JSON.parse(data)))
    //             await AsyncStorage.getItem('weight').then(data => setWeight(JSON.parse(data)))
    //             await AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data))
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, []);

    useEffect(() => {
        const { activityLevel, age, feet, inches, gender, weight } = state;
        setActivityLevel(activityLevel)
        setAge(age)
        setFeet(feet)
        setInches(inches)
        setGender(gender)
        setWeight(weight)
    }, [state])

    useEffect(() => {        
        if (age && gender && feet && inches && weight && activityLevel) {
            console.log(activityLevel, age, feet, inches, gender, weight, 'activityLevel, age, feet, inches, gender, weight')
            const feetToInches = feet * 12;
            const totalInches = Number(inches) + Number(feetToInches);     

            if (gender === 'female') {
                setBmr(655 + (4.35 * weight) + (4.7 * totalInches) - (4.7 * age))
            } else {
                setBmr(66 + (6.23 * weight) + (12.7 * totalInches) - (6.8 * age))
            }
        }
    }, [age, gender, feet, inches, weight, activityLevel]);

    useEffect(() => {
        if (activityLevel === 'noExercise') {
            setTotalDailyCalorieNeeds(bmr * 1.2);
        } else if (activityLevel === 'lightExercise') {
            setTotalDailyCalorieNeeds(bmr * 1.375);
        } else if (activityLevel === 'moderatelyActive') {
            setTotalDailyCalorieNeeds(bmr * 1.55);
        } else if (activityLevel === 'veryActive') {
            setTotalDailyCalorieNeeds(bmr * 1.725);
        } else if (activityLevel === 'extraActive') {
            setTotalDailyCalorieNeeds(bmr * 1.9);
        }
    }, [bmr]);

    useEffect(() => {
        if (totalDailyCalorieNeeds)
            dispatch({
                type: 'CALORIE_NEEDS_UPDATED',
                data: totalDailyCalorieNeeds
            });
    }, [totalDailyCalorieNeeds]);

    // TODO clean up, possibly remove
    useEffect(() => {
        return () => {
            setTotalDailyCalorieNeeds(null);
            setBmr(null);
            setActivityLevel(null)
            setAge(null)
            setFeet(null)
            setInches(null)
            setGender(null)
            setWeight(null)
        }
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds))} 
                <Text style={styles.text}> calories is the amount of calories that your body needs for it's daily energy expenditure.</Text>
            </Text>
            <Text style={{ ...styles.text, marginTop: windowHeight <= 667 ? 20 : 50 }}>
                This is known as your <Text style={styles.boldText}>maintenance</Text> calories
            </Text>
            <Text style={{ ...styles.text, marginTop: windowHeight <= 667 ? 20 :  50 }}>
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
                    style={{ height: windowHeight <= 667 ? 35 : 45, width: windowHeight <= 667 ? 200 : 250 }}
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
                    style={{ height: windowHeight <= 667 ? 35 : 45, width: windowHeight <= 667 ? 200 : 250 }}
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
                    style={{ height: windowHeight <= 667 ? 35 : 45, width: windowHeight <= 667 ? 200 : 250 }}
                />
            </View>
        </ScrollView>
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
        marginBottom: windowHeight <= 667 ? 5 : 30,
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
    boldText: {
        fontFamily: 'MontserratMedium',
		color: '#6b705c',
		fontSize: 25,
        marginTop: windowHeight <= 667 ? '2%' : '5%',
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