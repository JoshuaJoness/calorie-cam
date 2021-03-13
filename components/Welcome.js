import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Animated, TextInput, StyleSheet, StatusBar, Text } from 'react-native'
import { AppLoading } from 'expo-app-loading'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'
import { Audio } from 'expo-av'
import EatingImage from './animatedEating'

const Welcome = () => {
	const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0.1))
	const [fadeAnimTwo] = useState(new Animated.Value(0))
	
	React.useEffect(() => {
		Animated.timing(fadeAnim, {
		  toValue: 1,
		  duration: 3000,
		}).start()

		setTimeout(() => {
			setFadeAnim(1)
		}, 3000)
	  }, [])

	  useEffect(() => {
		if (fadeAnim === 1) {
			Animated.timing(fadeAnimTwo, {
				toValue: 1,
				duration: 3000,
			}).start()
		};
	  }, [fadeAnim])

	const navigationOptions = {
		title: 'iRecomp',
		headerShown: false
	}
	const [isReady, setIsReady] = useState(null)
	const [time, setTime] = useState(0)
	const [pressed, setPressed] = useState(false)

	const [sound, setSound] = React.useState()

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/mns.m4a'))
		setSound(sound)
		await sound.playAsync() 
	}

	useEffect(() => {
		const initSound = async () => {
			await playSound()
		}
		initSound()
		return sound ? () => sound.unloadAsync() : undefined
	}, [])


	


	// useEffect(() => {
	// 	const loadFonts = async () => {
	// 		await Font.loadAsync({
	// 			Roboto: require('native-base/Fonts/Roboto.ttf'),
	// 			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
	// 			Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
	// 			...Ionicons.font,
	// 		});

	// 		setIsReady({ isReady: true });
	
	// 		let time = time
	// 		setTimeout(function(){
	// 			time = 1
	// 			setTime({time:1});
	// 		}, 1000);
	
	// 		setTimeout(function(){
	// 			time = 2
	// 			setTime({time:2});
	// 		}, 1000);
	// 	}
	// 	loadFonts()
	// }, [])

	// async componentDidMount(){
	// 	await Font.loadAsync({
	// 		Roboto: require('native-base/Fonts/Roboto.ttf'),
	// 		Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
	// 		Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
	// 		...Ionicons.font,
	// 	});
	// 	this.setState({ isReady: true });

	// 	let time = this.state.time
	// 	setTimeout(function(){
	// 		time = 1
    //   this.setState({time:1});
	// 	}.bind(this),1000);

	// 	setTimeout(function(){
	// 		time = 2
	// 	  this.setState({time:2});
	// 	}.bind(this),1000);


	// }

	goToSearch = () => {
		setPressed({pressed:true})
		this.props.navigation.navigate('Search')
	}


	if (isReady) {
		 return <AppLoading />
	 }
	return(
		<View style={styles.container}>
			<StatusBar barStyle='dark-content'/>
				<View style={{marginTop:150}}>
				<Animated.Text 
					style={{
						fontSize: 40,
						marginLeft: 'auto',
						marginRight: 'auto',
						opacity: fadeAnim, // Bind opacity to animated value
					}}>
					Hello...
				</Animated.Text>
				<Animated.Text 
					style={{
						fontSize: 40,
						marginLeft: 'auto',
						marginRight: 'auto',
						opacity: fadeAnimTwo, // Bind opacity to animated value
					}}>
					Welcome to Calorie Cam :)
				</Animated.Text>
				<EatingImage />
					<Text style={{fontFamily:'Pacifico', fontSize:60, marginLeft:'auto', marginRight:'auto',marginBottom:40, color:'#356859'}}>Calorie Cam</Text>
					<ImageBackground tintColor="black" source={require('../assets/images/customEating.svg')} style={{height:300, marginTop:0, zIndex:-1000}}/>
						<Button
							style={{backgroundColor:'#FD5523', borderColor: '#FD5523', width:200, marginLeft:'auto', marginRight:'auto', marginTop : 50}}
							onPress={goToSearch}
							>
							Log your first meal!
						</Button>
				</View>

			{/*<Text style={{fontFamily:'Pacifico', fontSize:60, marginTop:200, marginLeft:'auto', marginRight:'auto',marginBottom:40, color:"#344955"}}>Food Tracker</Text>
				<Image
					style={styles.image}
					source={require('../assets/beet.png')}
				/>
			<Button
				style={{backgroundColor:'#344955', borderColor: '#344955', width:200, marginLeft:'auto', marginRight:'auto', marginTop: 50}}
				onPress={this.goToSearch}
				>
				Log your first meal!
			</Button>*/}
		</View>
	)
}

export default Welcome

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#FFF',
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

