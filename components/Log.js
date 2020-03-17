import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, AsyncStorage, Button } from 'react-native'
{/* Uninstall this package below*/}
import { Col, Row, Grid } from "react-native-easy-grid";
import {Card} from 'native-base'

const Log = (props) => {
  const [loggedFoods, setLoggedFoods] = useState([])

  {/* Need to call getAsync on componentWillMount, then set variable to array OR access AsyncStorage directly */}
  useEffect(() => {
    console.log(props.navigation.state.params.loggedFoods);
    setLoggedFoods(props.navigation.state.params.loggedFoods)
  },[])

  const clear = () => {
    AsyncStorage.clear()
  }

  const showState = () => console.log(props);

    return(
      <ScrollView>
        {/*The X icon to clear the log*/}
        <Card>
        <Button title="Click here to clear log" />

        <View style={{display:'flex', flexDirection:'row', padding:10, borderWidth: '1px', borderColor:'black'}}>
          <Text style={{width:90, fontWeight:'bold'}}>Food</Text>
          <Text style={{width:60, fontWeight:'bold'}}>Calories</Text>
          <Text style={{width:50, fontWeight:'bold'}}>Carbs</Text>
          <Text style={{width:50, fontWeight:'bold'}}>Protein</Text>
          <Text style={{width:50, fontWeight:'bold'}}>Fat</Text>
          <Text style={{width:100, fontWeight:'bold'}}>Date</Text>
        </View>

        {/* Here I need to decide what UI element to use to display each logged food, then display totals at bottom, perhaps include datetimestamp... */}
        {loggedFoods.map((food,i) => <View style={{display:'flex', flexDirection:'row', padding:10}} key={i}>
          <Text style={{width:90}}>{food.label}</Text>
          <Text style={{width:60}}>{Math.round(food.calories)}</Text>
          <Text style={{width:50}}>{Math.round(food.carbs)}</Text>
          <Text style={{width:50}}>{Math.round(food.protein)}</Text>
          <Text style={{width:50}}>{Math.round(food.fat)}</Text>
          <Text style={{width:100}}>{food.date}</Text>
          </View>)}

          <View style={{display:'flex', flexDirection:'row', padding:10, borderWidth: '1px', borderColor:'black'}}>
            <Text style={{width:90, fontWeight:'bold'}}>Totals:</Text>
            <Text style={{width:60, fontWeight:'bold'}}>yo</Text>
            <Text style={{width:50, fontWeight:'bold'}}>Carbs</Text>
            <Text style={{width:50, fontWeight:'bold'}}>Protein</Text>
            <Text style={{width:50, fontWeight:'bold'}}>Fat</Text>
            <Text style={{width:100, fontWeight:'bold'}}>Date</Text>
          </View>
          </Card>
      </ScrollView>
    )
}

export default Log
