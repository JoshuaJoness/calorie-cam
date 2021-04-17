import React, { useState } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Modal, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import CutomButton from './button';

const AddItemModal = ({ setModalVisible, modalVisible, setFoodToLog, foodToLog }) => {
    const [loaded] = useFonts({
        Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
        MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
        MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
        MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf')
    })

    // const [foodToLog, setFoodToLog] = useState({ });


    const addItemToLog = async () => {
        try {
            let foods = await AsyncStorage.getItem('foods') || '[]';
            foods = JSON.parse(foods);
            foods.push(foodToLog);
            await AsyncStorage.setItem('foods', JSON.stringify(foods));
            setFoodToLog({});
        } catch (err) {
            console.log(err);
        }
    };
  
    if (!loaded)
        return null

    return(
        <View style={{ height: '100%', backgroundColor: '#ffe8d6' }}>
          <View style={{ ...styles.box, marginTop: 'auto', marginBottom: 'auto',  }}>
            <View>
              <Text style={{ fontWeight: 'bold', color:'#6b705c', marginTop: 10, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, fontSize: 18 }}>Enter a food item below: </Text>
              <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
                <Text style={{ ...styles.label, color:'#6b705c' }}>Item Name: </Text> 
                <TextInput
                    style={{ ...styles.input }}
                    placeholder="Banana..."
                    value={foodToLog['label']}
                    onChangeText={(label) => {
                      setFoodToLog({ ...foodToLog, label});
                    }}
                  />
              </View>
              <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
                <Text style={{ ...styles.label, color:'#6b705c' }}>Calories: </Text> 
                <TextInput
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="200"
                  keyboardType="numeric"
                  value={foodToLog['calories']}
                  onChangeText={(energy) => {
                    
                    setFoodToLog({ ...foodToLog, energy: { quantity: energy, unit: 'g' } });
                  }}
                />
              </View>
              <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
                <Text style={{ ...styles.label, color:'#6b705c' }}>Carbs (g): </Text> 
                <TextInput
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="60"
                  keyboardType="numeric"
                  value={foodToLog['carbs']}
                  onChangeText={(carbs) => {
                    setFoodToLog({ ...foodToLog, carbs: { quantity: carbs, unit: 'g' } });
                  }}
                />
              </View>
              <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
                <Text style={{ ...styles.label, color:'#6b705c' }}>Protein (g): </Text> 
                <TextInput
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="20"
                  keyboardType="numeric"
                  value={foodToLog['protein']}
                  onChangeText={(protein) => {
                    setFoodToLog({ ...foodToLog, protein: { quantity: protein, unit: 'g' } });
                  }}
                />
              </View>
              <View style={{ display:'flex', flexDirection:'row', padding:10, backgroundColor: '#ffe8d6' }}>
                <Text style={{ ...styles.label, color:'#6b705c' }}>Fat (g): </Text> 
                <TextInput
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="2"
                  keyboardType="numeric"
                  value={foodToLog['fat']}
                  onChangeText={(fat) => {
                    setFoodToLog({ ...foodToLog, fat: { quantity: fat, unit: 'g' } });
                  }}
                />
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', padding: 10  }}>
              <CutomButton 
                text='Log Item' 
                onPress={() => {
                  addItemToLog();
                  setModalVisible(!modalVisible);
                }} 
                style={{ width: 100, height: 30, backgroundColor: '#a5a58d', marginRight: 5 }} 
              />
              <CutomButton 
                text='Cancel' 
                onPress={() => setModalVisible(!modalVisible)} 
                style={{ width: 100, height: 30, marginLeft: 5 }} 
              />
          </View>      
        </View>
      </View>
    )
  }

export default AddItemModal

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