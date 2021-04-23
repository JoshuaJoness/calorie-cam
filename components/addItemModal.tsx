import React, { useEffect, useState, useContext } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Modal, TextInput, Alert, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import CutomButton from './button';
import axios from 'axios';
import { store }  from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

const edamamId = '7ff1ee7e';
const edamamKey = 'aa4824adda205d7ff601301c08816573';

const AddItemModal = ({ setModalVisible, modalVisible, navigation }) => {
	const [userInput, setUserInput] = useState(null);
	const [totalNutrients, setTotalNutrients] = useState(null);
	const [foodToLog, setFoodToLog] = useState(null);
	const [nutrientObj, setNutrientsObj] = useState(null);
	const [foodLabel, setFoodLabel] = useState(null);
	const [grams, setGrams] = useState<number>(100);
	const [dailyNutrientReqs, setDailyNutrientReqs] = useState(null);

	const globalState = useContext(store);
	const { dispatch } = globalState;

	const addFoodToLog = async () => {
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
            dispatch({ type: 'ADD_FOOD_TO_LOG', data: foodToLog });
			dispatch({ type: 'ADD_MICROS' });
        }
    };


	const [obj, setObj] = useState({default:{}});
	const getInitialFoodOptions = async (userInput) => {
        try {
            // TODO implement 'exact' match
			// TODO multiple options from first API call below
            const data = await axios.get(`https://api.edamam.com/api/food-database/parser?app_id=${edamamId}&app_key=${edamamKey}&ingr=${userInput}&nutrition-type=logging`);
			// data?.data?.hints[0]?.food?.measures?.map(m => console.log(m.label, m.uri))
			// data?.data?.hints?.forEach(h => console.log(h?.food))
			const obj = {};
			data?.data?.hints.forEach(hint => obj[hint.food.label] = { foodId: hint.food.foodId, measures: hint.measures, nutrients: hint.food.nutrients });
			// console.log(data?.data?.hints, '*****')
			setObj(obj);
			// console.log(obj, ' LOOK HExRE  ');
			// TODO implement measure selection
            // const foodId = data?.data?.hints[0]?.food?.foodId;
			// const foodLabel = data?.data?.hints[0]?.food?.label;
            // setFoodLabel(foodLabel); 

			// TODO show image
        } catch (err) {
            console.log(err);
        }
    };

	const getSelectedItemsNutrients = async () => {
		console.log(selectedItem, "ITEM")

		console.log(obj, "OBJ")
		// const nutrients = await axios.post(
		// 	`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${edamamId}&app_key=${edamamKey}`,
		// 	{
		// 		"ingredients": [
		// 			{
		// 				"quantity": 1,
		// 				"measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
		// 				"foodId": foodId
		// 			}
		// 			]
		// 	}
		// )


		// 	// console.log(nutrients, 'NUTRIENTS')
		// 	// split this method,
		// 	// call nutrients ONLY after best option has been selected .. .

		// const totalDailyPercentages = nutrients.data.totalDaily;
		// const totalNutrients = nutrients.data.totalNutrients;
		// setDailyNutrientReqs(totalDailyPercentages);
		// setTotalNutrients(totalNutrients);
	}

	useEffect(() => {
		if (totalNutrients) {
			const obj = {}
			Object.keys(totalNutrients).forEach(nutrient => {

				obj[totalNutrients[nutrient].label.toLowerCase()] = {
					quantity: totalNutrients[nutrient].quantity * grams, 
					unit: totalNutrients[nutrient].unit 
				}
			})

			setNutrientsObj({
				...nutrientObj,
				...obj,
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

	const [selectedItem, setSelectedItem] = useState(null)
	const [measurementUri, setMeasurementUri] = useState(null)

    return (
		<View style={styles.container}>
			<View style={{ backgroundColor:'#ddbea9', width: '95%', height: 600, marginTop: 75, alignItems: 'center', paddingTop: 20 }}>
				<Text style={styles.text}>Enter food below</Text>
				<TextInput 
					style={{ ...styles.input, marginTop: 50, fontSize: 25 }} 
					value={userInput} 	
					placeholder={'Banana'}
					onChangeText={(label) => {
						setFoodToLog({ ...foodToLog, label});
						setUserInput(label);
					}}
					onSubmitEditing={() => getInitialFoodOptions(userInput)}
				/>
				{
				userInput ? 
				<View style={{ marginTop: 75 }}>
					<Text style={styles.text}>Select best match</Text>
					<Picker
						selectedValue={selectedItem}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
					>
						{Object.keys(obj).map(key => <Picker.Item label={key} value={obj[key].foodId} key={key} />)}
					</Picker> 
				</View>
				:
				null
			}

			<CutomButton text="SUBMIT" onPress={() => getSelectedItemsNutrients()} style={{ backgroundColor: '#6b705c', padding: 10, width: 150 }} />
			</View>
			
		
		</View>

	)
}

export default AddItemModal

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: 50,
		display:'flex', 
		alignItems: 'center'
		// flexDirection:'column', 
		// alignItems: 'flex-end',
		// marginLeft: 'auto', 
		// marginRight: 'auto',
		// marginTop: 25,
		// paddingBottom: 50, // TODO this is a temp fix for white space at bottom
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
	fontFamily: 'MontserratMedium',
    borderBottomWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    fontSize: 17,
    width: 170
	},
})

// {
// 	selectedItem && obj[selectedItem] ?
// 	<View>
// 	{/* <TouchableOpacity onPress={() => console.log(obj[selectedItem].map({label}), 'selectedItem')}><Text>TEST</Text></TouchableOpacity> */}
// 	<Text style={styles.text}>Now select your unit of measurment</Text>
// 	<Picker
// 			selectedValue={measurementUri}
// 			style={styles.picker}
// 			onValueChange={(itemValue, itemIndex) => setMeasurementUri(itemValue)}
// 		>
// 			{obj[selectedItem].measures.map(({label, uri}) => <Picker.Item label={label} value={uri} key={label} />)}
// 		</Picker> 
// </View>
// :
// null}