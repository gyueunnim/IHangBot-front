import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../css/styles';

function Report({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>lorem</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Modification')}}>
          <Text>Setting Go</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Fixed Text at Bottom</Text>
      </View>
    </View>
  )
}

export default Report;