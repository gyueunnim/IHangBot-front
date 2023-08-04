import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../css/reportSetStyles';

function Report({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          
        </Text>
        <TouchableOpacity>
          <Text>Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <View style={styles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='newspaper' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
            <Ionicons name='home-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Ionicons name='person-circle-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Report;