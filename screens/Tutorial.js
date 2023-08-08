import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

function Tutorial({navigation}) {
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false}>
      <View style={styles.slide}>
        <Text style={styles.text}>페이지 1</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>페이지 2</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>페이지 3</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
          <Text>시작하기</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Tutorial;