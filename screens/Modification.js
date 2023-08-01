import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../css/styles';

function Modification({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Modification 페이지</Text>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Fixed Text at Bottom</Text>
      </View>
    </View> 
  )
}

export default Modification;