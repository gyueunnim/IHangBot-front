import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../css/styles';

function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login 페이지</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('SignUp')}}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Main')}}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login;