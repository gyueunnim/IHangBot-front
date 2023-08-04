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
  const [pwCheckErr, setPwCheckErr] = useState(0);

  useEffect(() => {
    (name !== "") && (id !== "") && (pw !== "") && (pwCheck !== "") && (age !== "") && (email !== "") 
    ? setBtnStyle(signUpStyle.active) 
    : setBtnStyle(signUpStyle.btn);
  }, [name, id, pw, pwCheck, gender, age, email])

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
  }, [pwCheck])

  
  // TODO: 서버 통신
  const [response, setResponse] = useState(true);
  let server = false;

  const requestSignUp = () => {
    server === false ? setResponse(false) : successSignUp();
  }

  const successSignUp = () => {
    setResponse(true);
    navigation.navigate('Login');
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
          <TextInput placeholder="이메일을 입력하세요" onChangeText={(value) => setEmail(value)} secureTextEntry={true} style={signUpStyle.form} />
        </View>

        <View>
          <TouchableOpacity onPress={() => requestSignUp()}> 
          <Text style={(name !== '' && id !== '' && pw !== '' && pwCheck !== '' && age !== '') ? signUpStyle.active : signUpStyle.btn}>회원가입</Text>
            {
            response === false ?  <Text style={signUpStyle.signUpErr}>회원가입에 실패하였습니다 - 다시 시도해주세요</Text> : null
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp;