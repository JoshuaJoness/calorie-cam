import React, { useState, useEffect} from 'react';
import { StyleSheet, Button, TextInput, Text, View, Image, ScrollView, FlatList } from 'react-native';
import axios from 'axios'
import Card from './Card'

const Search = () => {
	const [arr, setArr] = useState([])
	const [food, setFood] = useState('')

	const submit = () =>  {
		axios.get(`https://api.edamam.com/api/food-database/parser?app_id=7ff1ee7e&app_key=aa4824adda205d7ff601301c08816573&ingr=${food}`).then(res => {
			console.log('!!!!!!!',res.data.hints.length);
			setArr(res.data.hints)
		}).catch(err => {
			console.log(err);
		})
	}



	const onChangeText = (text) => {
		setFood(text)
	}

  return (

		<ScrollView>

	  <View style={styles.container}>

	    <Text>Calorie Log</Text>
			<Text>Search for your food below!</Text>
			<TextInput
				style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={text => onChangeText(text)}
				placeholder="Search for your food!"
				value={food}
			/>
			<Button
			 title="Press me"
			 onPress={submit}
		 />
		 <FlatList
		 	data={[arr]}
			renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
		 />


				{
					arr.map((e,i) => <Card
					key={i}
					image={e.food.image}
					name={e.food.label} calories={Math.round(e.food.nutrients.ENERC_KCAL)}
					carbohydrates={Math.round(e.food.nutrients.CHOCDF)}
					protein={Math.round(e.food.nutrients.PROCNT)}
					fat={Math.round(e.food.nutrients.FAT)}
					/>)
				}

	  </View>

		</ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
		marginTop: 100
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Search
