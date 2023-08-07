import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const  signUpStyle = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: 'white',
      padding: 40,
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center', 
      paddingTop: 75,
    },
    highlight: {
      paddingTop: 7,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 2.5,
      marginTop: 5,
      color: '#cc0000',
      fontWeight: 'bold',
    },
    pwPass: {
      flex: 1,
      paddingTop: 7,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 2.5,
      marginTop: 5,
      color: '#3f6ad7',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    formAge: {
      flexDirection: 'row',
      paddingLeft: 30,
    },
    fxForm: {
      height: 50,
      borderColor: '#d9d9d9',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      paddingLeft: 15,
      marginLeft: 30,
      width: 135,
    },
    fx: {
      flexDirection: 'row',
    },
    radioText: {
      padding: 7,
      paddingLeft: 3,
      color: '#999999',
    },
  })