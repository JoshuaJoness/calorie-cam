import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, AsyncStorage, Image, StyleSheet, Modal, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from './button';
import AddItemModal from './addItemModal';
import { store } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

// TODO correct import for AsyncStorage



const Micros = () => {
    const [loggedFoods, setLoggedFoods] = useState([]);
    const [reqs, setReqs] = useState(null);

    const globalState = useContext(store);
    const { state } = globalState;
    const { foods: foodsFromState, clearMicros } = state;

    // to get log on initial render
    useEffect(() => {
        const getData = async () => {
        const test = await AsyncStorage.getItem('foods');
        const parse = JSON.parse(test);
        await setLoggedFoods(parse);

        const reqs = await AsyncStorage.getItem('dailyReqs');
        const parsedReqs = JSON.parse(reqs);
        await setReqs(parsedReqs);
        }

        getData();
    }, []);

    // to get log when a new food is added to async storage
    useEffect(() => {
        const getData = async () => {
        const test = await AsyncStorage.getItem('foods');
        const parse = JSON.parse(test);
        await setLoggedFoods(parse);
        }

        getData();
    }, [foodsFromState]);

    const [obj, setObj] = useState(null)
    const newObj = {}

    useEffect(() => {
        loggedFoods?.forEach(food => {
          if (food) {
            Object.keys(food).forEach(nutrient => {
              if (newObj[nutrient]) {
                newObj[nutrient].quantity += food[nutrient].quantity;
              } else {
                newObj[nutrient] = { 
                  label: food[nutrient]?.label,
                  quantity: food[nutrient]?.quantity,
                  unit: food[nutrient]?.unit,    
                }
              }
            })
          }
        })

        setObj(newObj);
    }, [loggedFoods]);

  useEffect(() => {
    if (clearMicros) {
        setObj(null);
        setLoggedFoods(null);
        setReqs(null);
    }
  }, [state, loggedFoods, clearMicros])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Micronutrients</Text>
      <View style= {{ height: '65%' }}>
          <View style={styles.labelsBox}>
            <View style={{ display:'flex', flexDirection:'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c' }} >
              <Text style={{ ...styles.label, color:'#ffe8d6', textAlign: 'center' }}>Micronutrient Totals</Text>
            </View>
          </View>

        <ScrollView style={styles.box}>    
            {obj ? Object.keys(obj)
                .filter(nutrient => nutrient !== 'ENERC_KCAL' && nutrient !== 'CHOCDF' && nutrient !== 'PROCNT' && nutrient !== 'FAT' && obj[nutrient].label)
                .map((nutri,i) => {
                  console.log(nutri, 'NUTRI')
                  // console.log(obj, 'OBJ')
                  // console.log(obj[nutri].label, 'LOOK')
                    return (
                        <View key={`${nutri}_micro`}>
                            <View style={{ borderWidth: 1, borderColor: 'black', height: 40, display: 'flex', flexDirection: 'row', backgroundColor: '#b7b7a4' }}>
                                <Text style={{ padding: 10 }}>{obj[nutri].label}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', padding: 10 }}>
                                    <Text style={{ paddingRight: 5 }}>{Math.round(obj[nutri].quantity)}</Text>
                                    <Text >{obj[nutri].unit}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                ) 
                : null
            }
          </ScrollView>
            

          <View style={styles.totalsBox}>

            <View style={{ display:'flex', flexDirection:'row', padding:10, borderTopWidth: 1, borderColor:'black', backgroundColor: '#6b705c' }}>
                <Text style={{ ...styles.label, color:'#ffe8d6' }} onPress={() => console.log(newObj, 'newObj')}> CLICK ME </Text>
            </View>
        </View>
      </View>
    </View>
    )
  }

export default Micros

const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		// paddingTop: '5%'
	},
  box: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    backgroundColor: '#ffe8d6',
    height: '10%'
  },
  totalsBox: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderColor: 'black', 
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#ddbea9'
  },
  labelsBox: {
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#6b705c'
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
  microsLabel: {
    color: '#6b705c',
    fontWeight: 'bold',
    marginLeft: 2,
  },
})