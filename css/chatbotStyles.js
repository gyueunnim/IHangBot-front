var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
      width: width,
      height: height,
      paddingTop: 75,
    },
    userChat: {
      marginTop: 25,
      backgroundColor: '#74c0fc',
      flex: 1.3,
      padding: 10,
    },
    gptChat: {
      backgroundColor: "#a5d8ff",
      flex: 1.3,
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
      width: 25,
      height: 25,
      marginRight: 10,
    },
    fx: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 17.5,
      color: '#5b5b5b',
    }
  });