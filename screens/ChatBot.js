import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../css/styles';

function ChatBot({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Report')}>
        <Text>ChatBot 페이지</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatBot;