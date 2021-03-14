import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'

const CutomButton = ({text}) => {
    const test = 'testing...'
    return (
        <Button style={styles.button} onPress={() => console.log(test)}>{text}</Button> 
    )
}

const styles = StyleSheet.create ({
	button:{
		backgroundColor: '#cb997e',
        borderColor: '#cb997e',
        width: '70%',
        marginTop: '7s%',
        marginLeft: 'auto',
        marginRight: 'auto',
	},
})

export default CutomButton
