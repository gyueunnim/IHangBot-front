import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';

function Login({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // TODO: 서버 통신
  let response = false;
  
  return (
    <View style={loginStyle.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={loginStyle.title}>아이디</Text>
        </View>
        <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} style={loginStyle.form} />
        <Text style={loginStyle.title}>비밀번호</Text>
        <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} secureTextEntry={true} style={loginStyle.form} />
      </View>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate('Main')}}>
          <Text style={(id !== '' && pw !== '') ? loginStyle.active : loginStyle.btn}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate('SignUp')}}>
          <Text style={loginStyle.signUp}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const loginStyle = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    padding: 40,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center', 
  },
  title: {
    padding: 10,
    paddingLeft: 0,
    paddingBottom: 5,
    marginTop: 10,
    color: '#999999',
    fontWeight: 'bold',
  },
  form: {
    height: 50,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
  },
  btn: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    color: 'white',
    backgroundColor: '#6487b7',
    borderRadius: 5,
    fontSize: 15,
  },
  active: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    color: 'white',
    backgroundColor: '#1c4587',
    borderRadius: 5,
    fontSize: 15,
  },
  signUp: {
    marginTop: 10,
    color: '#3c78d8',
    textDecorationLine: 'underline',
  },
  loginError: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingBottom: 5,
    marginTop: 10,
    color: '#cc0000',
    fontWeight: 'bold',
    textAlign: 'right',
  },
})

export default Login;