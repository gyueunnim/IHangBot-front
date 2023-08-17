import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const chatbotStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    width: width,
    height: height,
    paddingTop: 75,
    marginTop: 7.5,
  },
  userChat: {
    backgroundColor: '#74c0fc',
    flex: 1.5,
    padding: 10,
  },
  gptChat: {
    marginTop: 25,
    backgroundColor: "#a5d8ff",
    flex: 1.5,
    padding: 10,
  },
  recordBox: {
    flex: 1.3,
    justifyContent: 'center',
  },
  recordBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 125,
    height: 125,
  },
  Icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  fx: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 17.5,
    color: '#5b5b5b',
    width: width - 90,
    flexWrap: 'wrap',
  },
  using: {
    position: 'absolute',
    right: 0,
    top: -32.5,
  }
});