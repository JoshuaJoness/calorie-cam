import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage } from 'react-native';
import { useFonts } from 'expo-font';

const Results = () => {
    const [loaded] = useFonts({
		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
		MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
	});

    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [feet, setFeet] = useState(null);
    const [inches, setInches] = useState(null);
    const [weight, setWeight] = useState(null);
    const [activityLevel, setActivityLevel] = useState(null);

    const [bmr, setBmr] = useState(null);
    const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);

    AsyncStorage.getItem('age').then(data => setAge(data))
    AsyncStorage.getItem('gender').then(data => setGender(data))
    AsyncStorage.getItem('feet').then(data => setFeet(data))
    AsyncStorage.getItem('inches').then(data => setInches(data))
    AsyncStorage.getItem('weight').then(data => setWeight(data))
    AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data))

    useEffect(() => {
        if (age && gender && feet && inches && weight && activityLevel)
            console.log(age, gender, feet, inches, weight, activityLevel);


            const feetToInches = feet * 12;

            const totalInches = Number(inches) + Number(feetToInches)
            console.log(totalInches, 'totalInches')

            if (gender === 'female') {
                setBmr(655 + (4.35 * weight) + (4.7 * totalInches) - (4.7 * age))
            } else {
                setBmr(66 + (6.23 * weight) + (12.7 * totalInches) - (6.8 * age))
            }

            if (activityLevel === 'notVeryActive') {
                setTotalDailyCalorieNeeds(bmr * 1.2);
            } else if (activityLevel === 'moderatelyActive') {
                setTotalDailyCalorieNeeds(bmr * 1.375);
            } else {
                setTotalDailyCalorieNeeds(bmr * 1.55);
            }

    }, [age, gender, feet, inches, weight, activityLevel]);

    if (!loaded)
        return null

    return (
        <View style={styles.container}>
            <Text style={styles.text}>RESULTS</Text>
            <Text style={styles.text}>{Math.round(Number(totalDailyCalorieNeeds))} calories per day</Text>
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
	text: {
		fontFamily: 'MontserratLight',
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