import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../css/styles';

function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <Text>SignUp 페이지</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
        <Text>회원가입 - 로그인 페이지 이동</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp;