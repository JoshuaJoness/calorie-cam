import React from 'react';
import { View, Text } from 'react-native';
import EatingImage from './animatedEating';
import CustomButton from './button';
import { styles } from '../styles/global';

const GetStarted = ({ navigation }) => (
        <View style={styles.container}>
			<View style={{ alignItems: 'center' }}>
				<EatingImage />
			</View>
            <Text style={styles.text}>Welcome to Calorie Cam!</Text>
            <Text style={styles.subText}>
                To begin, we just need to ask you a few questions which well help us tailor your weight loss journey.
            </Text>
            <CustomButton text='Get Started' onPress={() => navigation.navigate('Age')} />
        </View>
    );

export default GetStarted;