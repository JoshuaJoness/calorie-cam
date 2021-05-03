import React, { useState, useContext, useRef, useEffect } from 'react'
import { StyleSheet, Text, Picker, View, Image, ScrollView, TextInput, AsyncStorage, Alert, Modal, Dimensions } from 'react-native'
import axios from 'axios'
import moment from 'moment'
import { Camera } from 'expo-camera';
import CustomButton from './button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store }  from '../store';
import AddItemModal from './addItemModal';

const windowHeight = Dimensions.get('window').height;

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
        try {
            const data = await app.models.predict("bd367be194cf45149e75f01d59f77ba7", { base64:image });
            const foodPredictions = data.outputs[0].data.concepts;
            setFoodPredictions(foodPredictions);
            return;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setSelectedItem(foodPredictions[0]?.name)
    }, [foodPredictions])

    const addFoodToLog = async (foodToLog) => {
        try {
            let foods = await AsyncStorage.getItem('foods') || '[]';
            foods = JSON.parse(foods);
            foodToLog.grams = grams,
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
            try {
                const { status } = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // TODO handle no camera permsision granted

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (modalVisible)
            navigation.navigate('Log');
    }, [modalVisible]);

	return(
		<View style={styles.container}>
            <Text style={styles.title}>Calorie Cam</Text>
            <View style={{ backgroundColor:'#ddbea9', width: '90%', height: windowHeight <= 667 ? 300 : 400, paddingBottom: totalNutrients ? '7%' : 0 }}>
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
                                <Text style={styles.value}>{Math.round(totalNutrients?.ENERC_KCAL?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients?.ENERC_KCAL?.unit || ''}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients?.CHOCDF?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients?.CHOCDF?.unit || ''}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients?.PROCNT?.quantity * grams) || ''}</Text>
                                <Text style={styles.value}>{totalNutrients?.PROCNT?.unit}</Text>
                            </View>
                            <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.value}>{Math.round(totalNutrients?.FAT?.quantity * grams) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients?.FAT?.unit || ''}</Text>
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
                                            <Text style={styles.value}>{(totalNutrients[key]?.quantity * grams).toFixed(2) || 0}</Text>
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

            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AddItemModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    cameraPrediction={selectedItem}
                />
            </Modal>

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
                                onPress={() => setModalVisible(!modalVisible)}
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
      marginTop: windowHeight <= 667 ? 5 : 25,
      paddingBottom: 50, // TODO this is a temp fix for white space at bottom
    },
    title: {
        fontFamily: 'Pacifico',
		color: '#6b705c',
		fontSize: 35,
		paddingLeft: '10%',
		paddingRight: '10%',
        marginBottom: windowHeight <= 667 ? 15 : 30,
		textAlign: 'center',
    },
    image: { 
        width: '100%', 
        height: windowHeight <= 667 ? 300 : 400, 
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
        height: '100%',
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
