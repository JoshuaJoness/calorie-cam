import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import EatingImage from './animatedEating';
import CustomButton from './button';
import { styles } from '../styles/global';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetStarted = ({ navigation }) => (
        <ScrollView style={styles.container}>
			<View style={{ alignItems: 'center' }}>
				<EatingImage style={{ marginTop: windowHeight <= 668 ? -200 : null }} />
			</View>
            <Text style={styles.text}>Welcome to Calorie Cam!</Text>
            <Text style={styles.subText}>
                To begin, we just need to ask you a few questions which well help us tailor your weight loss journey.
            </Text>
            <CustomButton text='Get Started' onPress={() => navigation.navigate('Age')} style={{ marginBottom: '5%' }} />
        </ScrollView>
    );

export default GetStarted;