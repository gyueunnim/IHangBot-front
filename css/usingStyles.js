import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const usingStyles = StyleSheet.create({
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
        fontSize: 22.5,
        fontWeight: 'bold',
        padding: 5,
        paddingTop: 20,
    },
    text: {
        color: '#000000',
        fontSize: 17.5,
        fontWeight: 'bold',
        paddingTop: 12.5,
    },
    subText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 2.5,
    },
    mainIcon: {
        width: 175,
        height: 175,
        backgroundColor: '#9DD6EB',
        margin: 5,
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
        top: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btnText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#000000',
        fontSize: 17.5,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    explainTitle: {
        color: '#000000',
        fontSize: 17.5,
        fontWeight: 'bold',
        paddingTop: 30,
        paddingBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    explain: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 12.5,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    explainBottom: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 12.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 35,
    },
    reportIcon: {
        width: 75,
        height: 75,
        backgroundColor: '#9DD6EB',
        margin: 40,
        marginTop: 40,
        marginBottom: 15,
    },
    reportText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
    },
    mg: {
        marginTop: 10,
        marginBottom: 7.5,
    },
    reportIconSmall: {
        margin: 0,
        marginTop: 17.5,
        marginRight: 2.5,
        width: 27.5,
        height: 27.5,
        backgroundColor: '#9DD6EB',
    }
  })