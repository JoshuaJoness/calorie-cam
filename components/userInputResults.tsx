import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';

const UserInputResults = ({ foodQty, setFoodQty, result, totalNutrients }) => {
    
	const [showMicros, setShowMicros] = useState(false);

    const hidePlural = foodQty === '1' || !foodQty || result?.measure === 'whole';

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, width: '80%', alignSelf: 'center' }}>
                <Text style={styles.formTextDisplay}>Per </Text>
                <TextInput 
                    style={{ ...styles.input, width: '25%', fontSize: 25, fontFamily: 'MontserratMedium' }} 
                    value={String(foodQty)}
                    // onFocus={() => setGrams(null)}
                    onChangeText={qty => {
                        const qtyToNumber = Number(qty);
                        if (!qtyToNumber && qty !== '') {
                            Alert.alert('Please enter numbers only.');
                        } else {
                            setFoodQty(qty);
                        }
                    }}
                /> 
                <Text style={styles.formTextDisplay}>{result.measure}(s)</Text>
            </View>
            
            <Text style={{ ...styles.formTextDisplay ,textTransform: 'capitalize', marginTop: 40, marginBottom: 30, width: '80%', alignSelf: 'center' }}>{result.food}</Text>
            
            {totalNutrients ? 
            <>
                <View style={{ display:'flex', flexDirection: 'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c', width: '90%', alignSelf:'center', marginTop: '5%' }} >
                    {/* <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text> */}
                    <Text style={styles.label}>Calories</Text>
                    <Text style={styles.label}>Carbs</Text>
                    <Text style={styles.label}>Protein</Text>
                    <Text style={styles.label}>Fat</Text>
                </View> 
            
                <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                    <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.value}>{Math.round(totalNutrients.ENERC_KCAL?.quantity * foodQty) || 0}</Text>
                        <Text style={styles.value}>{totalNutrients.ENERC_KCAL.unit || ''}</Text>
                    </View>
                    <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.value}>{Math.round(totalNutrients.CHOCDF?.quantity * foodQty) || 0}</Text>
                        <Text style={styles.value}>{totalNutrients.CHOCDF.unit || ''}</Text>
                    </View>
                    <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.value}>{Math.round(totalNutrients.PROCNT?.quantity * foodQty) || ''}</Text>
                        <Text style={styles.value}>{totalNutrients.PROCNT?.unit}</Text>
                    </View>
                    <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.value}>{Math.round(totalNutrients.FAT?.quantity * foodQty) || 0}</Text>
                        <Text style={styles.value}>{totalNutrients.FAT.unit || ''}</Text>
                    </View>    
                </View>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '2%' }} onPress={() => setShowMicros(!showMicros)}>
                    <Text style={{ ...styles.value, textDecorationLine: 'underline' }}>{!showMicros ? 'View micros' : 'hide micros'}</Text>
                </TouchableOpacity>
			
                {showMicros ? 
				<ScrollView style={{ marginBottom: 20 }}>
					{
						Object.keys(totalNutrients)
                        .filter(key => key !== 'ENERC_KCAL' && key !== 'CHOCDF' && key !== 'PROCNT' && key !== 'FAT')
                        .map((key, i) => {
							const newArrLength = Object.keys(totalNutrients).filter(key => key !== 'ENERC_KCAL' && key !== 'CHOCDF' && key !== 'PROCNT' && key !== 'FAT');
                            return (
                                <View 
                                    style={{
                                        display:'flex', 
                                        flexDirection:'row', 
                                        padding:10, 
                                        borderWidth: 1,
                                        borderBottomWidth: i === newArrLength.length - 1 ? 1 : 0,
                                        borderColor:'black', 
                                        backgroundColor: '#ffe8d6', 
                                        width: '90%', 
                                        alignSelf: 'center',
                                    }}
                                    key={key}
                                >
                                    <Text style={{ ...styles.value, flex: 1.5 }}>{totalNutrients[key].label}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                        <Text style={styles.value}>{(totalNutrients[key]?.quantity).toFixed(2) || 0}</Text>
                                        <Text style={styles.value}>{totalNutrients[key]?.unit || ''}</Text>
                                    </View>
                                </View>
                        )
                    }) 
				}
				</ScrollView> : null}              
            </> : null}		
		</View>
    )
}

export default UserInputResults




const styles = StyleSheet.create ({
	container:{
		backgroundColor: '#ffe8d6',
		height: '100%',
		paddingTop: 50,
		display:'flex', 
		alignItems: 'center'
		// flexDirection:'column', 
		// alignItems: 'flex-end',
		// marginLeft: 'auto', 
		// marginRight: 'auto',
		// marginTop: 25,
		// paddingBottom: 50, // TODO this is a temp fix for white space at bottom
	},
	formText: {
        fontFamily: 'MontserratMedium',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
		width: '100%'
    },
    formTextDisplay: {
        fontFamily: 'MontserratMedium',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
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
	fontFamily: 'MontserratMedium',
    borderBottomWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    fontSize: 17,
    width: 170
	},
	value: {
        color: '#6b705c',
        fontWeight: 'bold',
        marginLeft: 2,
      },
})
