import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from '@ui-kitten/components'

const CutomButton = ({ text, onPress }) => {
    const test = 'testing...'
    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity> 
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
