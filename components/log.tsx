import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, AsyncStorage, StyleSheet, Modal, Dimensions } from 'react-native';
import CustomButton from './button';
import AddItemModal from './addItemModal';
import { store } from '../store';

const windowHeight = Dimensions.get('window').height;

const Log = ({ navigation }) => {
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
        try {
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
          // const parsedGoal = JSON.parse(goal);
          await setGoal(goal);
        } catch (err) {
          console.log(err);
        }
      }

      getData();
  }, []); 

  // to get log when a new food is added to async storage
  useEffect(() => {
    const getData = async () => {
      try {
        const test = await AsyncStorage.getItem('foods');
        const parse = JSON.parse(test);
        await setLoggedFoods(parse);
      } catch (err) {
        console.log(err);
      }
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
            energy += Number(food?.Energy?.quantity ? food.Energy?.quantity : 0)
            carbs += Number(food?.Carbs?.quantity ? food.Carbs?.quantity : 0)
            protein += Number(food?.Protein?.quantity ? food.Protein?.quantity : 0)
            fat += Number(food?.Fat?.quantity ? food.Fat?.quantity : 0)
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
  };

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

          <ScrollView style={styles.box}>    
            {loggedFoods?.length > 0 ? loggedFoods?.map((food,i) => <View style={{ height: 50, display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6', borderBottomWidth: 1 /*i === loggedFoods?.length - 1 ? 0 : 1 */ }} key={i}>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }} numberOfLines={1}>{food?.label}</Text>
                {/* <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>({food?.grams} g)</Text> */}
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.Energy?.quantity ? Math.round(food?.Energy?.quantity)  : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.Carbs?.quantity ? Math.round(food?.Carbs?.quantity) : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.Protein?.quantity ? Math.round(food?.Protein?.quantity) : '-'}</Text>
                <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c', textAlign: 'center' }}>{food?.Fat?.quantity ? Math.round(food?.Fat?.quantity) : '-'}</Text>
              </View>
            ) : null}
          </ScrollView>            

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

        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', padding: 10, marginTop: windowHeight <= 667 ? 10 : 30  }}>
            <CustomButton text='LOG ITEM' onPress={() => setModalVisible(!modalVisible)} style={{ width: 150, backgroundColor: '#6b705c', marginRight: 5 }} />
            <CustomButton text='CLEAR LOG' onPress={clearLog} style={{ width: 150, marginLeft: 5 }} />
        </View>
    </View>
    )
  }

export default Log;

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
    paddingTop: '5%',
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
})