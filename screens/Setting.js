import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../css/reportSetStyles';
import { loginStyle } from '../css/loginStyles';
import { signUpStyle } from '../css/signUpStyles';

function Setting({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [btnStyle, setBtnStyle] = useState(loginStyle.btn);
  const [pwCheckErr, setPwCheckErr] = useState(0);

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
    console.log(pw, pwCheck);
    console.log(pwCheckErr);
  }, [pw, pwCheck])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons style={styles.icon} name='person-circle-outline' size={100} color='black' />
        <Text style={styles.iconTitle}>프로필 수정</Text>
      </View>

      <View style={styles.middle}>
        <View>
          <Text style={styles.title}>아이 이름</Text>
          <TextInput placeholder="아이 이름을 입력하세요" onChangeText={(value) => setName(value)} style={styles.form} />
        </View>
        <View>
          <Text style={styles.title}>나이</Text>
          <TextInput placeholder="나이를 입력하세요" onChangeText={(value) => setAge(value)} style={styles.form} />
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