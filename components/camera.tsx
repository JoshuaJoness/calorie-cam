import React, { useState, useContext, useRef, useEffect } from 'react'
import { StyleSheet, Text, Picker, View, Image, ScrollView, TextInput, AsyncStorage, Alert } from 'react-native'
import axios from 'axios'
import moment from 'moment'
import { Camera } from 'expo-camera';
import CustomButton from './button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store }  from '../store';


const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '6e326e5cab504a7bb99b3e622c9d9c8e'});

const edamamId = '7ff1ee7e';
const edamamKey = 'aa4824adda205d7ff601301c08816573';

const CalorieCam = ({ navigation }) => {
    const [image, setImage] = useState()
	const [imageToDisplay, setImageToDisplay] = useState()
    const [foodPredictions, setFoodPredictions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dailyNutrientReqs, setDailyNutrientReqs] = useState(null);
    const [totalNutrients, setTotalNutrients] = useState(null);
    const [foodLabel, setFoodLabel] = useState(null);
    const [grams, setGrams] = useState<number>(100);
    const [showMicros, setShowMicros] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);

    const globalState = useContext(store);
	const { dispatch } = globalState;

    const cameraRef = useRef(null);

    const predictFood = async () =>	{
        const data = await app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64:image});
        const foodPredictions = data.outputs[0].data.concepts;
        setFoodPredictions(foodPredictions);
        return;
    };
        
    const getCaloriesFromPrediction = async () => {
        try {
            // TODO implement 'exact' match
            const data = await axios.get(`https://api.edamam.com/api/food-database/parser?app_id=${edamamId}&app_key=${edamamKey}&ingr=${selectedItem}`);
            // const nutrients = data.data.hints[0].food.nutrients;
            const foodId = data.data.hints[0].food.foodId;
            const foodLabel = data.data.hints[0].food.label;
            setFoodLabel(foodLabel);

            const nutrients = await axios.post(
                `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${edamamId}&app_key=${edamamKey}`,
                {
                    "ingredients": [
                        {
                            "quantity": 1,
                            "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                            "foodId": foodId
                        }
                        ]
                }
            )
            const totalDailyPercentages = nutrients.data.totalDaily;
            const totalNutrients = nutrients.data.totalNutrients;
            
            setDailyNutrientReqs(totalDailyPercentages);
            setTotalNutrients(totalNutrients);
            // setNutrientKeys(Object.keys(totalNutrients))
        } catch (err) {
            console.log(err);
        }
    };

    const addFoodToLog = async (foodToLog) => {
        try {
            let foods = await AsyncStorage.getItem('foods') || '[]';
            foods = JSON.parse(foods);
            foodToLog.grams = grams,
            console.log(foodToLog, 'CAM LOG')
            foods.push(foodToLog);
            await AsyncStorage.setItem('foods', JSON.stringify(foods));
            await AsyncStorage.setItem('dailyReqs', JSON.stringify(dailyNutrientReqs));
        } catch (err) {
            console.log(err);
        } finally {
            setImage(null);
            setImageToDisplay(null);
            setLoading(false);
            setFoodPredictions([]);
            setTotalNutrients(null);
            setFoodLabel(null);
            setGrams(100);
            setShowMicros(false);

            dispatch({ type: 'ADD_FOOD_TO_LOG', data: foodToLog });
            dispatch({ type: 'ADD_MICROS' });

            navigation.navigate('Log');
        }
    };

    // request camera permissions
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    // TODO handle no camera permsision granted

	return(
		<View style={styles.container}>
            <Text style={styles.title}>Calorie Cam</Text>
            <View style={{ backgroundColor:'#ddbea9', width: '90%', height: 400, paddingBottom: totalNutrients ? '7%' : 0 }}>
                {
                totalNutrients ? 
                <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '5%', paddingBottom: '5%' }}>
                        <Text style={{ ...styles.text, textAlign: 'left' }}>Per </Text>
                        <View>
                            <TextInput 
                                style={styles.input} 
                                value={!grams ? '' :String(grams)}
                                onFocus={() => setGrams(null)}
                                onChangeText={grams => {
                                    const gramsToNumber = Number(grams);
                                    if (!gramsToNumber && grams !== '') {
                                        Alert.alert('Please enter numbers only.');
                                        setGrams(null);
                                    } else {
                                        setGrams(gramsToNumber)
                                    }
                                }}
                            /> 
                        </View>
                        <Text style={styles.text}>grams</Text>
                    </View>
                    <Text style={{ ...styles.text, textAlign: 'left' }}>{foodLabel} contains:</Text>

                    {totalNutrients ? 
                        <View style={{ display:'flex', flexDirection: 'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c', width: '90%', alignSelf:'center', marginTop: '5%' }} >
                            {/* <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text> */}
                            <Text style={styles.label}>Calories</Text>
                            <Text style={styles.label}>Carbs</Text>
                            <Text style={styles.label}>Protein</Text>
                            <Text style={styles.label}>Fat</Text>
                        </View> 
                    : null}

                    {totalNutrients ? 
                        <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients.ENERC_KCAL?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients.ENERC_KCAL.unit || ''}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients.CHOCDF?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients.CHOCDF.unit || ''}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients.PROCNT?.quantity * grams) || ''}</Text>
                                <Text style={styles.value}>{totalNutrients.PROCNT?.unit}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients.FAT?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients.FAT.unit || ''}</Text>
                            </View>    
                        </View>
                    : null}

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '2%' }} onPress={() => setShowMicros(!showMicros)}>
                        <Text style={{ ...styles.value, textDecorationLine: 'underline' }}>{!showMicros ? 'View micros' : 'hide micros'}</Text>
                    </TouchableOpacity>

                    {showMicros ? 
                        Object.keys(totalNutrients)
                            .filter(key => key !== 'ENERC_KCAL' && key !== 'CHOCDF' && key !== 'PROCNT' && key !== 'FAT')
                            .map((key, i) => {
                                return (
                                    // <View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
                                    //     <Text style={{ ...styles.label, color:'#6b705c' }}>Totals:</Text>
                                    //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCalories)}</Text>
                                    //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCarbs)} g</Text>
                                    //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalProtein)} g</Text>
                                    //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalFat)} g</Text>
                                    // </View>
                            <View 
                                style={{
                                    display:'flex', 
                                    flexDirection:'row', 
                                    padding:10, 
                                    borderWidth: 1,
                                    borderBottomWidth: i === Object.keys(totalNutrients).length - 1 ? 1 : 0,
                                    borderColor:'black', 
                                    backgroundColor: '#ffe8d6', 
                                    width: '90%', 
                                    alignSelf: 'center',
                                }}
                            >
                                <Text style={{ ...styles.value, flex: 1.5 }}>{totalNutrients[key].label}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                    <Text style={styles.value}>{totalNutrients[key]?.quantity.toFixed(2) * grams || 0}</Text>
                                    <Text style={styles.value}>{totalNutrients[key]?.unit || ''}</Text>
                                </View>
                            </View>
                            )
                        })  
                    : null}             
                </ScrollView>
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
                    {
                    totalNutrients ? 
                    <CustomButton 
                            text='Cancel'
                            onPress={() => {
                                setImage(null);
                                setImageToDisplay(null);
                                setLoading(false);
                                setFoodPredictions([]);
                                setTotalNutrients(null);
                                setFoodLabel(null);
                                setGrams(100);
                            }}
                            style={{ width: 250 }}
                        />
                    :
                    !imageToDisplay ? 
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
                            totalNutrients ? 
                            <CustomButton 
                                text='Log Item'
                                onPress={() => {
                                    const foodToLog = { 
                                        label: foodLabel,
                                        
                                     }
                                    Object.keys(totalNutrients).forEach(key => {
                                        const labelToLog = totalNutrients[key].label.toLowerCase()
                                        foodToLog[labelToLog] = { quantity: totalNutrients[key].quantity * grams, unit: totalNutrients[key].unit }

                                        addFoodToLog(foodToLog);

                                        // setImage(null);
                                        // setImageToDisplay(null);
                                        // setLoading(false);
                                        // setFoodPredictions([]);
                                        // setTotalNutrients(null);
                                        // setFoodLabel(null);
                                        // setGrams(100);

                                        // dispatch({ type: 'ADD_FOOD_TO_LOG', data: foodToLog });

                                        // navigation.navigate('Log');
                                    }) 
                                }}
                                style={{ width: 250, backgroundColor: '#6b705c' }}
                            /> 
                            :
                            foodPredictions.length > 0 ? 
                            <CustomButton 
                                text='Get Calories'
                                onPress={getCaloriesFromPrediction}
                                style={{ width: 250, backgroundColor: '#6b705c' }}
                            />
                            :
                            <CustomButton 
                                text='Submit'
                                onPress={predictFood.bind(this)}
                                style={{ width: 250, backgroundColor: '#6b705c' }}
                            />
                        }
                </View>
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
    input: {
		backgroundColor: '#ddbea9',
		opacity: 1,
		borderBottomColor: '#6B705C',
		borderBottomWidth: 2,
		borderRadius: 4,
        // height: 45,
        width: 50,
        // marginTop: '5%',
        fontSize: 25,
        color: '#a5a58d',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
      label: {
        color: '#cb997e',
        fontWeight: 'bold',
        flex: 1,
      },
      value: {
        color: '#6b705c',
        fontWeight: 'bold',
        marginLeft: 2,
      },
});


export default CalorieCam;


// {Object.keys(totalNutrients).map(key => {
//     if (totalNutrients[key].label === 'Energy' || totalNutrients[key].label === 'Fat' || totalNutrients[key].label === 'Protein' || totalNutrients[key].label === 'Carbs') {
//         return (
//             <View></View>
//             // <View style={{ display: 'flex', flexDirection: 'row' }}  key={totalNutrients[key]}>
//             //     {/* <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food.label}</Text> */}
//             //     <Text>{totalNutrients[key].label}</Text>
//             //     <Text>{Math.round(totalNutrients[key].quantity) * grams}</Text>
//             //     <Text>{totalNutrients[key].unit}</Text>
//             // </View>
//         )
//     } else {
//         return null;
//     }
// })}
