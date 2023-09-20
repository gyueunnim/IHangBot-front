import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState } from '../redux/logInfo';
import { CommonActions } from '@react-navigation/routers';
import axios from 'axios';

/* css */
import { loginStyles } from '../css/loginStyles';
import { commonStyles } from '../css/commonStyle';


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
  };

  useEffect(() => {
    if(loginState.login === true) {
      setId(loginState.id);
      setDefaultInput(loginState.id);
    } else {
      setDefaultInput(null);
    }
  }, []);

  useEffect(() => {
    setLoginErr(false);
  }, [id, pw]);

  const requestLogin = () => {
    axios.get(`http://52.79.225.144:8080/member/login`, { params: loginInfo })
      .then((response) => {
        if(response.data.status == 200) {
          setPw('');
          successLogin();
        } else {
          setLoginErr(true);
        }
      })
      .catch((error) => {
        // console.log(error);
        setLoginErr(true);
      });
  };

  const successLogin = () => {
    setLoginErr(false);
    dispatch(setLoginState(id));
    navigation.dispatch(
      CommonActions.reset({
        index: 1, 
        routes: [
          { name: 'ChatBot' },
        ],
      })
    );
  };
    
  return (
    <View style={loginStyles.container}>
      <View>
        <Image source={require('../assets/mainLogo.png')} style={loginStyles.icon}></Image>
        <Text style={loginStyles.iconText}>로그인이 필요한 서비스입니다</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={commonStyles.title}>아이디</Text>
          {
            loginErr === true ? <Text style={commonStyles.error}>로그인에 실패하였습니다</Text> : null
          }
        </View>
        <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} defaultValue={defaultInput} style={commonStyles.form} />
        <View style={{flexDirection: 'row'}}>
          <Text style={commonStyles.title}>비밀번호</Text>
        </View>
        <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} defaultValue={pw}secureTextEntry={true} style={commonStyles.form} />
      </View>
      <View>
        <TouchableOpacity onPress={() => requestLogin()}>
          <Text style={(id !== '' && pw !== '') ? commonStyles.active : commonStyles.btn}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate('SignUp')}}>
          <Text style={loginStyles.signUp}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;