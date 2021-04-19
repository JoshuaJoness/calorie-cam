import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Picker, Animated, AsyncStorage } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from './button'
import Pilates from './svgs/pilates'
import { store } from '../store';

const Goal = ({ route, navigation }) => {   
    const globalState = useContext(store);
    const { state } = globalState;
    const { totalDailyCalorieNeeds: tdcnFromState, goal: goalFromState } = state;

    const [goal, setGoal] = useState(null);
    const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);

    useEffect(() => {
        const getData = async () => {
            await AsyncStorage.getItem('goal').then(data => setGoal(data))
            await AsyncStorage.getItem('totalDailyCalorieNeeds').then(data => setTotalDailyCalorieNeeds(data))
        }
        getData();
    }, []);

    useEffect(() => {
        if (goalFromState !== goal) {
            setGoal(goalFromState);
        }
        if (tdcnFromState !== totalDailyCalorieNeeds) {
            setTotalDailyCalorieNeeds(tdcnFromState);
        }
    }, [tdcnFromState, goalFromState]);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Your Goals</Text>

        {goal === 'loseWeight' ? (
            <View>
                <Text style={styles.boldText}>{Math.round(Number(totalDailyCalorieNeeds)) - 500} 
                    <Text style={styles.text}> calories is the amount of calories that we recommend you eat daily to lose weight.</Text>
                </Text>
                <Text style={{ ...styles.text, marginTop: 35 }}>We arrived at this number by subtracting <Text style={styles.boldText}>500 calories</Text> from your maintenance calories.</Text>
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
            style={{ marginTop: '10%' }}
            text="Update Your Goals" 
            onPress={() => {
                navigation.navigate('GetStarted');
            }} 
        />
              <View style={{ marginLeft:'auto', marginRight:'auto' }}>
            <Pilates />
        </View >
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
        marginTop: '5%',
        marginBottom: 30,
		textAlign: 'center',
    },
	text: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 22,
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
        // marginTop: '5%',
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