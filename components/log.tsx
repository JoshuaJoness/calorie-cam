import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet, Modal, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import CutomButton from './button';
import AddItemModal from './addItemModal';
import { store } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Log = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [loggedFoods, setLoggedFoods] = useState([]);
  const [foodToLog, setFoodToLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalDailyCalorieNeeds, setTotalDailyCalorieNeeds] = useState(null);
  const [weight, setWeight] = useState(null);
  const [showMicros, setShowMicros] = useState(null);
  const [reqs, setReqs] = useState(null);
  const [goal, setGoal] = useState(null);

  const globalState = useContext(store);
	const { state, dispatch } = globalState;
  const { foods: foodsFromState } = state;

  // to get log on initial render
  useEffect(() => {
    const getData = async () => {
      const test = await AsyncStorage.getItem('foods');
      const parse = JSON.parse(test);
      await setLoggedFoods(parse);

      const calorieNeeds = await AsyncStorage.getItem('totalDailyCalorieNeeds');
      const parsedCalorieNeeds = JSON.parse(calorieNeeds);
      await setTotalDailyCalorieNeeds(parsedCalorieNeeds);

      const weight = await AsyncStorage.getItem('weight');
      const parsedWeight = JSON.parse(weight);
      await setWeight(parsedWeight);

      const reqs = await AsyncStorage.getItem('dailyReqs');
      const parsedReqs = JSON.parse(reqs);
      await setReqs(parsedReqs);

      const goal = await AsyncStorage.getItem('goal');
      const parsedGoal = JSON.parse(goal);
      await setGoal(parsedGoal);
    }

    getData();
  }, []);

  // to get log when a new food is added to async storage
  useEffect(() => {
    const getData = async () => {
      const test = await AsyncStorage.getItem('foods');
      const parse = JSON.parse(test);
      await setLoggedFoods(parse);
    }

    getData();
  }, [foodsFromState]);

  // set nutritient totals
  useEffect(() => {
      if (loggedFoods) {
        let energy = 0;
        let carbs = 0;
        let protein = 0;
        let fat = 0;
        loggedFoods?.forEach(food => {
            energy += Number(food?.energy?.quantity ? food.energy?.quantity : 0)
            carbs += Number(food?.carbs?.quantity ? food.carbs?.quantity : 0)
            protein += Number(food?.protein?.quantity ? food.protein?.quantity : 0)
            fat += Number(food?.fat?.quantity ? food.fat?.quantity : 0)
        });
        setTotalCalories(energy);
        setTotalCarbs(carbs);
        setTotalProtein(protein);
        setTotalFat(fat);
      }
  }, [loggedFoods]);

  const clearLog = () => {
      AsyncStorage.removeItem('foods');
      setLoggedFoods([])
      setTotalCalories(0)
      setTotalCarbs(0)
      setTotalProtein(0)
      setTotalFat(0)

      dispatch({ type: 'CLEAR_MICROS' })
  };  

  const calorieGoals = () => {
    if (goal === 'maintainWeight') {
      return totalDailyCalorieNeeds;
    } else if (goal === 'loseWeight') {
      return Math.round(totalDailyCalorieNeeds - 500);
    } else {
      return Math.round(totalDailyCalorieNeeds + 500);
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Daily Log</Text>
      <View style= {{ height: '65%' }}>
          <View style={styles.labelsBox}>
            <View style={{ display:'flex', flexDirection:'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c' }} >
              <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text>
              <Text style={{ ...styles.label, textAlign: 'center' }}>Calories</Text>
              <Text style={{ ...styles.label, textAlign: 'center' }}>Carbs</Text>
              <Text style={{ ...styles.label, textAlign: 'center' }}>Protein</Text>
              <Text style={{ ...styles.label, textAlign: 'center' }}>Fat</Text>
            </View>
          </View>

          {!showMicros ? <ScrollView style={styles.box}>    
            {loggedFoods?.length > 0 ? loggedFoods?.map((food,i) => <View style={{ height: 50, display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6', borderBottomWidth: 1 /*i === loggedFoods?.length - 1 ? 0 : 1 */ }} key={i}>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }} numberOfLines={1}>{food?.label}</Text>
                {/* <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>({food?.grams} g)</Text> */}
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.energy?.quantity ? Math.round(food?.energy?.quantity)  : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.carbs?.quantity ? Math.round(food?.carbs?.quantity) : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.protein?.quantity ? Math.round(food?.protein?.quantity) : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.fat?.quantity ? Math.round(food?.fat?.quantity) : '-'}</Text>
              </View>
            ) : null}
          </ScrollView> : null}

          {/* <TouchableOpacity style={{ alignSelf: 'center', padding: 5, borderLeftWidth: 1, borderRightWidth: 1, width: '90%' }} onPress={() => loggedFoods ? setShowMicros(!showMicros) : null}>
            <Text style={{ ...styles.microsLabel, textDecorationLine: 'underline', textAlign: 'center' }}>{!showMicros ? 'View micros' : 'hide micros'}</Text>
          </TouchableOpacity>  */}

{/*          
          {showMicros ?  <ScrollView>
            {loggedFoods?.map(food => {
              return Object.keys(food)
                .filter(nutrient => nutrient !== 'grams' && nutrient !== 'label' && nutrient !== 'energy' && nutrient !== 'carbs' && nutrient !== 'protein' && nutrient !== 'fat' && nutrient !== 'saturated' && nutrient !== 'trans')
                .map(nutri => {
                  console.log(loggedFoods, '****')
                  return <View 
                  style={{
                    display:'flex', 
                    flexDirection:'row', 
                    padding:10, 
                    borderWidth: 1,
                    // borderBottomWidth: i === Object.keys(totalNutrients).length - 1 ? 1 : 0,
                    borderColor:'black', 
                    backgroundColor: '#ffe8d6', 
                    width: '90%', 
                    alignSelf: 'center',
                  }}
                  key={nutri}
              >
                <View style={{ display: 'flex', flexDirection: 'row', alignContent:'space-between'}}>
                    <Text style={{ ...styles.microsLabel, alignSelf:'flex-start' }}>{nutri}</Text>
                    <Text style={{ ...styles.microsLabel, alignSelf:'center' }}>{food[nutri].quantity.toFixed(2) * food.grams || 0}</Text>
                    <Text style={{ ...styles.microsLabel, alignSelf: 'flex-end' }}>{food[nutri].unit || ''}</Text>
                </View>
              </View>
                })
            }) }</ScrollView>: null}   */}
            

          <View style={styles.totalsBox}>
              <View style={{ display:'flex', flexDirection:'row', padding:10, borderTopWidth: 1, borderColor:'black' }}>
              <Text style={{ ...styles.label, color:'#6b705c' }}>Totals:</Text>
              <Text style={{ ...styles.label, color:'#6b705c', textAlign: 'center' }}>{Math.round(totalCalories)} </Text>
              <Text style={{ ...styles.label, color:'#6b705c', textAlign: 'center' }}>{Math.round(totalCarbs)} g</Text>
              <Text style={{ ...styles.label, color:'#6b705c', textAlign: 'center' }}>{Math.round(totalProtein)} g</Text>
              <Text style={{ ...styles.label, color:'#6b705c', textAlign: 'center' }}>{Math.round(totalFat)} g</Text>
          </View>

          <View style={{ display:'flex', flexDirection:'row', padding:10, borderTopWidth: 1, borderColor:'black', backgroundColor: '#6b705c' }}>
              <Text style={{ ...styles.label, color:'#ffe8d6' }}>Goals:</Text>
              <Text style={{ ...styles.label, color:'#ffe8d6', textAlign: 'center' }}>{calorieGoals()} kcal</Text>
              <Text style={{ ...styles.label, color:'#ffe8d6', textAlign: 'center' }}></Text>
              <Text style={{ ...styles.label, color:'#ffe8d6', textAlign: 'center' }}>{Math.round(weight)} g</Text>
              <Text style={{ ...styles.label, color:'#ffe8d6', textAlign: 'center' }}></Text>
          </View>



        </View>
{/* 
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '2%' }} onPress={() => loggedFoods ? setShowMicros(!showMicros) : null}>
            <Text style={{ ...styles.microsLabel, textDecorationLine: 'underline' }}>{!showMicros ? 'View micros' : 'hide micros'}</Text>
        </TouchableOpacity> 
         */}
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
		// paddingTop: '5%'
	},
  box: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    backgroundColor: '#ffe8d6',
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
  microsLabel: {
    color: '#6b705c',
    fontWeight: 'bold',
    marginLeft: 2,
  },
})