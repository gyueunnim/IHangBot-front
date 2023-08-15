import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const tutorialStyles = StyleSheet.create({
    wrapper: {},
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
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    title: {
        color: '#000000',
        fontSize: 27.5,
        fontWeight: 'bold',
        padding: 5,
    },
    subTitle: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
    },
    text: {
        color: '#000000',
        fontSize: 17.5,
        fontWeight: 'bold',
        paddingTop: 12.5,
    },
    mainIcon: {
        width: 175,
        height: 175,
        backgroundColor: '#9DD6EB',
        margin: 5
    },
    icon: {
        width: 125,
        height: 125,
        backgroundColor: '#9DD6EB',
        margin: 5
    },
    chatIcon: {
        width: 75,
        height: 75,
        backgroundColor: '#9DD6EB',
    },
    iconBox: {
        flexDirection: "row",
        paddingBottom: 50,
    },
    btn: {
        textAlign: 'center',
        width: 150,
        paddingTop: 15,
        paddingBottom: 15,
        color: 'white',
        backgroundColor: '#1c4587',
        borderRadius: 5,
        fontSize: 15,
        top: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
  })