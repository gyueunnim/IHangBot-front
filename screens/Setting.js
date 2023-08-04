import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../css/reportSetStyles';
import { loginStyle } from '../css/loginStyles';
import { signUpStyle } from '../css/signUpStyles';
import { useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

function Setting({navigation}) {
  const loginState = useSelector((state) => state.loginState);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [gender, setGender] = useState(true);
  const [btnStyle, setBtnStyle] = useState(loginStyle.btn);
  const [pwCheckErr, setPwCheckErr] = useState(0);
  const [userInfo, setUserInfo] = useState({child_name: '', age: ''});
  
  const requestSetting = () => {
    axios.put(`http://52.79.225.144:8080/member/${loginState.id}/profile/setting`, {    
      "child_name": "string",
      "child_age": 0,
      "child_gender": true,
      "email": "string"
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
  }, [pw, pwCheck]);

  // useEffect(() => {
  //   console.log(pw, pwCheck, name, gender, age)
  // })

  useEffect(() => {
    axios.get(`http://52.79.225.144:8080/member/${loginState.id}/profile`)
      .then((response) => {
        setUserInfo({
          child_name: response.data.data.child_name,
          age: response.data.data.child_age
        });
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons style={styles.icon} name='person-circle-outline' size={100} color='black' />
        <Text style={styles.iconTitle}>프로필 수정</Text>
      </View>

      <View style={styles.middle}>
        <View>
          <Text style={styles.title}>아이 이름</Text>
          <TextInput placeholder="아이 이름을 입력하세요" defaultValue={userInfo.child_name} onChangeText={(value) => setName(value)} style={styles.form} />
        </View>

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
            <TextInput placeholder="아이의 나이" defaultValue={userInfo.age.toString()} onChangeText={(value) => setAge(value)} style={signUpStyle.fxForm} />
          </View>  
        </View>

        <View>
          <Text style={styles.title}>비밀번호 변경</Text>
          <TextInput placeholder="변경하실 비밀번호를 입력하세요" secureTextEntry={true} onChangeText={(value) => setPw(value)} style={styles.form} />
        </View>
        <View style={signUpStyle.fx}>
          <Text style={styles.title}>비밀번호 확인</Text>
          {
            pwCheckErr !== 0 ? (pwCheckErr === 1 ? <Text style={signUpStyle.pwErr} >비밀번호가 일치하지 않습니다</Text> : <Text style={signUpStyle.pwPass} >비밀번호가 일치합니다</Text>) : null
          }
        </View>
        <TextInput placeholder="비밀번호를 다시 한번 입력하세요" onChangeText={(value) => setPwCheck(value)} secureTextEntry={true} style={styles.form} />
        <TouchableOpacity onPress={() => requestLogin()}>
          <Text style={(name != "" && age !== "" && pw !== "" && pwCheck != "") ? loginStyle.active: loginStyle.btn}>수정하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomTextContainer}>
        <View style={styles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='newspaper-outline' size={32} color='white'  onPress={() => {navigation.navigate('Report')}} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
            <Ionicons name='home-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='person-circle' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Setting;