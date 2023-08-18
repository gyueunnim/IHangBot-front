import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import { useState, useEffect, useRef } from 'react';

import { usingStyles } from '../css/usingStyles';
import { chatbotStyles } from '../css/chatbotStyles';

function Using({navigation}) {
  const [index, setIndex] = useState(0);
  const slides = [0, 1, 2];
  const fadeAnims = slides.map(() => new Animated.Value(0));

  useEffect(() => {
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
    <Swiper style={usingStyles.wrapper} loop={false} showsButtons={false} onIndexChanged={(i) => { setIndex(i); }}>
      <View style={usingStyles.slide}>
        <Animated.View style={{opacity: fadeAnims[0]}}>
          <Text style={usingStyles.title}>챗봇 사용법</Text>
          <Text style={usingStyles.text}>챗봇과 대화는 음성으로 진행됩니다</Text>
          <Text style={usingStyles.text}>마이크 권한을 허용해주세요!</Text>
        </Animated.View>
        <Animated.View style={{opacity: fadeAnims[0]}}>
          <Text style={usingStyles.explainTitle}>챗봇 하단 버튼</Text>
        </Animated.View>
        <View>
          <View style={usingStyles.iconBox}>
              <Image source={require('../assets/input.png')} style={chatbotStyles.recordBtn}/>
          </View>
          <Animated.View style={{opacity: fadeAnims[0]}}>
            <Text style={usingStyles.explain}>말하는 중이 아니에요</Text>
            <Text style={usingStyles.explainTitle}>터치를 통해 말할 수 있어요</Text>
            </Animated.View>
            <View style={usingStyles.iconBox}>
                <Image source={require('../assets/recording.png')} style={chatbotStyles.recordBtn}/>
            </View>
            <Animated.View style={{opacity: fadeAnims[0]}}>
            <Text style={usingStyles.explain}>말하는 중이에요</Text>
            <Text style={usingStyles.explainTitle}>다시 한번 터치하면 녹음이 끝나요</Text>
          </Animated.View>
        </View>
      </View>

      <View style={usingStyles.slide}>
        <Animated.View style={{opacity: fadeAnims[1]}}>
          <Text style={usingStyles.title}>레포트 이동</Text>
          <Text style={usingStyles.text}>레포트는 아이의 관리자용 페이지입니다</Text>
          <Text style={usingStyles.text}>챗봇 하단 버튼을 통해 이동합니다</Text>
          <Text style={usingStyles.explainTitle}>챗봇 하단 버튼</Text>
        </Animated.View>
        <View style={usingStyles.iconBox}>
          <Image source={require('../assets/input.png')} style={usingStyles.icon} />
        </View>
        <Animated.View style={{opacity: fadeAnims[1]}}>
          <Text style={usingStyles.explainBottom}>2초간 눌러주세요</Text>
          <Text style={usingStyles.text}>이후 아이의 관리자 인증을 위해</Text>
          <Text style={usingStyles.text}>로그인 페이지로 이동합니다</Text>
        </Animated.View>
      </View>

      <View style={usingStyles.slide}>
        <Animated.View style={{opacity: fadeAnims[2]}}>
          <Text style={usingStyles.title}>레포트 내용</Text>
          <Text style={usingStyles.text}>레포트는 다양한 내용을 포함합니다</Text>
        </Animated.View>
        <View style={usingStyles.iconBox}>
          <View>
            <Image source={require('../assets/keyword.png')} style={usingStyles.reportIcon} />
            <Text style={usingStyles.reportText}>키워드</Text>
          </View>
          <View>
            <Image source={require('../assets/concern.png')} style={usingStyles.reportIcon} />
            <Text style={usingStyles.reportText}>관심사</Text>
          </View>
        </View>

        <View style={usingStyles.iconBox}>
          <View>
            <Image source={require('../assets/emotion.png')} style={usingStyles.reportIcon} />
            <Text style={usingStyles.reportText}>감정 추이</Text>
          </View>
          <View>
            <Image source={require('../assets/graph.png')} style={usingStyles.reportIcon} />
            <Text style={usingStyles.reportText}>주요 감정</Text>
          </View>
        </View>
        <View style={usingStyles.iconBox}>
          <View>
            <Image source={require('../assets/suggestion.png')} style={usingStyles.reportIcon} />
            <Text style={usingStyles.reportText}>제안</Text>
          </View>
        </View>
        <Animated.View style={{opacity: fadeAnims[2]}}>
          <Text style={usingStyles.text}>아이행봇해를 시작해보세요</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('ChatBot')}}>
            <Text style={usingStyles.btn}>시작하기</Text>
          </TouchableOpacity>
        </Animated.View>
        
      </View>
    </Swiper>
  )
}
export default Using;