import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const loginStyles = StyleSheet.create({
  icon: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconText: {
    textAlign: 'center',
    padding: 25,
    paddingBottom: 0,
    fontWeight: 'bold', 
    fontSize: 10,
    color: '#3f6ad7',
  },
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
  signUp: {
    marginTop: 10,
    color: '#3c78d8',
    textDecorationLine: 'underline',
  },
  goReport: {
    textAlign: 'center',
    padding: 25,
    paddingBottom: 0,
    fontWeight: 'bold', 
    fontSize: 12,
    color: '#3f6ad7',
    fontWeight: 'bold',
  },
  goReportText: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingBottom: 2.5,
    marginTop: 5,
    color: '#528638',
    fontWeight: 'bold',
    textAlign: 'right',
  },
})