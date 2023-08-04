import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { startRecording, stopRecording, playSound } from '../modules/audio';
import stt from '../modules/stt';
import tts from '../modules/tts';
import axios from 'axios';
import { styles } from '../css/chatbotStyles';

export default function ChatBot({navigation}) {

  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();
  const [userChat, setUserChat] = useState({ text: '', uri: '' });
  const [gptChat, setGptChat] = useState({ text: '', uri: '' });
  
  const [userRecording, setUserRecording] = useState(false);
  const [userTextMaking, setUserTextMaking] = useState(false);
  const [chatTextMaking, setChatTextMaking] = useState(false);

  async function handleStartRecording() {
    setUserRecording(true);
    const recording = await startRecording();
    setRecording(recording);
  }

  async function handleStopRecording() {
    setUserRecording(false);
    setUserTextMaking(true);
    if (recording) { // recording 상태가 null이 아닌 경우에만 녹음 중지
      const uri = await stopRecording(recording);
      const sttResponse = await stt(uri);
      setUserChat({ 
        uri: uri,
        text: sttResponse.text
      }); 
      console.log('gpt실행')
      queryToGPT(sttResponse.text);
      setRecording(null); // recording 상태 초기화
    }
  }

  async function handlePlaySound(uri) {
    await playSound(uri);
  }

  const queryToGPT = async (query) => {
    setUserTextMaking(false);
    setChatTextMaking(true);
    axios.post(`http://13.124.53.159:8079/api/chat/test1234`, {
        "string": '안녕'
    })
    .then(async (response) => {
      console.log(response.data);
      const ttsResponseUri = await tts(response.data.message);
      setChatTextMaking(false);
      setGptChat({
          text: response.data.message,
          uri: ttsResponseUri
      });
      await handlePlaySound(ttsResponseUri);
    })
    .catch((error) => console.error(error))
  }

  // useEffect(() => {
  //   console.log('(Chatbot)-Recording stopped and stored at', userChat.uri);
  // }, [userChat.uri]);

  // useEffect(() => {
  //   console.log('userChat-text: ', userChat.text);
  // }, [userChat.text])

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.userChat}>
        <View style={styles.fx}>
          <Image source={require('../assets/child_Icon.png')} style={styles.Icon} />
          <TouchableOpacity onPress={() => {handlePlaySound(userChat.uri)}}>
            {
              userChat.text === null ? null
              : (userRecording === true ? <Text style={styles.text}>말하는 중...</Text>
                : (
                  userTextMaking === true ? <Text style={styles.text}>글자를 만드는 중...</Text>
                  : <Text style={styles.text}>{userChat.text}</Text>
                ))
            }
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.gptChat}>
        <View style={styles.fx}>
          <Image source={require('../assets/chatbot_Icon.png')} style={styles.Icon} />
          <TouchableOpacity onPress={() => {handlePlaySound(gptChat.uri)}}>
            {
              chatTextMaking === true ? <Text style={styles.text}>대답을 생각하는 중...</Text>
              : <Text style={styles.text}>{gptChat.text}</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
      <View  style={styles.recordBox}>
        <TouchableOpacity onPress={recording ? handleStopRecording : handleStartRecording}
          onLongPress={() => navigation.navigate("Login")} delayLongPress={3000}>
            <Image source={require('../assets/input_Icon.png')} style={styles.recordBtn}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

