import React, { useEffect, useState, useContext } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Modal, TextInput, Alert, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from './button';
import axios from 'axios';
import { store }  from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

const edamamId = '7ff1ee7e';
const edamamKey = 'aa4824adda205d7ff601301c08816573';

const AddItemModal = ({ setModalVisible, modalVisible }) => {
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


	const [obj, setObj] = useState(null);
	const getInitialFoodOptions = async (userInput) => {
        try {
            // TODO implement 'exact' match
			// TODO multiple options from first API call below
            const data = await axios.get(`https://api.edamam.com/api/food-database/parser?app_id=${edamamId}&app_key=${edamamKey}&ingr=${userInput}&nutrition-type=logging`);
			// data?.data?.hints[0]?.food?.measures?.map(m => console.log(m.label, m.uri))
			// data?.data?.hints?.forEach(h => console.log(h?.food))

			// console.log(data.data, 'DATa')
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

	// useEffect(() => {
	// 	console.log(obj, 'OBJ')
	// }, [obj])



// I GET THE TOTAL DAILY WITH MEASUREMENT

	const [submitted, setSubmitted] = useState(false);
	const [result, setResult] = useState(null);
	const [foodQty, setFoodQty] = useState(null);

	const getSelectedItemsNutrients = async () => {
		setSubmitted(true);

		const nutrients = await axios.post(
			`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${edamamId}&app_key=${edamamKey}`,
			{
				"ingredients": [
					{
						"quantity": 1,
						"measureURI": measurementUri,
						"foodId": selectedItem
					}
					]
			}
		);


		// console.log(nutrients.data, 'LOOK')

		const result = nutrients.data.ingredients[0].parsed.map(({ food, foodContentsLabel, measure, quantity }) => ({ food, foodContentsLabel, measure, quantity }))[0];
		setResult(result);
		setFoodQty(result.quantity);
		
		// console.log(nutrients.data.ingredidents[0].parsed, 'NUTRIENTS')


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


	// useEffect(() => {
	// 	console.log(foodQty, 'foodQty')
	// }, [foodQty])


    return (
		<View style={styles.container}>	
			<View style={{ backgroundColor:'#ddbea9', width: '95%', height: 650, marginTop: 5, alignItems: 'center', paddingTop: 20 }}>
			{
			!submitted ?
			<>
				<Text style={styles.formText}>Enter food below</Text>
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

				{/* best match picker */}
				{userInput && obj ? 
				<View style={{ marginTop: 50 }}>
					<Text style={styles.formText}>Select best match</Text>
					<Picker
						selectedValue={selectedItem}
						// style={{ height: 40 }}
						itemStyle={{ height: 105, width: '100%', alignSelf: 'center' }}
						onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
					>
						{Object.keys(obj).map(key => <Picker.Item label={key} value={obj[key].foodId} key={key} />)}
					</Picker> 
				</View>
				: null}

				{/* measurement picker */}
				{selectedItem ?
				<View style={{ marginTop: 50 }}>
					<Text style={styles.formText}>Select unit of measurment</Text>
					<Picker
							selectedValue={measurementUri}
							// style={{ height: 40}}
							itemStyle={{ height: 105, width: '90%', alignSelf: 'center' }}
							onValueChange={(itemValue, itemIndex) => setMeasurementUri(itemValue)}
						>
							{Object
								.keys(obj)
								.map(key => obj[key])
								.find(item => item.foodId === selectedItem)?.measures
								?.map(({label, uri}) => <Picker.Item label={label} value={uri} key={label} />)}
						</Picker> 
				</View> : null}
	

				
			</>
			:
			result ?
			<View>
				<Text style={styles.formText}>Per </Text>
				<View>
					<TextInput 
						style={styles.input} 
						value={String(foodQty)}
						// onFocus={() => setGrams(null)}
						onChangeText={qty => {
							const qtyToNumber = Number(qty);
							if (!qtyToNumber && qty !== '') {
								Alert.alert('Please enter numbers only.');
							} else {
								setFoodQty(qty);
							}
						}}
						// onSubmitEditing={e => console.log(e, '@@')}
					/> 
				</View>
				<Text style={styles.formText}>{result.measure}</Text>
				<Text style={{ ...styles.formText ,textTransform: 'capitalize' }}>{result.food}</Text>
			</View> : null
			}
		</View>
			
		<View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
			<CustomButton 
				text="CANCEL" 
				onPress={() => {
					// setFoodToLog(null)
					// setUserInput(null)
					// setSelectedItem(null)
					// setMeasurementUri(null)
					// navigation.navigate('Goal');
					setModalVisible(!modalVisible)
				}} 
				style={{ backgroundColor: '#cb997e', padding: 10, width: 150, marginRight: 5 }}
			/>

			<CustomButton 
				text="SUBMIT" 
				onPress={() => {
					if (!selectedItem) {
						Alert.alert('Please select an item from the picker');
					} else if (!measurementUri) {
						Alert.alert('Please select a unit of measurement');
					} else {
						getSelectedItemsNutrients();
					}
				}} 
				style={{ backgroundColor: '#6b705c', padding: 10, width: 150, marginLeft: 5 }}
				// disabled={!selectedItem && !measurementUri}
			/>
			
		</View>
		{
				selectedItem && measurementUri && !submitted ? <Text style={{ ...styles.formText, position: 'absolute', bottom: 50 }}>Looks good, submit</Text> : null
			} 
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
	formText: {
        fontFamily: 'MontserratMedium',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
		width: '100%'
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