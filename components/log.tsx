import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet, Modal, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import CutomButton from './button';
import AddItemModal from './addItemModal';
import { store } from '../store';

const Log = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [loggedFoods, setLoggedFoods] = useState([]);
  const [foodToLog, setFoodToLog] = useState({ });
  const [modalVisible, setModalVisible] = useState(false);
  const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);
  const [weight, setWeight] = useState(null);

  const globalState = useContext(store);
	const { state } = globalState;
  const { foods: foodsFromState } = state;

  // to get log on inital render
  useEffect(() => {
    const getData = async () => {
      const test = await AsyncStorage.getItem('foods');
      const parse = JSON.parse(test);
      console.log(parse)
      await setLoggedFoods(parse);

      const calorieNeeds = await AsyncStorage.getItem('totalDailyCalorieNeeds');
      const parsedCalorieNeeds = JSON.parse(calorieNeeds);
      await setTotalDailyCalorieNeeds(parsedCalorieNeeds);

      const weight = await AsyncStorage.getItem('weight');
      const parsedWeight = JSON.parse(weight);
      await setWeight(parsedWeight);
    }
    getData();

  }, []);

  // to get log when a new food is added to async storage
  useEffect(() => {
    const getData = async () => {
      const test = await AsyncStorage.getItem('foods');
      const parse = JSON.parse(test);
      console.log(parse)
      await setLoggedFoods(parse);
    }
    getData();

  }, [foodsFromState]);

  // set nutritient totals
  useEffect(() => {
      let energy = 0;
      let carbs = 0;
      let protein = 0;
      let fat = 0;
      loggedFoods.forEach(food => {
          energy += Number(food.energy?.quantity ? food.energy?.quantity : 0)
          carbs += Number(food.carbs?.quantity ? food.carbs?.quantity : 0)
          protein += Number(food.protein?.quantity ? food.protein?.quantity : 0)
          fat += Number(food.fat?.quantity ? food.fat?.quantity : 0)
      });
      setTotalCalories(energy);
      setTotalCarbs(carbs);
      setTotalProtein(protein);
      setTotalFat(fat);
  }, [loggedFoods]);

  const clearLog = () => {
      AsyncStorage.removeItem('foods');
      setLoggedFoods([])
      setTotalCalories(0)
      setTotalCarbs(0)
      setTotalProtein(0)
      setTotalFat(0)
  };


  // useEffect(() => {
  //   console.log(foodToLog, 'FOOD TO LOG')
  // }, [foodToLog])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Daily Log</Text>
      <View style= {{ height: '65%' }}>
        <View style={styles.labelsBox}>
          <View style={{ display:'flex', flexDirection:'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c' }} >
            <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.label}>Carbs</Text>
            <Text style={styles.label}>Protein</Text>
            <Text style={styles.label}>Fat</Text>
          </View>
        </View>

        <ScrollView style={styles.box}>    
          {loggedFoods.map((food,i) => <View style={{ height: 50, display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6', borderBottomWidth: i === loggedFoods.length - 1 ? 0 : 1 }} key={i}>
              <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food.label}</Text>
              <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food?.energy?.quantity ? Math.round(food.energy?.quantity)  : '-'}</Text>
              <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food?.carbs?.quantity ? Math.round(food.carbs?.quantity) : '-'}</Text>
              <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food?.protein?.quantity ? Math.round(food.protein?.quantity) : '-'}</Text>
              <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food?.fat?.quantity ? Math.round(food.fat?.quantity) : '-'}</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.totalsBox}>
            <View style={{ display:'flex', flexDirection:'row', padding:10, borderTopWidth: 1, borderColor:'black' }}>
            <Text style={{ ...styles.label, color:'#6b705c' }}>Totals:</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCalories)} /</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCarbs)} g</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalProtein)} g</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalFat)} g</Text>
        </View>

        <View style={{ display:'flex', flexDirection:'row', padding:10, borderTopWidth: 1, borderColor:'black', backgroundColor: '#6b705c' }}>
            <Text style={{ ...styles.label, color:'#ffe8d6' }}>Goals:</Text>
            <Text style={{ ...styles.label, color:'#ffe8d6' }}>{Math.round(totalDailyCalorieNeeds)} kcal</Text>
            <Text style={{ ...styles.label, color:'#ffe8d6' }}></Text>
            <Text style={{ ...styles.label, color:'#ffe8d6' }}>{Math.round(weight)} g</Text>
            <Text style={{ ...styles.label, color:'#ffe8d6' }}></Text>
          </View>
        </View>
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
            setFoodToLog={setFoodToLog}
            foodToLog={foodToLog}
          />
        </Modal>

        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', padding: 10, marginTop: 30  }}>
            <CutomButton text='Log Item' onPress={() => setModalVisible(!modalVisible)} style={{ width: 100, height: 30, backgroundColor: '#a5a58d', marginRight: 5 }} />
            <CutomButton text='Clear Log' onPress={clearLog} style={{ width: 100, height: 30, marginLeft: 5 }} />
        </View>
    </View>
    )
  }

export default Log

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
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    backgroundColor: '#ddbea9',
    height: '10%'
  },
  totalsBox: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderColor: 'black', 
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#ddbea9'
  },
  labelsBox: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
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