import React, { useState, useEffect } from 'react';
import { View, Image, Animated, TextInput, StyleSheet, StatusBar, Text } from 'react-native'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components';

class Welcome extends React.Component {
	static navigationOptions = {
		title: "iRecomp",
		headerShown: false
	}

	state={
		isReady:null,
		time:0
	}

	async componentDidMount(){
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });

		let time = this.state.time
		setTimeout(function(){
			time = 1
      this.setState({time:1});
		}.bind(this),1000);

		setTimeout(function(){
			time = 2
		  this.setState({time:2});
		}.bind(this),1000);


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
			<StatusBar barStyle='dark-content'/>
			<Text style={{fontFamily:'Pacifico', fontSize:60, marginTop:200, marginLeft:'auto', marginRight:'auto',marginBottom:40, color:"#344955"}}>Food Tracker</Text>
				<Image
					style={styles.image}
					source={require('../assets/beet.png')}
				/>
			<Button
				style={{backgroundColor:'#344955', borderColor: '#344955', width:200, marginLeft:'auto', marginRight:'auto', marginTop: 50}}
				onPress={this.goToSearch}
				>
				Log your first meal!
			</Button>
		</View>
	)}
}

export default Welcome

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#E6EED6',
		height:900
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',

	},
	text: {
		fontSize:18, marginLeft:'auto', marginRight:'auto', marginTop:'10%'
	}
})
