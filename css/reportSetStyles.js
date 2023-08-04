import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
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
    title: {
      padding: 10,
      paddingLeft: 0,
      paddingBottom: 2.5,
      marginTop: 5,
      color: '#999999',
      fontWeight: 'bold',
    },
    text: {
      fontSize: 30,
    },
    bottomTextContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 10,
      flexDirection: 'row',
      backgroundColor: '#1c4587',
    },
    bottomText: {
      flex: 1,
      fontSize: 18,
      color: 'white',
      marginLeft: 44,
    },
    form: {
      height: 50,
      borderColor: '#d9d9d9',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      paddingLeft: 15,
    },
    middle: {
      flex: 3,
    }
  });