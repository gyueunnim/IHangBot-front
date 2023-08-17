import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

/* css */
import { reportStyles } from '../css/reportSetStyles';
import { commonStyles } from '../css/commonStyle';
import { signUpStyles } from '../css/signUpStyles';

function Setting({navigation}) {
  const loginState = useSelector((state) => state.loginState);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [gender, setGender] = useState();
  const [pwCheckErr, setPwCheckErr] = useState(0);
  const [initialInfo, setInitialInfo] = useState({name: '', gender: '', age: ''});
  const [settingErr, setSettingErr] = useState(0);
  const [settingchange, setSettingChange] = useState(false);
  
  const requestSetting = () => {
    axios.put(`http://52.79.225.144:8080/member/${loginState.id}/profile/setting`, {    
      "child_name": name,
      "child_age": age,
      "child_gender": gender,
      "password": pw,
      "password_check": pwCheck,
    })
      .then((response) => {
        setSettingErr(2); // 성공
      })
      .catch((error) => {
        setSettingErr(1); // 실패
      });
  };

  useEffect(() => {
    pwCheck !== '' ? (pw !== pwCheck ? setPwCheckErr(1)  : setPwCheckErr(2)) 
    : setPwCheckErr(0);
  }, [pw, pwCheck]);

  useEffect(() => {
    setSettingErr(0);
  }, [name, gender, age, pw, pwCheck]);

  useEffect(() => {
    (initialInfo.gender !== gender || initialInfo.name !== name || initialInfo.age !== age) ? 
    setSettingChange(true) : setSettingChange(false);
  }, [name, age, gender]);

  useEffect(() => {
    axios.get(`http://52.79.225.144:8080/member/${loginState.id}/profile`)
      .then((response) => {
        setInitialInfo({
          name: response.data.data.child_name,
          gender: response.data.data.child_gender,
          age: response.data.data.child_age,
        });
        setName(response.data.data.child_name);
        setAge(response.data.data.child_age);
        setGender(response.data.data.child_gender);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={reportStyles.settingContainer}>
      <View style={reportStyles.content}>
        <Ionicons style={reportStyles.icon} name='person-circle-outline' size={100} color='black' />
        <Text style={reportStyles.iconTitle}>프로필 수정</Text>
      </View>

      <View style={reportStyles.middle}>
        <View>
          <Text style={commonStyles.title}>아이 이름</Text>
          <TextInput placeholder="아이 이름을 입력하세요" defaultValue={name} onChangeText={(value) => setName(value)} style={commonStyles.form} />
        </View>

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
                <RadioButton status={gender === false ? "checked" : "unchecked"} onPress={() => setGender(false)} />
                <Text style={signUpStyles.radioText}>여자</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={signUpStyles.formAge}>
              <Text style={commonStyles.title}>나이 </Text>
              <Text style={signUpStyles.highlight}>*</Text>
            </View>
            <TextInput placeholder="아이의 나이" defaultValue={age.toString()} onChangeText={(value) => setAge(value)} style={signUpStyles.fxForm} />
          </View>  
        </View>

        <View>
          <Text style={commonStyles.title}>비밀번호 변경</Text>
          <TextInput placeholder="변경하실 비밀번호를 입력하세요" secureTextEntry={true} onChangeText={(value) => setPw(value)} style={commonStyles.form} />
        </View>
        <View style={signUpStyles.fx}>
          <Text style={commonStyles.title}>비밀번호 확인</Text>
          {
            pwCheckErr !== 0 ? (pwCheckErr === 1 ? <Text style={commonStyles.error} >비밀번호가 일치하지 않습니다</Text> : <Text style={signUpStyles.pwPass} >비밀번호가 일치합니다</Text>) : null
          }
        </View>
        <TextInput placeholder="비밀번호를 다시 한번 입력하세요" onChangeText={(value) => setPwCheck(value)} secureTextEntry={true} style={commonStyles.form} />
        <TouchableOpacity onPress={() => requestSetting()}>
          <Text style={(settingchange) ? commonStyles.active: commonStyles.btn}>수정하기</Text>          
        </TouchableOpacity>
        {
          settingErr === 0 ? null
          : (settingErr === 1 ? <Text style={commonStyles.error}>수정에 실패하였습니다</Text> : <Text style={signUpStyles.pwPass}>수정에 성공하였습니다</Text>)
        }
      </View>

      <View style={commonStyles.bottomTextContainer}>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='newspaper-outline' size={32} color='white'  onPress={() => {navigation.navigate('Report')}} />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
            <Ionicons name='home-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='person-circle' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Setting;