import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from './button'
import Pilates from './svgs/pilates'

const Goal = ({ navigation }) => {
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

    const [goal, setGoal] = useState(null);


    const [refresh, setRefresh] = useState(false);

    const [bmr, setBmr] = useState(null);
    const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);

    useEffect(() => {
        console.log(age,gender,feet,inches,weight,activityLevel)


        const getData = async () => {
            await AsyncStorage.getItem('age').then(data => setAge(data))
            await AsyncStorage.getItem('gender').then(data => setGender(data))
            await AsyncStorage.getItem('feet').then(data => setFeet(data))
            await AsyncStorage.getItem('inches').then(data => setInches(data))
            await AsyncStorage.getItem('weight').then(data => setWeight(data))
            await AsyncStorage.getItem('activityLevel').then(data => setActivityLevel(data))
            AsyncStorage.getItem('goal').then(data => setGoal(data))
        }
        getData();
    }, []);

    // useEffect(() => {        
    //     if (age && gender && feet && inches && weight && activityLevel) {
    //         console.log(age, gender, feet, inches, weight, activityLevel, "CONFIGS")
    //         const feetToInches = feet * 12;
    //         const totalInches = Number(inches) + Number(feetToInches);

    //         if (gender === 'female') {
    //             setBmr(655 + (4.35 * weight) + (4.7 * totalInches) - (4.7 * age))
    //         } else {
    //             setBmr(66 + (6.23 * weight) + (12.7 * totalInches) - (6.8 * age))
    //         }
    //     }
    // }, [age, gender, feet, inches, weight, activityLevel]);

    // useEffect(() => {
    //     if (activityLevel === 'notVeryActive') {
    //         setTotalDailyCalorieNeeds(bmr * 1.2);
    //     } else if (activityLevel === 'moderatelyActive') {
    //         setTotalDailyCalorieNeeds(bmr * 1.375);
    //     } else {
    //         setTotalDailyCalorieNeeds(bmr * 1.55);
    //     }
    // }, [bmr]);

    if (!loaded)
        return null

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Your Goals</Text>

        {goal === 'loseWeight' ? (
            <View>
                <Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds)) - 500} 
                    <Text style={styles.text}> calories is the amount of calories that we recommend you eat daily to lose weight.</Text>
                </Text>
                <Text style={{ ...styles.text, marginTop: 35 }}>We arrived at this number by subtracting <Text style={styles.boldText}>500 calories</Text> to your maintenance calories.</Text>
            </View>
        ) : goal === 'maintainWeight' ? (
            <View>
                <Text style={styles.text}><Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds))}</Text> calories is the amount of calories that we recommend you eat daily to maintain your current weight.</Text>
                <Text style={{ ...styles.text, marginTop: 35 }}>We arrived at this number by calculating your daily energy expenditure using the information you provided.</Text>
            </View>
        ) : goal === 'gainWeight' ? (
            <View>
                <Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds)) + 500} 
                    <Text style={styles.text}> calories is the amount of calories that we recommend you eat daily to gain weight.</Text>
                </Text>
                <Text style={{ ...styles.text, marginTop: 35 }}>We arrived at this number by adding <Text style={styles.boldText}>500 calories</Text> to your maintenance calories.</Text>
            </View>
        ) : null}

        <Text style={{ ...styles.text, marginTop: 35 }}>
            This is known as <Text style={styles.boldText}>{ goal === 'loseWeight' ? 'a caloric deficit' : goal === 'maintainWeight' ? 'your maintenance calories' : goal === 'gainWeight' ? 'a caloric surplus' : null }</Text>
        </Text>

        <CustomButton 
            text="Update Your Goals" 
            onPress={() => {
                navigation.navigate('GetStarted')
            }} 
        />
              {/* <View style={{ marginLeft:'auto', marginRight:'auto' }}>
            <Pilates />
        </View > */}
    </View>
    )
}

export default Goal;

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		// paddingTop: '5%'
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