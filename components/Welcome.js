import React, { useState, useEffect } from 'react';
import { View, Image, Animated, TextInput, StyleSheet } from 'react-native'
import { Container, Header, Content, Icon, Picker, Form, Button, Text  } from "native-base";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class Welcome extends React.Component {
	static navigationOptions = {
		title: "iRecomp",
		headerStyle: {
			backgroundColor:'#000000'
		},
		headerTitleStyle: {
			color: '#D3F09C'
		}
	}

	state={
		isReady:null
	}

	async componentDidMount(){
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}

	goToSearch = () => {
		this.props.navigation.navigate('Search')
	}


render() {
	if (!this.state.isReady) {
		 return <AppLoading />;
	 }
	return(
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('../assets/beet.png')}
			/>
			<Button
				style={{backgroundColor:'#1C5253', width:200, marginLeft:'auto', marginRight:'auto', borderWidth:2, borderColor:'#306B34', color:'#F3FFC6', marginTop:60}}
				onPress={this.goToSearch}
				>
				<Text>Log your first meal!</Text>
			</Button>
		</View>
	)}
}

export default Welcome

const styles = StyleSheet.create ({
	container:{
		backgroundColor:"#D3F09C",
		height:1000
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',
		marginTop: 200
	},
	text: {
		fontSize:18, marginLeft:'auto', marginRight:'auto', marginTop:'10%'
	}
})
