import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: 'white',
      padding: 40,
      paddingTop: 150,
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    content: {
      flex: 1,
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
  });