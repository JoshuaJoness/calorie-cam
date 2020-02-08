import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const Results = (props) => {
	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',props.navigation.state)
	console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',props.navigation.state.params.d.label);
	return(

		<Container>
			 <Header />
			 <Content>
				 <Card>
					 <CardItem>
						 <Left>
							 <Thumbnail source={{uri: 'Image URL'}} />
							 <Body>
								 <Text>{props.navigation.state.params.d.label}</Text>
								 <Text note>{props.navigation.state.params.d.nutrients.ENERC_KCAL ? props.navigation.state.params.d.nutrients.ENERC_KCAL : 0} calories per 100 grams</Text>
							 </Body>
						 </Left>
					 </CardItem>
					 <CardItem cardBody>
						 <Image source={{uri: props.navigation.state.params.d.image}} style={{height: 200, width: null, flex: 1}}/>
					 </CardItem>
					 <CardItem>
						 <Left>
							 <Button transparent>

								 <Text>Carbs: {props.navigation.state.params.d.nutrients.CHOCDF ? Math.round(props.navigation.state.params.d.nutrients.CHOCDF) : 0} grams</Text>
							 </Button>
						 </Left>
						 <Body>
							 <Button transparent>

								 <Text>Protein: {props.navigation.state.params.d.nutrients.PROCNT ? Math.round(props.navigation.state.params.d.nutrients.PROCNT) : 0} grams</Text>
							 </Button>
						 </Body>
						 <Right>
						 	<Button transparent>
							 <Text>Fat: {props.navigation.state.params.d.nutrients.FAT ? Math.round(props.navigation.state.params.d.nutrients.FAT) : 0} grams</Text>
							 </Button>
						 </Right>
					 </CardItem>
				 </Card>
			 </Content>
		 </Container>



	)
}

export default Results

const styles = StyleSheet.create ({
	container:{
		height: 100
	}
})

// <View style={styles.container}>
// 	<Text>Label: {props.navigation.state.params.d.label}</Text>
// 	<Text>Image: {props.navigation.state.params.d.image}</Text>
// 	<Text>Calories: {props.navigation.state.params.d.nutrients.ENERC_KCAL ? props.navigation.state.params.d.nutrients.ENERC_KCAL : 0}</Text>
// 	<Text>Carbohydrates: {props.navigation.state.params.d.nutrients.CHOCDF ? props.navigation.state.params.d.nutrients.CHOCDF : 0}</Text>
// 	<Text>Protein: {props.navigation.state.params.d.nutrients.PROCNT ? props.navigation.state.params.d.nutrients.PROCNT : 0}</Text>
// 	<Text>Fat: {props.navigation.state.params.d.nutrients.FAT ? props.navigation.state.params.d.nutrients.FAT : 0}</Text>
// </View>
