import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import { useState, useEffect, useRef } from 'react';

import { tutorialStyles } from '../css/tutorialStyles';
import { usingStyles } from '../css/usingStyles';

function Tutorial({navigation}) {
  const [index, setIndex] = useState(0);
  const slides = [0, 1, 2];
  const fadeAnims = slides.map(() => new Animated.Value(0));

  useEffect(() => {
    // 슬라이드가 변경될 때 투명도 조절
    slides.forEach((_, i) => {
      if (i === index) {
        fadeIn(i);
      } else {
        fadeOut(i);
      }
    });
  }, [index]);
  
  const fadeIn = (i) => {
    Animated.timing(fadeAnims[i], {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
  const fadeOut = (i) => {
    Animated.timing(fadeAnims[i], {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };  

  return (
    <Swiper style={tutorialStyles.wrapper} loop={false} showsButtons={false} onIndexChanged={(i) => { setIndex(i); }}>
      <View style={tutorialStyles.slide}>
        <Animated.View style={{opacity: fadeAnims[0]}}>
          <Text style={tutorialStyles.title}>혹시 아이 행봇해?</Text>
          <Text style={tutorialStyles.subTitle}>그럼 아이 행복해!</Text> 
        </Animated.View>
        <View style={tutorialStyles.iconBox}>
            <Image source={require('../assets/main_tutorial.png')} style={tutorialStyles.mainIcon} />
        </View>
      </View>
      <View style={tutorialStyles.slide}>
        <View style={tutorialStyles.iconBox}>
            <Image source={require('../assets/child_tutorial.png')} style={tutorialStyles.icon} />
            <Image source={require('../assets/chat_tutorial.png')} style={tutorialStyles.chatIcon} />
            <Image source={require('../assets/robot_tutorial.png')} style={tutorialStyles.icon} />
        </View>
        <Animated.View style={{opacity: fadeAnims[1]}}>
          <Text style={tutorialStyles.title}>챗봇 기능 제공</Text>
          <Text style={tutorialStyles.text}>아이와 챗봇의 대화를 제공합니다</Text>
          <Text style={tutorialStyles.text}>아이의 관심사와 감정을 추출합니다</Text>
        </Animated.View>
      </View>
      <View style={tutorialStyles.slide}>
        <View style={tutorialStyles.iconBox}>
            <Image source={require('../assets/report_tutorial.png')} style={tutorialStyles.icon} />
            <Image source={require('../assets/parent_tutorial.png')} style={tutorialStyles.icon} />
        </View>
        <Animated.View style={{opacity: fadeAnims[2]}}>
          <Text style={tutorialStyles.title}>레포트 제공</Text>
          <Text style={tutorialStyles.text}>아이의 대화를 분석하여</Text>
          <Text style={tutorialStyles.text}>관심사와 감정을 레포트로 제공합니다</Text>
          <TouchableOpacity onPress={() => {
            console.log('시작하기 누름');
            navigation.navigate('Login');
          }}>
          <Text style={usingStyles.btn}>시작하기</Text>
        </TouchableOpacity>
        </Animated.View>
        
      </View>
    </Swiper>
  )
}
export default Tutorial;