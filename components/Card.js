import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Card = ({image, name, calories, carbohydrates, protein, fat}) => (
	<View style={styles.card}>
		{
			image ?
				<View style={styles.imageBox}>
					<Image
						style={styles.img}
						source={{uri: image}}
						/>
				</View>
				:
				<View style={styles.imageBox}>
					<Image
							style={styles.img}
							source={require('../assets/avo.jpeg')}
						/>
				</View>
		}
		<View>
			<Text>Name: {name}</Text>
			<Text>Nutrition per 100 grams:</Text>
			<Text>Calories: {calories}</Text>
			<Text>Carbohydrates: {carbohydrates}</Text>
			<Text>Protein: {protein}</Text>
			<Text>Fat: {fat}</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
  card: {
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: 'black',
		borderRadius: 6,
		width: 225,
		height: 350,
		padding: 10,
		margin: 10
  },
	imageBox: {
		width:200,
		height: 200
	},
	img: {
		height: '100%',
		width: '100%'
	}
});

export default Card
