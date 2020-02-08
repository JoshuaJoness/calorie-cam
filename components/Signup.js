import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Animated, TextInput, StyleSheet } from 'react-native'
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
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
		user:{
			email:'',
			username:'',
			password:'',
			activityLevel:''
		}
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

	goToStats = () => {
		this.props.navigation.navigate('Stats')
	}

	goToLogin = () => {
		this.props.navigation.navigate('Login')
	}

	onChangeText = (text,field) => {
		let user = this.state.user
		user[field] = text
		this.setState(user)
		console.log(this.state);
	}

	onValueChange(value: string) {
		let user = this.state.user
		user.activityLevel=value
    this.setState(user)
  }

	onSubmit = () => {
		axios.post('http://localhost:4000/signup', user)
		.then(res => {
			console.log(res.data);
			this.props.navigation.navigate('Scanner')
		}).catch(err => {
			console.log(err);
		})
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
			<Form>
				<Picker />
					<TextInput
						style={styles.input}
						onChangeText={(text) => this.onChangeText(text,'email')}
						placeholder='Please enter your email'
					/>
					<TextInput
						style={styles.input}
						onChangeText={(text) => this.onChangeText(text,'username')}
						placeholder='Please select a username'
					/>
					<TextInput
						style={styles.input}
						onChangeText={(text) => this.onChangeText(text,'password')}
						placeholder='Please enter a password'
					/>
				<Button
					title="Sign-up"
					onPress={this.goToStats}
				/>
			</Form>
			<Text style={styles.text}>Already have an account?<Text style={{color:'#FF7FAA'}} onPress={this.goToLogin}>Log-in</Text>
			</Text>
		</View>
	)}
}

export default Welcome

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
		marginBottom:'3%',
		textAlign: 'center'
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',
		marginBottom:'2%',
		marginTop: '15%'
	},
	text: {
		fontSize:18, marginLeft:'auto', marginRight:'auto', marginTop:'10%'
	}
})
//
// const [time, setTime] = useState(0)
// const [opacity, setOpacity] = useState(new Animated.Value(1))
//
// setTimeout(function () {
// 	setTime({time:1})
// }, 1500);
//
// const onLoad = () => {
// 	Animated.timing(opacity, {
// 		toValue:0,
// 		duration:1500,
// 		useNativeDriver:true,
// 	})
// }
//


// {
// 	time==0 ? <Text style={{fontFamily: 'Pacifico',fontSize: 38}}>Welcome to CaloriEZ</Text> : <Text style={{fontFamily: 'Pacifico',fontSize: 38}}>Swipe up to get started!</Text>
// }
