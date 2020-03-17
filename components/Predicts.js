import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TouchableHighlight, StatusBar, TextInput, AsyncStorage } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment'
// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'
});

const Predicts = (props) => {
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
  const [grams, setGrams] = useState('100')
  let arr = []
  const [loggedFoods, setLoggedFoods] = useState([])
  const [date, setDate] = useState(moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"))

  const [object, setObject] = useState({label:'',calories:0,carbs:0,protein:0,fat:0})

	// const selectPicture = async () => {
  //   await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
  //     aspect: 1,
  //     allowsEditing: true,
  //   });
  //   if (!cancelled) setImage(uri);
  // };


  {/*This function launches the camera*/}
  const takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
			base64: true
    });
		{/*here we set the image to base64 data of the image that we took with the camera*/}
    setImage(base64);
		setImageToDisplay(uri)
  };

  {/*This function utilizes the Clarifai import to predict the food item in the picture*/}
  const predicts = () => {
    app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image})
    .then(function(response){
      console.log('***',response.outputs[0].data.concepts.map(e => e.name));
    })
  }

  const onChangeText = (amount) => {
    setGrams(amount)
    setObject({label:label, calories:calories*amount, carbs:carbs*amount, protein:protein*amount, fat:fat*amount})
  }


	const predict = () =>	{
		{/*here we send the image encoded as base 64 to the clarifai API to determine what kind of food it is*/}
		app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image}).then(
			function(response){
        {/*Once retrieving the predicted item, we set this as our 'tag' and send it to edamam API to retrieve the nutritional information*/}
				let tag = response.rawData.outputs[0].data.concepts[0].name;
					alert(`this is a ${tag}`)
					axios.get(`https://api.edamam.com/api/food-database/parser?app_id=7ff1ee7e&app_key=aa4824adda205d7ff601301c08816573&ingr=${tag}`)
						.then(res => {
							console.log('Response data',res.data.hints[0].food.label,res.data.hints[0].food.nutrients.ENERC_KCAL, res.data.hints[0].food.nutrients.CHOCDF,res.data.hints[0].food.nutrients.PROCNT,res.data.hints[0].food.nutrients.FAT)
							setLabel(res.data.hints[0].food.label)
              {/* Here we divide the response data for each macronutrient by 100 to get the value per 1 gram */}
							setCalories(res.data.hints[0].food.nutrients.ENERC_KCAL/100)
							setCarbs(res.data.hints[0].food.nutrients.CHOCDF/100)
							setProtein(res.data.hints[0].food.nutrients.PROCNT/100)
							setFat(res.data.hints[0].food.nutrients.FAT/100)
              {/* Here we set the object that we will push to our array,
                we multiply by the grams variable so that
                the value changes when the user specifies the grams */}
              setObject({label:res.data.hints[0].food.label,
                calories:res.data.hints[0].food.nutrients.ENERC_KCAL/100*grams,
                carbs:res.data.hints[0].food.nutrients.CHOCDF/100*grams,
                protein:res.data.hints[0].food.nutrients.PROCNT/100*grams, 
                fat:res.data.hints[0].food.nutrients.FAT/100*grams,
                date:date
              })
						})
						.catch(err => {
							console.log(err)})
			    },
			    function(err){
			      console.log(err)
			    }
				)
			}



    const showState = () => {
      console.log('*********',date.split(',').splice(1,1));
    }


    const setAsync = async () => {
      try {
        let obj = object

      let foods = await AsyncStorage.getItem('foods') || '[]'
      foods = JSON.parse(foods)
      foods.push(obj)
      AsyncStorage.setItem('foods', JSON.stringify(foods)).then(() => {
        console.log('foods updated')
        {/* I call getAsync here so that it sets the components state at the same time that the AsyncStorage is being updated */}
        getAsync()
      }) }

      catch(error) {
        alert(error)
      }
    }

    {/* I need to have getAsync called automatically (really i need async to be called and parsed automatically, perhaps on logging food? */}

    const getAsync = async () => {
      try {
        const value = await AsyncStorage.getItem('foods');
        if (value !== null) {
          // We have data!!
          let parsed = JSON.parse(value)
          setLoggedFoods(parsed)
        }
      } catch (error) {
        console.log('Error')
      }
    };

const clear = () => {
  AsyncStorage.clear()
}

const goToLog = () => {
  props.navigation.navigate('Log', {loggedFoods:loggedFoods})
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
				<ScrollView style={{marginTop:35}}>
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

          <Text>We've identified this as a(n) {label}</Text>
          <Text>It contains the following macronutrients per</Text>
            <TextInput
               style={{ height: 40, width:100,borderColor: 'gray', borderWidth: 1 }}
               onChangeText={text => onChangeText(text)}
               value={grams}
             />
           <Text>Grams</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Calories: </Text>{calories*grams} per {grams} grams</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Protein:</Text> {Math.round(protein)*grams}</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Carbs:</Text> {carbs == 'NaN' ? N/A : Math.round(carbs)*grams}</Text>
					<Text style={{fontSize:18, marginTop:10}}><Text style={{fontWeight:'bold', fontSize:18}}>Fat:</Text> {fat == NaN ? 'N/A' : Math.round(fat)*grams}</Text>
          <Text>Is this correct? If so you can log this food by pressing the button below!</Text>
          <Button onPress={setAsync}>Click here to log this item</Button>

          {loggedFoods.map((food,i) => <Text>{food.label}</Text>)}
        <Button onPress={getAsync}>Click here to log this item</Button>
        <Button onPress={showState}>Click here to log this item</Button>

      <Button onPress={goToLog}>Click here to log this item</Button>
				</ScrollView>
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
