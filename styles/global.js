import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(windowHeight)

export const styles = StyleSheet.create ({
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
    text: {
		fontFamily: 'Pacifico',
		color: '#6b705c',
		fontSize: 35,
		paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
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
    subText: {
		fontFamily: 'MontserratLight',
		color: '#6b705c',
		fontSize: 25,
        marginTop: '5%',
        paddingLeft: '10%',
		paddingRight: '10%',
		textAlign: 'center',
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
    ageInput: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderBottomColor: '#6B705C',
		borderBottomWidth: 2,
		borderRadius: 4,
        height: 45,
        width: 200,
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
	  },
    microsLabel: {
        color: '#6b705c',
        fontWeight: 'bold',
        marginLeft: 2,
    },
    picker: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
        height: 45,
        width: '100%',
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
    },
    image: {
		height:150,
		width:150,
		marginLeft:'auto',
		marginRight:'auto',
	},
    genderPicker: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderRadius: 4,
        height: 45,
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center'
    },
    heightInchesPicker: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderRadius: 4,
        height: 45,
        width: 200,
		textAlign: 'center'
	},
    weightInput: {
		backgroundColor: '#ffe8d6',
		opacity: 1,
		borderBottomColor: '#6B705C',
		borderBottomWidth: 2,
		borderRadius: 4,
        height: 45,
        width: 200,
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
		textAlign: 'center',
		fontSize: 25,
		fontFamily: 'MontserratRegular',
	},
})