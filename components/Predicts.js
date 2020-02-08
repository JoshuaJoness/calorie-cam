import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import axios from 'axios'
// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'
});

const Predicts = () => {
	const [image, setImage] = useState('')
	const [resultImage, setResultImage] = useState('')

	const selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) setImage(uri);
  };

  const takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
			base64: true
    });
		// here we set the image to base64 data of the image that we took with the camera
    setImage(base64);
  };

	const showState = () => {
		console.log('................',resultImage)
	}


		const predict = () =>	{
			// here we send the image encoded as base 64 to the clarifai API to determine what kind of food it is
			app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image}).then(
			    function(response){
						let tag = response.rawData.outputs[0].data.concepts[0].name;
						alert(`this is a ${tag}`)
						axios.get(`https://api.wolframalpha.com/v1/simple?i=${tag}&appid=9PWATX-P68ELU4YPV`)
							.then(res => {
								console.log('*********************',res.config.url);
								setResultImage(res.config.url)
							}).catch(err => {
								console.log(err);
							})
			    },
			    function(err){
			      console.log(err)
			    }
			)
		}

	return(
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: image }} />
			<View style={styles.row}>
				<Button onPress={selectPicture}>Gallery</Button>
				<Button onPress={takePicture}>Camera</Button>
				<Button onPress={predict.bind(this)} >Submit</Button>
				<Button onPress={showState}>State</Button>
			</View>
			<Image
	          style={{ width: 300, height: 500 }}
	          source={{ uri: resultImage }}
	        />


		</View>
	)
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Predicts
