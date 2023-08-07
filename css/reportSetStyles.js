import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const reportStyles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: 'white',
      padding: 40,
      paddingTop: 75,
      flex: 1,
    },
    icon: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 15,
    },
    content: {
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    iconTitle: {
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 25,
      fontWeight: '900',
    },
    middle: {
      flex: 3,
    }
  });