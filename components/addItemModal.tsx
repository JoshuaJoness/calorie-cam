import React, { useEffect, useState, useContext } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import CutomButton from './button';
import axios from 'axios';
import { store }  from '../store';

const edamamId = '7ff1ee7e';
const edamamKey = 'aa4824adda205d7ff601301c08816573';

const AddItemModal = ({ setModalVisible, modalVisible, navigation }) => {
	const [userInput, setUserInput] = useState(null);
	const [totalNutrients, setTotalNutrients] = useState(null);
	const [foodToLog, setFoodToLog] = useState(null);
	const [nutrientObj, setNutrientsObj] = useState(null);
	const [foodLabel, setFoodLabel] = useState(null);
	const [grams, setGrams] = useState<number>(100);

	const globalState = useContext(store);
	const { dispatch } = globalState;

	const addFoodToLog = async () => {
        try {
            let foods = await AsyncStorage.getItem('foods') || '[]';
            foods = JSON.parse(foods);
            foods.push(foodToLog);
			console.log(foodToLog, 'FOOD TO LOG')
            await AsyncStorage.setItem('foods', JSON.stringify(foods));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: 'ADD_FOOD_TO_LOG', data: foodToLog });
        }
    };

	const getCaloriesFromPrediction = async (userInput) => {
        try {
            // TODO implement 'exact' match
            const data = await axios.get(`https://api.edamam.com/api/food-database/parser?app_id=${edamamId}&app_key=${edamamKey}&ingr=${userInput}`);
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
            setTotalNutrients(totalNutrients);
        } catch (err) {
            console.log(err);
        }
    };

	useEffect(() => {
		if (totalNutrients) {
			setNutrientsObj({
				label: foodLabel,
				energy: { quantity: String(Math.round(totalNutrients['ENERC_KCAL']?.quantity * grams)), unit:'kcal' } ,
				carbs: { quantity: String(Math.round(totalNutrients['CHOCDF']?.quantity * grams)), unit: 'g' },
				protein: { quantity: String(Math.round(totalNutrients['PROCNT']?.quantity * grams)), unit: 'g' },
				fat: { quantity: String(Math.round(totalNutrients['FAT']?.quantity * grams)), unit: 'g' },
			});
		};	
	}, [totalNutrients]);

	useEffect(() => {
		if (nutrientObj)
			setFoodToLog(nutrientObj);
	}, [nutrientObj]);

    return(
        <View style={{ height: '100%', backgroundColor: '#ffe8d6' }}>
			<View style={{ ...styles.box, marginTop: '40%'  }}>
				<View>
				<Text style={{ fontWeight: 'bold', color:'#6b705c', marginTop: 10, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, fontSize: 18 }}>Enter a food item below: </Text>
				<Text style={{ fontWeight: 'bold', color:'#6b705c', marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, fontSize: 15 }}>(Results are per 100 g)</Text>
				<View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					<Text style={{ ...styles.label, color:'#6b705c' }}>Item Name: </Text> 
					<TextInput
						style={{ ...styles.input }}
						placeholder="Banana..."
						onChangeText={(label) => {
							setFoodToLog({ ...foodToLog, label});
							setUserInput(label);
						}}
						onSubmitEditing={() => getCaloriesFromPrediction(userInput)}
					/>
              	</View>
				<View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					<Text style={{ ...styles.label, color:'#6b705c' }}>Calories: </Text> 
					<TextInput
						style={{ ...styles.input, flex: 1 }}
						placeholder="200"
						keyboardType="numeric"
						value={nutrientObj ? nutrientObj['energy']?.quantity : null}
						onChangeText={(energy) => {
							setNutrientsObj({ ...foodToLog, energy: { quantity: energy, unit: 'kcal' } });
						}}
					/>
				</View>
				<View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					<Text style={{ ...styles.label, color:'#6b705c' }}>Carbs (g): </Text> 
					<TextInput
						style={{ ...styles.input, flex: 1 }}
						placeholder="60"
						keyboardType="numeric"
						value={nutrientObj ? nutrientObj['carbs']?.quantity : null}
						onChangeText={(carbs) => {
							setNutrientsObj({ ...foodToLog, carbs: { quantity: carbs, unit: 'g' } });
						}}
					/>
				</View>
				<View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					<Text style={{ ...styles.label, color:'#6b705c' }}>Protein (g): </Text> 
					<TextInput
						style={{ ...styles.input, flex: 1 }}
						placeholder="20"
						keyboardType="numeric"
						value={nutrientObj ? nutrientObj['protein']?.quantity : null}
						onChangeText={(protein) => {
							setNutrientsObj({ ...foodToLog, protein: { quantity: protein, unit: 'g' } });
						}}
					/>
				</View>
				<View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					<Text style={{ ...styles.label, color:'#6b705c' }}>Fat (g): </Text> 
					<TextInput
						style={{ ...styles.input, flex: 1 }}
						placeholder="2"
						keyboardType="numeric"
						value={nutrientObj ? nutrientObj['fat']?.quantity : null}
						onChangeText={(fat) => {
							setNutrientsObj({ ...foodToLog, fat: { quantity: fat, unit: 'g' } });
						}}
					/>
				</View>
				{/* <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
					
					<Text style={{ ...styles.label, color:'#6b705c' }}>Quantity: </Text> 
		
					<View style={{ display: 'flex' }}>
						<TextInput 
							style={{ ...styles.input }} 
							value={String(grams)}
							keyboardType="numeric"
							onChangeText={grams => {
								const gramsToNumber = Number(grams);
		
									setGrams(gramsToNumber)
	
							}}
						/> 
						<Text style={{ alignSelf:'center', paddingTop: 5, color: '#6b705c' }}>(Change me)</Text>
					</View>

              	</View> */}
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', padding: 10  }}>
				<CutomButton 
					text='Log Item' 
					onPress={() => {
					addFoodToLog();
					setModalVisible(!modalVisible);
					}} 
					style={{ width: 100, height: 30, backgroundColor: '#a5a58d', marginRight: 5 }} 
				/>
				<CutomButton 
					text='Cancel' 
					onPress={() => setModalVisible(!modalVisible)} 
					style={{ width: 100, height: 30, marginLeft: 5 }} 
				/>
			</View>      
			</View>
      </View>
    )
  }

export default AddItemModal

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: '5%'
	},
  box: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderColor: 'black', 
    borderWidth: 1, 
    backgroundColor: '#ddbea9'
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
  label: {
    color: '#cb997e',
    fontWeight: 'bold',
    flex: 1,
  },
    boldText: {
        fontFamily: 'MontserratMedium',
		color: '#6b705c',
		fontSize: 25,
        marginTop: '5%',
        paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
    },
	input: {
    borderColor: '#6b705c', 
    borderBottomWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    fontSize: 17,
    width: 170
	},
})