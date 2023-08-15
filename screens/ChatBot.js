  import { Text, View, TouchableOpacity, Image } from 'react-native';
  import { useState, useEffect } from 'react';
  import { useSelector } from 'react-redux';
  import axios from 'axios';

  /* modules */
  import stt from '../modules/stt';
  import tts from '../modules/tts';
  import { startRecording, stopRecording, playSound } from '../modules/audio';

  /* css */
  import { chatbotStyles } from '../css/chatbotStyles';


  export default function ChatBot({navigation}) {
    const loginState = useSelector((state) => state.loginState);
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
    };

    async function handleStopRecording() {
      setUserRecording(false);
      setUserTextMaking(true);
      if (recording) {
        const uri = await stopRecording(recording);
        const sttResponse = await stt(uri);
        queryToGPT(sttResponse.text);      
        setUserTextMaking(false);
        setUserChat({ 
          uri: uri,
          text: sttResponse.text,
        }); 
        setRecording(null);
      }
    };

    async function handlePlaySound(uri) {
      await playSound(uri);
    };

    const queryToGPT = async (query) => {
      setChatTextMaking(true);
      setGptChat({text: ''})
      axios.post(`http://13.124.53.159:8079/api/chat/${loginState.id}`, {
          "string": query,
      })
      .then(async (response) => {
        const ttsResponseUri = await tts(response.data.message);
        setChatTextMaking(false);
        setGptChat({
            text: response.data.message,
            uri: ttsResponseUri
        });
        await handlePlaySound(ttsResponseUri);
      })
      .catch(async (error) => {
        setChatTextMaking(false);
        const ttsResponseUri = await tts('다시 한번 말해줘!');
        setGptChat({
            text: '다시 한번 말해줘!',
            uri: ttsResponseUri
        });
        await handlePlaySound(ttsResponseUri);
      });
    };

    useEffect(() => {
      axios.get(`http://52.79.225.144:8080/member/${loginState.id}/profile`)
        .then((response) => {
          setGptChat({text: `${response.data.data.child_name}! 기다리고 있었어 ^~^\n오늘은 무슨일이 있었니?`})
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, []);

    return (
      <View style={chatbotStyles.container}>
        <TouchableOpacity onPress={}>
          <View style={chatbotStyles.using}>
            <Image source={require('../assets/using.png')} style={[chatbotStyles.Icon]} />
          </View>
        </TouchableOpacity>
        <View style={chatbotStyles.userChat}>
          <View style={chatbotStyles.fx}>
            <Image source={require('../assets/child2_icon.png')} style={chatbotStyles.Icon} />
            <TouchableOpacity onPress={() => {handlePlaySound(userChat.uri)}}>
              {
                userChat.text === null ? null
                : (userRecording === true ? <Text style={chatbotStyles.text}>말하는 중...</Text>
                  : (
                    userTextMaking === true ? <Text style={chatbotStyles.text}>글자를 만드는 중...</Text>
                    : <Text style={chatbotStyles.text}>{userChat.text}</Text>
                  ))
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={chatbotStyles.gptChat}>
          <View style={chatbotStyles.fx}>
            <Image source={require('../assets/robot_icon.png')} style={chatbotStyles.Icon} />
            <TouchableOpacity onPress={() => {handlePlaySound(gptChat.uri)}}>
              {
                chatTextMaking === true ? <Text style={chatbotStyles.text}>대답을 생각하는 중...</Text>
                : <Text style={chatbotStyles.text}>{gptChat.text}</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
        <View  style={chatbotStyles.recordBox}>
          <TouchableOpacity onPress={recording ? handleStopRecording : handleStartRecording}
            onLongPress={() => navigation.navigate("Login")} delayLongPress={3000}> 
            {
              userRecording === true ? 
              <Image source={require('../assets/recording.png')} style={chatbotStyles.recordBtn}/>
              : <Image source={require('../assets/input.png')} style={chatbotStyles.recordBtn}/>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }

