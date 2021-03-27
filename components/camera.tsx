import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TouchableHighlight, StatusBar, TextInput, AsyncStorage, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment'

import CustomButton from './button';

{/* Clarifai Import to recognize images */}
const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'
});

const Camera = (props) => {
	const [image, setImage] = useState()
	const [imageToDisplay, setImageToDisplay] = useState()
	const [label, setLabel] = useState('')
	const [calories, setCalories] = useState(0)
	const [carbs, setCarbs] = useState(0)
	const [protein, setProtein] = useState(0)
	const [fat, setFat] = useState(0)
    const [grams, setGrams] = useState('100')
    const [loggedFoods, setLoggedFoods] = useState([])
    const [date, setDate] = useState(moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    const [show, setShow] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [object, setObject] = useState({label:'',calories:0,carbs:0,protein:0,fat:0})
    let arr = []

    const takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
                base64: true
        });
        setImage(base64);
        setImageToDisplay(uri)
    };

    {/* This is the function to change the nutrient amounts based on the grams selected by the user*/}
    const onChangeText = (amount) => {
        setGrams(amount)
        setObject({label:label, calories:calories*amount, carbs:carbs*amount, protein:protein*amount, fat:fat*amount})
    }

    {/*This is the function to recognize the image and retrieve the nutritional information*/}
        const predict = () =>	{
            {/*here we send the image encoded as base 64 to the clarifai API to determine what kind of food it is*/}
            app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image}).then(
                function(response){
            {/*Once retrieving the predicted item, we set this as our 'tag' and send it to edamam API to retrieve the nutritional information*/}
                    let tag = response.rawData.outputs[0].data.concepts[0].name;
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
                setShowResults(true)
                            })
                            .catch(err => {
                                console.log(err)})
                    },
                    function(err){
                    console.log(err)
                    }
                    )
        {/* THIS RIGHT HERE was the key to saving my app :) */}
        clear()
                }

    const clear = () => {
    setImage()
    setImageToDisplay()
    setLabel('')
    setCarbs(0)
    setProtein(0)
    setFat(0)
    setCalories(0)
    setGrams('100')
    setObject({label:'',calories:0,carbs:0,protein:0,fat:0})
    setShow(false)
    setShowResults(false)
    }

  {/*This function pushes the food object to the loggedFoods array and then stores it in AsyncStorage.
  getAsync() is then called, which checks AsyncStorage for a value, parses this values, and finally
  assigns it to a local variable, loggedFoods*/}
  const setAsync = async () => {
    try {
      let obj = object
      let foods = await AsyncStorage.getItem('foods') || '[]'
      foods = JSON.parse(foods)
      foods.push(obj)
      await AsyncStorage.setItem('foods', JSON.stringify(foods)).then(() => {
        console.log('foods updated')
        {/* I call getAsync here so that it sets the component's state at
          the same time that the AsyncStorage is being updated : 
          Here I am trying to achieve setShow(true), playing around to get rid of error message 

getAsync()
*/}
          
         goToLog()
        })
      }
      catch(error) {
        alert(error)
      }
    }

  const getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('foods');
      if (value !== null) {
        // We have data!!
        let parsed = JSON.parse(value)
        await setLoggedFoods(parsed)
        setShow(true)
      }
    } catch (error) {
      console.log('Error')
    }
  };

  {/* This function navigates to the Log component and passes it the loggedFoods array */}
  const goToLog = () => {
    props.navigation.navigate('Log', {loggedFoods:loggedFoods})
setLabel('')
  }

	return(
		<View style={styles.container}>
            <View style={{backgroundColor:'#B7B7A4'}}>
                <Image style={styles.image} source={{ uri: imageToDisplay }} />
                <View style={styles.row}>
                    {/* <CustomButton text="Camera"/> */}
                    <Button onPress={takePicture} title="Camera" />
                    <Button onPress={predict.bind(this)} title="Submit" />
                </View>
            </View>
			{
				!label ? (
                    <View>
                        <Text style={styles.text}>1. Press 'Camera' to take a picture of your food!</Text>
                        <Text style={styles.text}>2. Press 'Submit' to retrieve nutritional information!</Text>
                    </View>
                )
				:<View>
                    <TouchableHighlight
                        onPress={() => {
                            setImage(null)
                            setImageToDisplay(null)
                            setLabel('')
                            setCarbs(0)
                            setProtein(0)
                            setFat(0)
                            setCalories(0)
                            setGrams('100')
                            setObject({label:'',calories:0,carbs:0,protein:0,fat:0})
                                }}
                        style={{marginTop:10, marginLeft: 'auto'}}>
                        <Ionicons name="md-close" size={26} />
                    </TouchableHighlight>

                    <Text style={styles.text}>We've identified this as a(n) <Text style={{fontWeight:'bold'}}>{label}</Text></Text>

                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:30}}>
                        <Text style={styles.text}>Per </Text>
                        <TextInput
                            
                            placeholder='Place your Text'
                            // caption="Change me!"
                            value={grams}
                            onChangeText={text => onChangeText(text)}
                            />
                        <Text style={styles.text}> grams it contains:</Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold', width:70}}>Calories</Text>
                        <Text style={{fontWeight:'bold', width:70}}>Protein</Text>
                        <Text style={{fontWeight:'bold', width:70}}>Carbs</Text>
                        <Text style={{fontWeight:'bold', width:70}}>Fat</Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row'}}>
                        <Text style={{width:70}}>{Math.round(calories*grams)}</Text>
                        <Text style={{width:70}}>{isNaN(protein) ? 'n/a' : Math.round(protein)*grams}</Text>
                        <Text style={{width:70}}>{isNaN(carbs) ? 'n/a' : Math.round(carbs)*grams}</Text>
                        <Text style={{width:70}}>{isNaN(fat) ? 'n/a' : Math.round(fat)*grams}</Text>
                    </View>

                    <Button onPress={setAsync} style={styles.buttons} title="Click here to log this item" />
                </View>
            }
            </View>
    )
}

const styles = StyleSheet.create({
  row: { 
      display:'flex', 
      flexDirection:'row', 
      marginLeft: 'auto', 
      marginRight: 'auto'
    },
    image: { width: 300, height: 300, backgroundColor: '#ECECEC', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
    container:{
        backgroundColor: '#ffe8d6',
        height: '100%',
        paddingTop: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'MontserratLight',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
    },
});


export default Camera;
