import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, Picker, View, Image, ScrollView, TouchableHighlight, StatusBar, TextInput, AsyncStorage, Button, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment'

import { Camera } from 'expo-camera';

import CustomButton from './button';

{/* Clarifai Import to recognize images */}
const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'
});

const CalorieCam = (props) => {
	const [image, setImage] = useState()
	const [imageToDisplay, setImageToDisplay] = useState()
	const [label, setLabel] = useState('')
	// const [calories, setCalories] = useState(0)
	// const [carbs, setCarbs] = useState(0)
	// const [protein, setProtein] = useState(0)
	// const [fat, setFat] = useState(0)
    const [grams, setGrams] = useState('100')
    const [loggedFoods, setLoggedFoods] = useState([])
    const [date, setDate] = useState(moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    const [show, setShow] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [object, setObject] = useState({label:'',calories:0,carbs:0,protein:0,fat:0})
    const [foodPredictions, setFoodPredictions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dailyNutrientReqs, setDailyNutrientReqs] = useState(null);
    const [totalNutrients, setTotalNutrients] = useState(null);
    let arr = []

    // const takePicture = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA);
        // const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
        // allowsEditing: false,
        //         base64: true
        // });
        // setImage(base64);
        // setImageToDisplay(uri)
    // };

    // {/* This is the function to change the nutrient amounts based on the grams selected by the user*/}
    // const onChangeText = (amount) => {
    //     setGrams(amount)
    //     setObject({ label:label, calories:calories*amount, carbs:carbs*amount, protein:protein*amount, fat:fat*amount })
    // }


        const predict = async () =>	{
            const data = await app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image});
            const foodPredictions = data.outputs[0].data.concepts;
            setFoodPredictions(foodPredictions);
            return;
                }

        
        const edamamId = '7ff1ee7e'
        const edamamKey = 'aa4824adda205d7ff601301c08816573';
        

        const getCalories = async () => {
            try {
                const data = await axios.get(`https://api.edamam.com/api/food-database/parser?app_id=${edamamId}&app_key=${edamamKey}&ingr=${selectedItem}`);
                // const nutrients = data.data.hints[0].food.nutrients;
                const foodId = data.data.hints[0].food.foodId;

                const nutrients = await axios.post(
                    `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${edamamId}&app_key=${edamamKey}`,
                    {
                        "ingredients": [
                            {
                              "quantity": 1,
                              "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                              "foodId": foodId
                            }
                          ]
                    }
                )

                const totalDailyPercentages = nutrients.data.totalDaily;
                const totalNutrients = nutrients.data.totalNutrients;
                
                setDailyNutrientReqs(totalDailyPercentages);
                setTotalNutrients(totalNutrients);
                console.log(totalNutrients)
            } catch (err) {
                console.log(err)
            }
        };
 
    // const clear = () => {
    // setImage()
    // setImageToDisplay()
    // setLabel('')
    // setCarbs(0)
    // setProtein(0)
    // setFat(0)
    // setCalories(0)
    // setGrams('100')
    // setObject({label:'',calories:0,carbs:0,protein:0,fat:0})
    // setShow(false)
    // setShowResults(false)
    // }

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

  const [hasPermission, setHasPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

  const cameraRef = useRef(null)


  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (imageToDisplay || image) {
//         setLoading(false);
//     }
//   }, [imageToDisplay, image])

    // const { ENERC_KCAL: cals, CHOCDF: carbs, FAT: fat, PROCNT: protein } = totalNutrients || []; // TODO HERE, extracting carbs, etc. for display

	return(
		<View style={styles.container}>
            <Text style={styles.title}>Calorie Cam</Text>
            <View style={{ backgroundColor:'#ddbea9', width: '90%', height: 400 }}>
                {
                totalNutrients ? 
                <View>
                    <Text>NUTRIENT RESULTS</Text>
                    <Text>NUTRIENT RESULTS</Text>
                    <Text>NUTRIENT RESULTS</Text>
                    <Text>NUTRIENT RESULTS</Text>
                </View>
                :
                foodPredictions.length > 0 ? 
                <View style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                    <Text style={styles.text}>We've identified this as a(n): </Text>
                    <Picker
                        selectedValue={selectedItem}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
                    >
                        {foodPredictions.map(({name}) => <Picker.Item label={name} value={name} key={name} />)}
                    </Picker>
                </View>
                
                :
                imageToDisplay ? 
                    <Image style={styles.image} source={{ uri: imageToDisplay }} />
                    :
                    <Camera 
                        type={Camera.Constants.Type.back} 
                        style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%' }}
                        ref={cameraRef}
                    />
                    
                }
            </View>
            <View style={styles.buttonContainer}>
                    {!imageToDisplay ? 
                        <CustomButton 
                            text='Take Picture'
                            onPress={async () => {
                                setLoading(true)
                                    if (cameraRef) {
                                        try {
                                            const { cancelled, uri, base64 } = await cameraRef.current.takePictureAsync({ base64: true });
                                            setImageToDisplay(uri);
                                            setImage(base64);
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }
                                }
                            }
                            style={{ width: 250 }}
                        />
                        :
                        <CustomButton 
                            text='Retake'
                            onPress={() => {
                                setImage(null);
                                setImageToDisplay(null);
                                setLoading(false);
                                setFoodPredictions([]);
                            }}
                            style={{ width: 250 }}
                        />
                        }          
                        {
                            foodPredictions.length > 0 ? 
                            <CustomButton 
                                text='Get Calories'
                                onPress={getCalories}
                                style={{ width: 250, backgroundColor: '#6b705c' }}
                            />
                            :
                            <CustomButton 
                                text='Submit'
                                onPress={predict.bind(this)}
                                style={{ width: 250, backgroundColor: '#6b705c' }}
                            />
                        }
                </View>
			{/* {
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
            } */}
            </View>
    )
} 

const styles = StyleSheet.create({
    buttonContainer: { 
      display:'flex', 
      flexDirection:'column', 
      alignItems: 'flex-end',
      marginLeft: 'auto', 
      marginRight: 'auto',
      marginTop: 25,
      paddingBottom: 50, // TODO this is a temp fix for white space at bottom
    },
    title: {
        fontFamily: 'Pacifico',
		color: '#6b705c',
		fontSize: 35,
		paddingLeft: '10%',
		paddingRight: '10%',
        marginBottom: 30,
		textAlign: 'center',
    },
    image: { 
        width: '100%', 
        height: 400, 
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ECECEC', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5 },
    container:{
        backgroundColor: '#ffe8d6',
        paddingTop: '5%',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'MontserratMedium',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    picker: {
        // width: 150
        // marginTop: -50
    }
});


export default CalorieCam;
