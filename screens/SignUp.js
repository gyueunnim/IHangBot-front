import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

/* css */
import { signUpStyles } from '../css/signUpStyles';
import { commonStyles } from '../css/commonStyle';

function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(true);
  const [idCheckErr, setIdCheckErr] = useState(false);
  const [pwCheckErr, setPwCheckErr] = useState(0);
  const [ageCheckErr, setAgeCheckErr] = useState(false);
  const [pwLen, setPwLen] = useState(0);
  const [checkTemplate, setCheckTemplate] = useState(false);
  const [signUpErr, setSignUpErr] = useState(false);
  const userInfo = {
    "username": id,
    "password": pw,
    "check_password": pwCheck,
    "child_name": name,
    "child_age": age,
    "child_gender": gender
  };

  useEffect(() => {
    name !== '' && id !== '' && pw !== '' && pwCheck !== '' && age !== '' && pwLen >= 8 ? setCheckTemplate(true) : setCheckTemplate(false)
  }, [name, id, pw, pwCheck, age, pwLen]);

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
  }, [pw, pwCheck]);

  useEffect(() => {
    setPwLen(pw.length);
  }, [pw]);

  useEffect(() => {
    setIdCheckErr(false);
  }, [id]);

  useEffect(() => {
    /^\d+$/.test(age) ? setAgeCheckErr(false) : setAgeCheckErr(true)
    if (age === '') {
      setAgeCheckErr(false);
    }
  }, [age])

  const requestSignUp = async () => {
    if(checkTemplate == true) {
      if(pwCheckErr === 2) {
        axios.post('http://52.79.225.144:8080/member/signUp', userInfo)
          .then((response) => {          
            successSignUp(); 
          })
          .catch((error) => { // 이미 존재하는 아이디
            if(setIdCheckErr) {
              setIdCheckErr(true);
            }
            failSignUp();
          });
      } else {
        failSignUp(); // 비밀번호 일치하지 않을 때
      }
    } else {
      failSignUp(); // 빈 칸이 존재할 때
    }
  };

  const successSignUp = () => {
    setIdCheckErr(false);
    setSignUpErr(false);
    navigation.navigate('Login');
  };

  const failSignUp = () => {
    setSignUpErr(true);
  };
  
  return (
    <View style={signUpStyles.container}>
      <ScrollView>
        <View>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginTop: 50, marginBottom: 10,}}>회원가입</Text>
          
          <View style={signUpStyles.fx}>
            <Text style={commonStyles.title}>아이 이름 </Text> 
            <Text style={signUpStyles.highlight}>*</Text>
          </View>
          <TextInput placeholder="아이의 이름을 입력하세요" onChangeText={(value) => setName(value)} style={commonStyles.form} />

          <View style={signUpStyles.fx}>
            <Text style={commonStyles.title}>아이디 </Text>
            <Text style={signUpStyles.highlight}>*</Text>
            {
              idCheckErr === false ? null
              : <Text style={commonStyles.error} >이미 존재하는 아이디 입니다</Text>
            }
          </View>
          <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} style={commonStyles.form} />

          <View style={signUpStyles.fx}>
            <Text style={commonStyles.title}>비밀번호 </Text>
            <Text style={signUpStyles.highlight}>*</Text>
            {
              0 < pwLen && pwLen < 8 ? <Text style={commonStyles.error}>8자리 이상 입력해주세요</Text> : null
            }
          </View>
          <TextInput placeholder="비밀번호를 8자리 이상 입력하세요" onChangeText={(value) => setPw(value)} secureTextEntry={true} style={commonStyles.form} />

          <View style={signUpStyles.fx}>
            <Text style={commonStyles.title}>비밀번호 확인 </Text>
            <Text style={signUpStyles.highlight}>*</Text>
            {
              0 <= pwLen && pwLen < 8 ? null : (
                pwCheckErr !== 0 ? (pwCheckErr === 1 ? <Text style={commonStyles.error} >비밀번호가 일치하지 않습니다</Text> : <Text style={signUpStyles.pwPass} >비밀번호가 일치합니다</Text>) : null
              )
            }
          </View>
          <TextInput placeholder="비밀번호를 다시 한번 입력하세요" onChangeText={(value) => setPwCheck(value)} secureTextEntry={true} style={commonStyles.form} />

          <View style={signUpStyles.fx}>
            <View>
              <View style={signUpStyles.fx}>
                <Text style={commonStyles.title}>성별 </Text>
                <Text style={signUpStyles.highlight}>*</Text>
              </View>
              <View style={signUpStyles.fx}>
                <View style={signUpStyles.fx}>
                  <RadioButton status={gender === true ? "checked" : "unchecked"} onPress={() => setGender(true)} />
                  <Text style={signUpStyles.radioText}>남자</Text>
                </View>
                <View style={signUpStyles.fx}>
                  <RadioButton status={gender == false ? "checked" : "unchecked"} onPress={() => setGender(false)} />
                  <Text style={signUpStyles.radioText}>여자</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={signUpStyles.formAge}>
                <Text style={commonStyles.title}>나이 </Text>
                <Text style={signUpStyles.highlight}>*</Text>
                {
                  !ageCheckErr ? null : <Text style={commonStyles.error}>문자 입력 오류</Text>
                }
              </View>
              <TextInput placeholder="아이의 나이" onChangeText={(value) => setAge(value)} style={signUpStyles.fxForm} />
            </View>  
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={() => requestSignUp()}> 
          <Text style={checkTemplate ? commonStyles.active : commonStyles.btn}>회원가입</Text>
            {
            signUpErr === false ? null
            : <Text style={commonStyles.error}>회원가입에 실패하였습니다 - 다시 시도해주세요</Text> 
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp;