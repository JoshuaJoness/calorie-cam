import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet } from 'react-native'
import { Input, Modal, Button, Card } from '@ui-kitten/components';

const Log = (props) => {
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalFat, setTotalFat] = useState(0)
  const [loggedFoods, setLoggedFoods] = useState([])

  let total = 0
  let total1 = 0
  let total2 = 0
  let total3 = 0

  // {/* Need to call getAsync on componentWillMount, then set variable to array OR access AsyncStorage directly */}
  // useEffect(() => {
  //   getAsync()
  //   setTotals()

  // },[props])

  // const setTotals = () => {
  //   console.log(loggedFoods);

  //   if (loggedFoods !== []) {
  //     {/* Here I am setting the totals for each nutritional property */}
  //     for (let i = 0; i < loggedFoods.length; i++) {
  //       total = total + loggedFoods[i].calories
  //     }
  //     setTotalCalories(total)

  //     for (let i = 0; i < loggedFoods.length; i++) {
  //       total1 = total1 + loggedFoods[i].carbs
  //     }
  //     setTotalCarbs(total1)

  //     for (let i = 0; i < loggedFoods.length; i++) {
  //       total2 = total2 + loggedFoods[i].protein
  //     }
  //     setTotalProtein(total2)

  //     for (let i = 0; i < loggedFoods.length; i++) {
  //       total3 = total3 + loggedFoods[i].fat
  //     }
  //     setTotalFat(total3)
  //   }
  //     else {
  //       getAsync()
  //     }
  // }

  // const getAsync = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('foods');
  //     if (value !== null) {
  //       // We have data!!
  //       let parsed = JSON.parse(value)
  //       await setLoggedFoods(parsed)
  //     }
  //   } catch (error) {
  //     console.log('Error')
  //   }
  // };

  const clear = () => {
      AsyncStorage.clear() // TODO set to only clear specific values
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

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.subText}>TEST</Text>
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

    //     {loggedFoods.map((food,i) => <View style={{display:'flex', flexDirection:'row', padding:10, color:'white'}} key={i}>
    //         <Text style={{width:110}}>{food.label}</Text>
    //         <Text style={{width:70}}>{Math.round(food.calories)}</Text>
    //         <Text style={{width:70}}>{Math.round(food.carbs)}</Text>
    //         <Text style={{width:70}}>{Math.round(food.protein)}</Text>
    //         <Text style={{width:70}}>{Math.round(food.fat)}</Text>
    //       </View>)}

    //       <View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
    //         <Text style={{width:110, fontWeight:'bold'}}>Totals:</Text>
    //         <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCalories)}</Text>
    //         <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalCarbs)} g</Text>
    //         <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalProtein)} g</Text>
    //         <Text style={{width:70, fontWeight:'bold'}}>{Math.round(totalFat)} g</Text>
    //       </View>
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