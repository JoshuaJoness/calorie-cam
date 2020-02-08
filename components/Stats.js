import React from 'react'
import { View, Text, Button, Image, Animated, TextInput, StyleSheet } from 'react-native'
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

class Stats extends React.Component {
	state = {
		user:{

		},
		height:{
			feet:[1,2,3,4,5,6,7,8],
			inches:[1,2,3,4,5,6,7,8,9,11]
		}
	}
	onValueChange(value: string, field) {
		let user = this.state.user
		user[field]=value
		this.setState(user)
	}
	render(){
		return(
			<View>
				<Form>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.onChangeText(text,'age')}
					placeholder='Please enter your age'
				/>
				<Picker
					mode="dropdown"
					iosIcon={<Icon name="arrow-down" />}
					placeholder="Please select feet(')"
					placeholderStyle={{ color: "#bfc6ea" }}
					placeholderIconColor="#007aff"
					style={{ width: undefined }}
					selectedValue={this.state.selected}
					style={{backgroundColor:'white', borderRadius: 6, width: 250, marginLeft:'auto',marginRight:'auto',borderColor: 'gray',
					borderWidth: 1,}}
					onValueChange={(value)=>this.onValueChange(value, feet)}
				>
					{
						this.state.height.feet.map(e => <Picker.Item label={e} value={e} />)
					}
				</Picker>

				<Picker
					mode="dropdown"
					iosIcon={<Icon name="arrow-down" />}
					placeholder='Please select inches(")'
					placeholderStyle={{ color: "#bfc6ea" }}
					placeholderIconColor="#007aff"
					style={{ width: undefined }}
					selectedValue={this.state.selected}
					style={{backgroundColor:'white', borderRadius: 6, width: 250, marginLeft:'auto',marginRight:'auto',borderColor: 'gray',
					borderWidth: 1,}}
					onValueChange={this.onValueChange.bind(this)}
				>
				{
					this.state.height.inches.map(e => <Picker.Item label={e} value={e} />)
				}
				</Picker>

				<Picker
					mode="dropdown"
					iosIcon={<Icon name="arrow-down" />}
					placeholder="Please select a gender"
					placeholderStyle={{ color: "#bfc6ea" }}
					placeholderIconColor="#007aff"
					style={{ width: undefined }}
					selectedValue={this.state.selected}
					style={{backgroundColor:'white', borderRadius: 6, width: 250, marginLeft:'auto',marginRight:'auto',borderColor: 'gray',
					borderWidth: 1,}}
					onValueChange={this.onValueChange.bind(this)}
				>
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Female" value="female" />
				</Picker>

				<Picker
					mode="dropdown"
					iosIcon={<Icon name="arrow-down" />}
					placeholder="Select your activity level"
					placeholderStyle={{ color: "#bfc6ea" }}
					placeholderIconColor="#007aff"
					style={{ width: undefined }}
					selectedValue={this.state.selected}
					style={{backgroundColor:'white', borderRadius: 6, width: 250, marginLeft:'auto',marginRight:'auto',borderColor: 'gray',
					borderWidth: 1,}}
					onValueChange={this.onValueChange.bind(this)}
				>
				<Picker.Item label="Not very active" value="not active" />
				<Picker.Item label="Moderately active" value="moderately active" />
				<Picker.Item label="Very active" value="very active" />
			</Picker>
				</Form>
			</View>
		)
	}
}

export default Stats

const styles = StyleSheet.create ({
	container:{
		backgroundColor:"#D3F09C",
		height:1000
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: 250,
		marginLeft: 'auto',
		marginRight:'auto',
		backgroundColor:'white',
		borderRadius: 6,
		marginBottom:'3%',
		textAlign: 'center'
	},
	image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',
		marginBottom:'2%',
		marginTop: '15%'
	},
	text: {
		fontSize:18, marginLeft:'auto', marginRight:'auto', marginTop:'10%'
	}
})
