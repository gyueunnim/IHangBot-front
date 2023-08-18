import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/routers';
import { setLogoutState } from '../redux/logInfo';
import axios from 'axios';

/* css */
import { loginStyles } from '../css/loginStyles';
import { commonStyles } from '../css/commonStyle';

function MoveToReport({navigation}) {
  const loginState = useSelector((state) => state.loginState);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loginErr, setLoginErr] = useState(false);
  const [defaultInput, setDefaultInput] = useState(null);

  const loginInfo = {
    "username": id, 
    "password": pw,
  };

  const dispatch = useDispatch();

  const showConfirmation = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃을 하시겠습니까?',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        {
          text: '예',
          onPress: () => {
            dispatch(setLogoutState());
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  function Logout() {
    showConfirmation();
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
        console.log(error);
        setLoginErr(true);
      });
  };

  const successLogin = () => {
    setLoginErr(false);
    navigation.dispatch(CommonActions.navigate('Report'));
  };
    
  return (
    <View style={loginStyles.container}>
      <View>
        <Image source={require('../assets/mainLogo.png')} style={loginStyles.icon}></Image>
        <Text style={loginStyles.goReport}>보고서 화면으로 이동합니다</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={commonStyles.title}>아이디</Text>
          {
            loginErr === true ? <Text style={commonStyles.error}>로그인에 실패하였습니다</Text> : null
          }
        </View>
        <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} defaultValue={defaultInput} style={commonStyles.form} />
        <View style={{flexDirection: 'row'}}>
        <Text style={commonStyles.title}>비밀번호</Text>
        {
          pw === '' ? <Text style={loginStyles.goReportText}>비밀번호를 입력해주세요</Text> : null
        }
        </View>
        <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} defaultValue={pw}secureTextEntry={true} style={commonStyles.form} />
      </View>
      <View>
        <TouchableOpacity onPress={() => requestLogin()}>
          <Text style={(id !== '' && pw !== '') ? commonStyles.active : commonStyles.btn}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {Logout()}}>
          <Text style={loginStyles.signUp}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MoveToReport;