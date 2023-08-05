import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { loginStyle } from '../css/loginStyles';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState } from '../redux/logInfo';
import { CommonActions } from '@react-navigation/routers';


function Login({navigation}) {
  const loginState = useSelector((state) => state.loginState);
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loginErr, setLoginErr] = useState(false);
  const [defaultInput, setDefaultInput] = useState(null);

  const dispatch = useDispatch();

  const loginInfo = {
    "username": id, 
    "password": pw,
  }

  useEffect(() => {
    if(loginState.login === true) {
      setId(loginState.id);
      setDefaultInput(loginState.id);
    } else {
      setDefaultInput(null);
    }
  }, [])

  const requestLogin = () => {
    axios.get(`http://52.79.225.144:8080/member/login`, { params: loginInfo })
      .then((response) => {
        if(response.data.status == 200) {
          setPw('');
          successLogin();
        } else {
          console.log(response);
          setLoginErr(true);
        }
      })
      .catch((error) => {
        console.log(error)
        setLoginErr(true);
      })
  }

  const successLogin = () => {
    setLoginErr(false);
    if(loginState.login === false) {
      dispatch(setLoginState(id));
      navigation.dispatch(
        CommonActions.reset({
          index: 1, 
          routes: [
            { name: 'ChatBot' },
          ],
        })
      );
    } else {
      navigation.dispatch(CommonActions.navigate('Report'))
    }
  };
    
  return (
    <View style={loginStyle.container}>
      <View>
        <Image source={require('../assets/mainLogo.png')} style={loginStyle.icon}></Image>
        {
          loginState.login === false ? <Text style={loginStyle.iconText}>로그인이 필요한 서비스입니다</Text>
          : <Text style={loginStyle.goReport}>보고서 화면으로 이동합니다</Text>
        }
        <View style={{flexDirection: 'row'}}>
          <Text style={loginStyle.title}>아이디</Text>
          {
            loginErr === true ? <Text style={loginStyle.loginError}>로그인에 실패하였습니다</Text> : null
          }
        </View>
        <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} defaultValue={defaultInput} style={loginStyle.form} />
        <View style={{flexDirection: 'row'}}>
        <Text style={loginStyle.title}>비밀번호</Text>
        {
          loginState.login === false ? null : (pw === '' ? <Text style={loginStyle.goReportText}>비밀번호를 입력해주세요</Text> : null)
        }
        </View>
        <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} defaultValue={pw}secureTextEntry={true} style={loginStyle.form} />
      </View>
      <View>
        <TouchableOpacity onPress={() => requestLogin()}>
          <Text style={(id !== '' && pw !== '') ? loginStyle.active : loginStyle.btn}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate('SignUp')}}>
          {
            loginState.login === true ? null  
            : <Text style={loginStyle.signUp}>회원가입</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;