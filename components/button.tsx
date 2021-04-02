import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as Haptic from 'expo-haptics';
import { Audio } from 'expo-av'
import { Button } from '@ui-kitten/components'
import { TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CutomButton = ({ text, onPress, disabled, style }) => {
    const [sound, setSound] = useState()

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/click1.wav'))
		// setSound(sound)
		await sound.playAsync() 
	}

    return (
        <TouchableHighlight 
            style={style ? { ...styles.button, ...style } : styles.button} 
            onPress={() => {
                Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy);
                playSound();
                onPress();
            }}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableHighlight> 
    )
}

const styles = StyleSheet.create ({
	button:{
		backgroundColor: '#cb997e',
        borderColor: '#cb997e',
        borderRadius: 4,
        height: 45,
        width: '70%',
        marginTop: '7s%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
	},
    text: {
        fontFamily: 'MontserratMedium',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    }
})

export default CutomButton
