import React from 'react'
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

class Predict extends React.Component {
	state = {
    image: '',
		resultImage: ''
  };

	selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ image: uri });
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
			base64: true
    });
		// here we set the image to base64 data of the image that we took with the camera
    this.setState({ image: base64 });
  };

	showState = () => {
		console.log('................',this.state.resultImage)
	}


		predict()	{
			// here we send the image encoded as base 64 to the clarifai API to determine what kind of food it is
			app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: this.state.image}).then(
			    function(response){
						let tag = response.rawData.outputs[0].data.concepts[0].name;
						alert(`this is a ${tag}`)
						axios.get(`https://api.wolframalpha.com/v1/simple?i=${tag}&appid=9PWATX-P68ELU4YPV`)
							.then(res => {
								console.log('*********************',res.config.url);
								this.state.resultImage = res.config.url
							}).catch(err => {
								console.log(err);
							})
			    },
			    function(err){
			      console.log(err)
			    }
			)
		}


render(){
	return(
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: this.state.image }} />
			<View style={styles.row}>
				<Button onPress={this.selectPicture}>Gallery</Button>
				<Button onPress={this.takePicture}>Camera</Button>
				<Button onPress={this.predict.bind(this)} >Submit</Button>
				<Button onPress={this.showState}>State</Button>
			</View>
			<Image
	          style={{ width: 300, height: 500 }}
	          source={{ uri: this.state.resultImage }}
	        />


		</View>
	)
}


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


export default Predict