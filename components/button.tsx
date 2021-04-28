import React, { useState } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import * as Haptic from 'expo-haptics';
import { Audio } from 'expo-av'
import { TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;

interface IProps {
    text: string;
    onPress: () => any;
    disabled?: boolean;
    style?: any;
}

const CustomButton = ({ text, onPress, disabled, style } : IProps) => {
    const [sound, setSound] = useState()

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/click1.wav'))
		// setSound(sound)
		await sound.playAsync() 
	}

    // if (disabled) {
    //     return <TouchableHighlight
    //     style={style ? { ...styles.button, ...style, backgroundColor: '#ddbe89' } : styles.button}
    //     >
    //         <Text style={styles.text}>{text}</Text>
    //     </TouchableHighlight>
    // }

    return (
        <TouchableHighlight 
            style={style ? { ...styles.button, ...style } : styles.button} 
            onPress={() => {
                Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy);
                playSound();
                onPress();
            }}
            // disabled={disabled}
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
        height: windowHeight <= 667 ? 35 : 45,
        width: windowHeight <= 667 ? '50%' : '70%',
        marginTop: '7%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
	},
    text: {
        fontFamily: 'MontserratMedium',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    }
})

export default CustomButton
