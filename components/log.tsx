import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { Input, Modal, Button, Card } from '@ui-kitten/components';
import CutomButton from './button';

const Log = (props) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [loggedFoods, setLoggedFoods] = useState([]);

  const [foodToLog, setFoodToLog] = useState({ });

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

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.subText}>LOG</Text>
        <View style={{display:'flex', flexDirection:'row', padding:10, borderBottomWidth: '1px', borderColor:'black'}} >
          <Text style={{width:90, fontWeight:'bold', color:'#37966F'}}>Food</Text>
          <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Calories</Text>
          <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Carbs</Text>
          <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Protein</Text>
          <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Fat</Text>
       </View>

       { loggedFoods.map((food,i) => <View style={{display:'flex', flexDirection:'row', padding:10, color:'white'}} key={i}>
            <Text style={{width:110}}>{food.label}</Text>
            <Text style={{width:70}}>{Math.round(food.calories)}</Text>
            <Text style={{width:70}}>{Math.round(food.carbs)}</Text>
            <Text style={{width:70}}>{Math.round(food.protein)}</Text>
            <Text style={{width:70}}>{Math.round(food.fat)}</Text>
          </View>
          )}

<View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
            <Text style={{width:110, fontWeight:'bold'}}>Totals:</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCalories)}</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCarbs)} g</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalProtein)} g</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalFat)} g</Text>
          </View>


        <Text onPress={() => console.log(loggedFoods)} style={{ marginTop: 50 }}>Enter a food item below </Text>
        <SafeAreaView style={{display: 'flex', flexDirection:'row'}}>
          
          <TextInput
            style={{marginLeft:'auto', marginRight:'auto', borderColor: '#000', borderBottomWidth: '1px'}}
            placeholder="Food"
            value={foodToLog['label']}
            onChangeText={(label) => {
              setFoodToLog({ ...foodToLog, label});
            }}
          />
          <TextInput
            style={{marginLeft:'auto', marginRight:'auto', borderColor: '#000', borderBottomWidth: '1px'}}
            placeholder="Calories"
            value={foodToLog['calories']}
            onChangeText={(calories) => {
              setFoodToLog({ ...foodToLog, calories });
            }}
          />
          <TextInput
            style={{marginLeft:'auto', marginRight:'auto', borderColor: '#000', borderBottomWidth: '1px'}}
            placeholder="Carbs"
            value={foodToLog['carbs']}
            onChangeText={(carbs) => {
              setFoodToLog({ ...foodToLog, carbs });
            }}
          />
          <TextInput
            style={{marginLeft:'auto', marginRight:'auto', borderColor: '#000', borderBottomWidth: '1px'}}
            placeholder="Protein"
            value={foodToLog['protein']}
            onChangeText={(protein) => {
              setFoodToLog({ ...foodToLog, protein });
            }}
          />
          <TextInput
            style={{marginLeft:'auto', marginRight:'auto', borderColor: '#000', borderBottomWidth: '1px'}}
            placeholder="Fat"
            value={foodToLog['fat']}
            onChangeText={(fat) => {
              setFoodToLog({ ...foodToLog, fat });
            }}
          />
      </SafeAreaView>
      <CutomButton text='log item' onPress={addItemToLog}/>
      <CutomButton text='clear log' onPress={clearLog}/>
    </ScrollView>
    // <ScrollView>
    //   {/*The X icon to clear the log*/}
    //   <Card style={{marginTop:100, borderBottom:0, backgroundColor:'#FFFBE6', width: '95%', marginLeft:'auto', marginRight:'auto'}}>
    //     <View style={{display:'flex', flexDirection:'row', padding:10, borderBottomWidth: '1px', borderColor:'black'}}>
    //       <Text style={{width:90, fontWeight:'bold', color:'#37966F'}}>Food</Text>
    //       <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Calories</Text>
    //       <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Carbs</Text>
    //       <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Protein</Text>
    //       <Text style={{width:70, fontWeight:'bold', color:'#FD5523'}}>Fat</Text>
    //     </View>

        // {loggedFoods.map((food,i) => <View style={{display:'flex', flexDirection:'row', padding:10, color:'white'}} key={i}>
        //     <Text style={{width:110}}>{food.label}</Text>
        //     <Text style={{width:70}}>{Math.round(food.calories)}</Text>
        //     <Text style={{width:70}}>{Math.round(food.carbs)}</Text>
        //     <Text style={{width:70}}>{Math.round(food.protein)}</Text>
        //     <Text style={{width:70}}>{Math.round(food.fat)}</Text>
        //   </View>)}

          // <View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
          //   <Text style={{width:110, fontWeight:'bold'}}>Totals:</Text>
          //   <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCalories)}</Text>
          //   <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCarbs)} g</Text>
          //   <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalProtein)} g</Text>
          //   <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalFat)} g</Text>
          // </View>
    //       <Button onPress={clear} style={{width:200, marginLeft:'auto', marginRight:'auto', marginTop:30, backgroundColor:'#FD5523', borderColor:'#FD5523'}}>Click here to clear log</Button>
    //     </Card>
    //   </ScrollView>
    )
  }

export default Log

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: '5%'
	},
	imgender: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',

	},
	text: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 25,
		paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
	},
    subText: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 25,
        marginTop: '5%',
        paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
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
	picker: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
        height: 45,
        width: 200,
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
})