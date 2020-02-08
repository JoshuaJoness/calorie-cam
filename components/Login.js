// MAKE IT A GAME
// EARN POINTS
import React from 'react'
import { View, Image, Text, TextInput, StyleSheet } from 'react-native'

const Login = () => {
	let navigationOptions = {
		title: "iRecomp",
		headerStyle: {
			backgroundColor:'#000000'
		},
		headerTitleStyle: {
			color: '#D3F09C'
		}
	}
	return(
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('../assets/beet.png')}
			/>
			<TextInput
				style={styles.input}
				onChangeText={text => onChangeText(text)}
				placeholder='Please enter username'
			/>

			<TextInput
				style={styles.input}
				onChangeText={text => onChangeText(text)}
				placeholder='Please enter your password'
			/>
		</View>
	)
}

export default Login

const styles = StyleSheet.create ({
	container:{
		backgroundColor:"#D3F09C",
		height:1000
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: 250,
		marginLeft: 'auto',
		marginRight:'auto',
		backgroundColor:'white',
		borderRadius: 6,
		marginBottom:'2.5%',
		textAlign: 'center'
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',
		marginBottom:'10%',
		marginTop: '15%'
	},
	text: {
		fontSize:18, marginLeft:'auto', marginRight:'auto', marginTop:'2.5%'
	}
})
