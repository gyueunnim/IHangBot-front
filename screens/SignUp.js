import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { signUpStyle } from '../css/signUpStyles';

function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(true);
  const [email, setEmail] = useState('');
  const [btnStyle, setBtnStyle] = useState(signUpStyle.btn);
  const [idCheckErr, setIdCheckErr] = useState(false);
  const [pwCheckErr, setPwCheckErr] = useState(0);
  const [signUpErr, setSignUpErr] = useState(false);

  const userInfo = {
    "username": id,
    "password": pw,
    "check_password": pwCheck,
    "email": email,
    "child_name": name,
    "child_age": age,
    "child_gender": gender
  }

  useEffect(() => {
    (name !== "") && (id !== "") && (pw !== "") && (pwCheck !== "") && (age !== "") && (email !== "") 
    ? setBtnStyle(signUpStyle.active) 
    : setBtnStyle(signUpStyle.btn);
  }, [name, id, pw, pwCheck, gender, age, email])

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
  }, [pw, pwCheck])

  useEffect(() => {
    setIdCheckErr(false);
  }, [id])

  
  // TODO: 서버 통신
  const requestSignUp = async () => {
    if(pwCheckErr === 2) {
      axios.post('http://52.79.225.144:8080/member/signUp', userInfo)
        .then((response) => {          
          successSignUp(); 
        })
        .catch((error) => { // 이미 존재하는 아이디
          setIdCheckErr(true);
          failSignUp();
        });
    } else {
      failSignUp(); // 비밀번호 일치하지 않을 때
    }
  }

  const successSignUp = () => {
    setIdCheckErr(false);
    setSignUpErr(false);
    navigation.navigate('Login');
  }

  const failSignUp = () => {
    setSignUpErr(true);
  }
  
  return (
    
    <View style={signUpStyle.container}>
      <ScrollView>
        <View>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 50}}>회원가입</Text>
          
          <View style={signUpStyle.fx}>
            <Text style={signUpStyle.title}>아이 이름 </Text> 
            <Text style={signUpStyle.highlight}>*</Text>
          </View>
          <TextInput placeholder="아이의 이름을 입력하세요" onChangeText={(value) => setName(value)} style={signUpStyle.form} />

          <View style={signUpStyle.fx}>
            <Text style={signUpStyle.title}>아이디 </Text>
            <Text style={signUpStyle.highlight}>*</Text>
            {
              idCheckErr === false ? null
              : <Text style={signUpStyle.pwErr} >이미 존재하는 아이디 입니다</Text>
            }
          </View>
          <TextInput placeholder="아이디를 입력하세요" onChangeText={(value) => setId(value)} style={signUpStyle.form} />

          <View style={signUpStyle.fx}>
            <Text style={signUpStyle.title}>비밀번호 </Text>
            <Text style={signUpStyle.highlight}>*</Text>
          </View>
          <TextInput placeholder="비밀번호를 입력하세요" onChangeText={(value) => setPw(value)} secureTextEntry={true} style={signUpStyle.form} />

          <View style={signUpStyle.fx}>
            <Text style={signUpStyle.title}>비밀번호 확인 </Text>
            <Text style={signUpStyle.highlight}>*</Text>
            {
              pwCheckErr !== 0 ? (pwCheckErr === 1 ? <Text style={signUpStyle.pwErr} >비밀번호가 일치하지 않습니다</Text> : <Text style={signUpStyle.pwPass} >비밀번호가 일치합니다</Text>) : null
            }
          </View>
          <TextInput placeholder="비밀번호를 다시 한번 입력하세요" onChangeText={(value) => setPwCheck(value)} secureTextEntry={true} style={signUpStyle.form} />

          <View style={signUpStyle.fx}>
            <View>
              <View style={signUpStyle.fx}>
                <Text style={signUpStyle.title}>성별 </Text>
                <Text style={signUpStyle.highlight}>*</Text>
              </View>
              <View style={signUpStyle.fx}>
                <View style={signUpStyle.fx}>
                  <RadioButton status={gender === true ? "checked" : "unchecked"} onPress={() => setGender(true)} />
                  <Text style={signUpStyle.radioText}>남자</Text>
                </View>
                <View style={signUpStyle.fx}>
                  <RadioButton status={gender == false ? "checked" : "unchecked"} onPress={() => setGender(false)} />
                  <Text style={signUpStyle.radioText}>여자</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={signUpStyle.formAge}>
                <Text style={signUpStyle.title}>나이 </Text>
                <Text style={signUpStyle.highlight}>*</Text>
              </View>
              <TextInput placeholder="아이의 나이" onChangeText={(value) => setAge(value)} style={signUpStyle.fxForm} />
            </View>  
          </View>

          <View style={signUpStyle.fx}>
            <Text style={signUpStyle.title}>이메일 </Text>
            <Text style={signUpStyle.highlight}>*</Text>
          </View>
          <TextInput placeholder="이메일을 입력하세요" onChangeText={(value) => setEmail(value)} style={signUpStyle.form} />
        </View>

        <View>
          <TouchableOpacity onPress={() => requestSignUp()}> 
          <Text style={(name !== '' && id !== '' && pw !== '' && pwCheck !== '' && age !== '') ? signUpStyle.active : signUpStyle.btn}>회원가입</Text>
            {
            signUpErr === false ? null
            : <Text style={signUpStyle.signUpErr}>회원가입에 실패하였습니다 - 다시 시도해주세요</Text> 
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp;