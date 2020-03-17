import React from 'react'
import { ScrollView, View, Text, AsyncStorage, Button } from 'react-native'
{/* Uninstall this package below*/}
import { Col, Row, Grid } from "react-native-easy-grid";
import {Card} from 'native-base'

class Logg extends React.Component {
  state = {
    loggedFoods:[],
    total:0,
    total1:0,
    total2:0,
    total3:0,
    totalCalories:0,
    totalCarbs:0,
    totalProtein:0,
    totalFat:0
  }

  componentWillMount(){
    this.setState({loggedFoods:this.props.navigation.state.params.loggedFoods})
    {/* Here I am setting the totals for each nutritional property */}
    for (let i = 0; i < this.state.loggedFoods.length; i++) {
      this.state.total = this.state.total + this.state.loggedFoods[i].calories
    }
    this.setState({totalCalories:this.state.total})



  }




  clear = () => {
    AsyncStorage.clear()
  }


render() {
    return(
      <ScrollView>
        {/*The X icon to clear the log*/}
        <Card>
        <Button title="Click here to clear log" onPress={() => clear()}/>

        <View style={{display:'flex', flexDirection:'row', padding:10, borderWidth: '1px', borderColor:'black'}}>
          <Text style={{width:90, fontWeight:'bold'}}>Food</Text>
          <Text style={{width:70, fontWeight:'bold'}}>Calories</Text>
          <Text style={{width:70, fontWeight:'bold'}}>Carbs</Text>
          <Text style={{width:70, fontWeight:'bold'}}>Protein</Text>
          <Text style={{width:70, fontWeight:'bold'}}>Fat</Text>

        </View>

        {/* Here I need to decide what UI element to use to display each logged food, then display totals at bottom, perhaps include datetimestamp... */}
        {this.state.loggedFoods.map((food,i) => <View style={{display:'flex', flexDirection:'row', padding:10}} key={i}>
          <Text style={{width:90}}>{food.label}</Text>
          <Text style={{width:70}}>{Math.round(food.calories)}</Text>
          <Text style={{width:70}}>{Math.round(food.carbs)}</Text>
          <Text style={{width:70}}>{Math.round(food.protein)}</Text>
          <Text style={{width:70}}>{Math.round(food.fat)}</Text>

          </View>)}

          <View style={{display:'flex', flexDirection:'row', padding:10, borderWidth: '1px', borderColor:'black'}}>
            <Text style={{width:90, fontWeight:'bold'}}>Totals:</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(this.state.totalCalories)}</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(this.state.totalCarbs)} g</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(this.state.totalProtein)} g</Text>
            <Text style={{width:70, fontWeight:'bold'}}>{Math.round(this.state.totalFat)} g</Text>

          </View>
          </Card>
      </ScrollView>
    )
}}

export default Logg
