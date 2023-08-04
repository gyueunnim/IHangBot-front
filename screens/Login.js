import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { loginStyle } from '../css/loginStyles';

function Login({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [btnStyle, setBtnStyle] = useState(loginStyle.btn);


  useEffect(() => {
    (id !== "") && (pw !== "") 
    ? setBtnStyle(loginStyle.active) 
    : setBtnStyle(loginStyle.btn)
  }, [id, pw])

  // TODO: 서버 통신
  const [response, setResponse] = useState(true);
  let server = false;
  
  const requestLogin = () => {
    server === false ? setResponse(false) : successLogin();
  }

  const successLogin = () => {
    setResponse(true);    navigation.navigate('Main');
  }
    
  return (
    <View style={loginStyle.container}>
      <View>
        <Image source={require('../assets/mainLogo.png')} style={loginStyle.icon}></Image>
        <Text style={loginStyle.iconText}>로그인이 필요한 서비스입니다</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={loginStyle.title}>아이디</Text>
          {
            response === false ? <Text style={loginStyle.loginError}>로그인에 실패하였습니다.</Text>
            : null
          }
        </View>
        <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} style={loginStyle.form} />
        <Text style={loginStyle.title}>비밀번호</Text>
        <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} secureTextEntry={true} style={loginStyle.form} />
      </View>
      <View>
        <TouchableOpacity onPress={() => requestLogin()}>
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

export default Login;