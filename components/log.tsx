import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet, Modal, TextInput } from 'react-native'
import { useFonts } from 'expo-font'
import CutomButton from './button';
import AddItemModal from './addItemModal';

const Log = (props) => {
  const [loaded] = useFonts({
    Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
  })

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [loggedFoods, setLoggedFoods] = useState([]);

  const [foodToLog, setFoodToLog] = useState({ });

  const [modalVisible, setModalVisible] = useState(false);

  let total = 0;
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;

  // {/* Need to call getAsync on componentWillMount, then set variable to array OR access AsyncStorage directly */}
  useEffect(() => {
    getFoods()
    setTotals()

  },[props, foodToLog])

  const setTotals = () => {
    console.log(loggedFoods);

    if (loggedFoods !== []) {
      {/* Here I am setting the totals for each nutritional property */}
      for (let i = 0; i < loggedFoods.length; i++) {
        total = total + loggedFoods[i].calories
      }
      setTotalCalories(total)

      for (let i = 0; i < loggedFoods.length; i++) {
        total1 = total1 + loggedFoods[i].carbs
      }
      setTotalCarbs(total1)

      for (let i = 0; i < loggedFoods.length; i++) {
        total2 = total2 + loggedFoods[i].protein
      }
      setTotalProtein(total2)

      for (let i = 0; i < loggedFoods.length; i++) {
        total3 = total3 + loggedFoods[i].fat
      }
      setTotalFat(total3)
    }
      else {
        getFoods()
      }
  }

  const getFoods = async () => {
    try {
      const value = await AsyncStorage.getItem('foods');
      if (value !== null) {
        // We have data!!
        let parsed = JSON.parse(value)
        await setLoggedFoods(parsed)
      }
    } catch (error) {
      console.log('Error')
    }
  };

  const clearLog = () => {
      AsyncStorage.removeItem('foods');
      setLoggedFoods([])
      setTotalCalories(0)
      setTotalCarbs(0)
      setTotalProtein(0)
      setTotalFat(0)
      total = 0
      total1 = 0
      total2 = 0
      total3 = 0
    }

    const addItemToLog = async () => {
      try {
        let foods = await AsyncStorage.getItem('foods') || '[]';
        foods = JSON.parse(foods);
        foods.push(foodToLog);
        await AsyncStorage.setItem('foods', JSON.stringify(foods));
        setFoodToLog({});
     } catch (err) {
        console.log(err)
      }
    };
  
  if (!loaded)
    return null

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Daily Log</Text>
      <View style={styles.box}>
        <View style={{ display:'flex', flexDirection:'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c' }} >
          <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text>
          <Text style={styles.label}>Calories</Text>
          <Text style={styles.label}>Carbs</Text>
          <Text style={styles.label}>Protein</Text>
          <Text style={styles.label}>Fat</Text>
        </View>

        {loggedFoods.map((food,i) => <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6', borderBottomWidth: i === loggedFoods.length - 1 ? 0 : 1 }} key={i}>
            <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{food.label}</Text>
            <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{Math.round(food.calories)}</Text>
            <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{Math.round(food.carbs)}</Text>
            <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{Math.round(food.protein)}</Text>
            <Text style={{ ...styles.label, flex: 1.5, color:'#6b705c' }}>{Math.round(food.fat)}</Text>
          </View>
        )}

          <View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
            <Text style={{ ...styles.label, color:'#6b705c' }}>Totals:</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCalories)}</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCarbs)} g</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalProtein)} g</Text>
            <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalFat)} g</Text>
          </View>
        </View>

        <Modal
          animationType="fade"
          // transparent={true}
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

        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', padding: 10  }}>
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