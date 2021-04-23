import React from 'react';
import { ScrollView, View, Text, TextInput, Picker, TouchableOpacity } from 'react-native';

const UserInputResults = () => {
    
    return (
        <>
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', paddingTop: '5%', paddingBottom: '5%' }}>
                    <Text style={{ ...styles.text, textAlign: 'left' }}>Per </Text>
                    <View>
                        <TextInput 
                            style={styles.input} 
                            value={!grams ? '' :String(grams)}
                            onFocus={() => setGrams(null)}
                            onChangeText={grams => {
                                const gramsToNumber = Number(grams);
                                if (!gramsToNumber && grams !== '') {
                                    Alert.alert('Please enter numbers only.');
                                    setGrams(null);
                                } else {
                                    setGrams(gramsToNumber)
                                }
                            }}
                        /> 
                    </View>
                    <Text style={styles.text}>grams</Text>
                </View>
                <Text style={{ ...styles.text, textAlign: 'left' }}>{foodLabel} contains:</Text>

                {totalNutrients ? 
                    <View style={{ display:'flex', flexDirection: 'row', padding:10, borderBottomWidth: 1, borderColor:'#6b705c', width: '90%', alignSelf:'center', marginTop: '5%' }} >
                        {/* <Text style={{ ...styles.label, color:'#6b705c' }}>Food</Text> */}
                        <Text style={styles.label}>Calories</Text>
                        <Text style={styles.label}>Carbs</Text>
                        <Text style={styles.label}>Protein</Text>
                        <Text style={styles.label}>Fat</Text>
                    </View> 
                : null}

                {totalNutrients ? 
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                        <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.value}>{Math.round(totalNutrients.ENERC_KCAL?.quantity * grams) || 0}</Text>
                            <Text style={styles.value}>{totalNutrients.ENERC_KCAL.unit || ''}</Text>
                        </View>
                        <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.value}>{Math.round(totalNutrients.CHOCDF?.quantity * grams) || 0}</Text>
                            <Text style={styles.value}>{totalNutrients.CHOCDF.unit || ''}</Text>
                        </View>
                        <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.value}>{Math.round(totalNutrients.PROCNT?.quantity * grams) || ''}</Text>
                            <Text style={styles.value}>{totalNutrients.PROCNT?.unit}</Text>
                        </View>
                        <View style={{ margin:10, flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.value}>{Math.round(totalNutrients.FAT?.quantity * grams) || 0}</Text>
                            <Text style={styles.value}>{totalNutrients.FAT.unit || ''}</Text>
                        </View>    
                    </View>
                : null}

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '2%' }} onPress={() => setShowMicros(!showMicros)}>
                    <Text style={{ ...styles.value, textDecorationLine: 'underline' }}>{!showMicros ? 'View micros' : 'hide micros'}</Text>
                </TouchableOpacity>

                {/* {showMicros ? 
                    Object.keys(totalNutrients)
                        .filter(key => key !== 'ENERC_KCAL' && key !== 'CHOCDF' && key !== 'PROCNT' && key !== 'FAT')
                        .map((key, i) => {
                            return (
                                // <View style={{display:'flex', flexDirection:'row', padding:10, borderTopWidth: '1px', borderColor:'black'}}>
                                //     <Text style={{ ...styles.label, color:'#6b705c' }}>Totals:</Text>
                                //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCalories)}</Text>
                                //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalCarbs)} g</Text>
                                //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalProtein)} g</Text>
                                //     <Text style={{ ...styles.label, color:'#6b705c' }}>{Math.round(totalFat)} g</Text>
                                // </View>
                        <View 
                            style={{
                                display:'flex', 
                                flexDirection:'row', 
                                padding:10, 
                                borderWidth: 1,
                                borderBottomWidth: i === Object.keys(totalNutrients).length - 1 ? 1 : 0,
                                borderColor:'black', 
                                backgroundColor: '#ffe8d6', 
                                width: '90%', 
                                alignSelf: 'center',
                            }}
                        >
                            <Text style={{ ...styles.value, flex: 1.5 }}>{totalNutrients[key].label}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                <Text style={styles.value}>{(totalNutrients[key]?.quantity * grams).toFixed(2) || 0}</Text>
                                <Text style={styles.value}>{totalNutrients[key]?.unit || ''}</Text>
                            </View>
                        </View>
                        )
                    })  
                : null}              */}
            </ScrollView>
        </>
    )
}

export default UserInputResults

const styles = StyleSheet.create({
    buttonContainer: { 
      display:'flex', 
      flexDirection:'column', 
      alignItems: 'flex-end',
      marginLeft: 'auto', 
      marginRight: 'auto',
      marginTop: 25,
      paddingBottom: 50, // TODO this is a temp fix for white space at bottom
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
    image: { 
        width: '100%', 
        height: 400, 
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ECECEC', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5 },
    container:{
        backgroundColor: '#ffe8d6',
        paddingTop: '5%',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'MontserratMedium',
        color: '#6b705c',
        fontSize: 25,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
		backgroundColor: '#ddbea9',
		opacity: 1,
		borderBottomColor: '#6B705C',
		borderBottomWidth: 2,
		borderRadius: 4,
        // height: 45,
        width: 50,
        // marginTop: '5%',
        fontSize: 25,
        color: '#a5a58d',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
      label: {
        color: '#cb997e',
        fontWeight: 'bold',
        flex: 1,
      },
      value: {
        color: '#6b705c',
        fontWeight: 'bold',
        marginLeft: 2,
      },
});
