import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TouchableHighlight, Modal, StatusBar } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'
});

const Predicts = () => {
	Predicts.navigationOptions = {
		headerShown: false
		};
	const [image, setImage] = useState()
	const [imageToDisplay, setImageToDisplay] = useState()
	const [label, setLabel] = useState('')
	const [calories, setCalories] = useState(0)
	const [carbs, setCarbs] = useState(0)
	const [protein, setProtein] = useState(0)
	const [fat, setFat] = useState(0)

	// const selectPicture = async () => {
  //   await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
  //     aspect: 1,
  //     allowsEditing: true,
  //   });
  //   if (!cancelled) setImage(uri);
  // };

  const takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
			base64: true
    });
		// here we set the image to base64 data of the image that we took with the camera
    setImage(base64);
		setImageToDisplay(uri)
  };

	const predict = () =>	{
		// here we send the image encoded as base 64 to the clarifai API to determine what kind of food it is
		app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image}).then(
			function(response){
				let tag = response.rawData.outputs[0].data.concepts[0].name;
					alert(`this is a ${tag}`)
					axios.get(`https://api.edamam.com/api/food-database/parser?app_id=7ff1ee7e&app_key=aa4824adda205d7ff601301c08816573&ingr=${tag}`)
						.then(res => {
							console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',res.data.hints[0].food.label,res.data.hints[0].food.nutrients.ENERC_KCAL, res.data.hints[0].food.nutrients.CHOCDF,res.data.hints[0].food.nutrients.PROCNT,res.data.hints[0].food.nutrients.FIBTG)
							setLabel(res.data.hints[0].food.label)
							setCalories(res.data.hints[0].food.nutrients.ENERC_KCAL)
							setCarbs(res.data.hints[0].food.nutrients.CHOCDF)
							setProtein(res.data.hints[0].food.nutrients.PROCNT)
							setFat(res.data.hints[0].food.nutrients.FIBTG)
						})
						.catch(err => {
							console.log(err)})
			    },
			    function(err){
			      console.log(err)
			    }
				)
			}

	return(
		<View style={styles.container}>
			<StatusBar barStyle='dark-content'/>
			<Image style={styles.image} source={{ uri: imageToDisplay }} />
			<View style={styles.row}>
				<Button onPress={takePicture}>Camera</Button>
				<Button onPress={predict.bind(this)}>Submit</Button>
			</View>
			{
				!label ?
				<View style={{marginTop:35}}>
					<Text style={{fontWeight:'bold', fontSize:15}}>1. Press 'Camera' to take a picture of your food!</Text>
					<Text style={{fontWeight:'bold', fontSize:15, marginTop:5}}>2. Press 'Submit' to retrieve nutritional information!</Text>
				</View>
				:
				<View style={{marginTop:35}}>
					<TouchableHighlight
						onPress={() => {
							setImage()
							setImageToDisplay()
							setLabel('')
							setCarbs(0)
							setProtein(0)
							setFat(0)
							setCalories(0)
						}}
						style={{marginTop:10, marginLeft: 'auto'}}>
						<Ionicons name="md-close" size={26} />
					</TouchableHighlight>
					<Text style={{fontSize:18}}><Text style={{fontWeight:'bold', fontSize:18}}>Label:</Text> {label}</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Calories: </Text>{calories} per serving</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Protein:</Text> {Math.round(protein)}</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Carbs:</Text> {Math.round(carbs)}</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Fat:</Text> {Math.round(fat)}</Text>
				</View>
			}
		</View>
	)
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: { fontSize: 21 },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  button: { padding: 13, margin: 15, backgroundColor: '#dddddd', borderRadius:4 },
  container: { flex: 1, backgroundColor: '#F3FFC6', alignItems: 'center', 		   justifyContent: 'center'},
});


export default Predicts

// INCLUDE AMOUNT IN QUERY

// <Button onPress={selectPicture}>Gallery</Button>
