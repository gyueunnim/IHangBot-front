import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

/* screens */
import Chart from './Chart';

/* css */
import { chartStyles } from '../css/chartStyles';
import { commonStyles } from '../css/commonStyle';
import { reportStyles } from '../css/reportSetStyles';

function Report({navigation}) {
  const loginState = useSelector((state) => state.loginState);
  const [loading, setLoading] = useState(0);
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [sentimentData, setSentimentData] = useState({
    negData: [],
    posData: [],
  });
  const [sentiments, setSentiments] = useState({
    negThisWeek: 0,
    negLastWeek: 0,
    posThisWeek: 0,
    posLastWeek: 0,
  });
  
  const pieChartData = [
    {
      name: "긍정",
      population: sentiments.posThisWeek,
      color: "#0098DB",
      legendFontColor: "#444444",
      legendFontSize: 17
    },
    {
      name: "부정",
      population: sentiments.negThisWeek,
      color: "#DB4D69",
      legendFontColor: "#444444",
      legendFontSize: 17
    },
  ];

  const stackedBarChartData = {
    labels: ["저번 주", "이번 주"],
    legend: ["부정", "긍정"],
    data: [
        [Number(sentiments.negLastWeek.toFixed(0)), Number(sentiments.posLastWeek.toFixed(0))],
        [Number(sentiments.negThisWeek.toFixed(0)), Number(sentiments.posThisWeek.toFixed(0))]
    ],
    barColors: ["#DB4D69", "#0098DB"],
  };

  useEffect(() => {
    axios.post(`http://52.79.225.144:8080/report/${loginState.id}`)
    .then((response) => {
      const weekSentimentData = response.data.data.sentiments;
      const convertPercentageLastWeek = weekSentimentData.negLastWeek + weekSentimentData.posLastWeek;
      const convertPercentageThisWeek = weekSentimentData.negThisWeek + weekSentimentData.posThisWeek;
      setSentiments({
        negLastWeek: weekSentimentData.negLastWeek / convertPercentageLastWeek * 100,
        posLastWeek: weekSentimentData.posLastWeek / convertPercentageLastWeek * 100,
        negThisWeek: weekSentimentData.negThisWeek / convertPercentageThisWeek * 100,
        posThisWeek: weekSentimentData.posThisWeek / convertPercentageThisWeek * 100,
      });
      setConcerns(response.data.data.concerns);
      setKeywords(response.data.data.keywords);
      setSuggestion(response.data.data.suggestion);
      setSentimentData({
        negData: weekSentimentData.negData,
        posData: weekSentimentData.posData,
      })
      setLoading(2);
    })
    .catch((error) => {
      setLoading(1);
      // console.log(error);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://52.79.225.144:8080/member/${loginState.id}/profile`)
    .then((response) => {
      setName(response.data.data.child_name);
    })
    .catch((error) => {
      // console.log(error)
    });
  });

  return (
    <View style={reportStyles.container}>
      <ScrollView style={reportStyles.scrollContainer}>
      {
        loading === 1 ?
        <View>
          <Text style={chartStyles.loadText}>데이터가 없습니다</Text>
          <Text style={chartStyles.loadText}>대화를 시작해보세요!</Text>
        </View>
        :
          loading === 0 
          ? <View style={chartStyles.loading}>
              <Spinner visible={loading === 0 ? true : false} textContent={'분석중 입니다...\n잠시만 기다려 주세요'} textStyle={{ color: '#FFF', fontSize: 20, height: 75, textAlign: 'center'}} />
            </View> 
          : <View>
              <Text style={chartStyles.main}>{name}님의 위클리 보고서</Text>
              <Chart pieChartData={pieChartData} stackedBarChartData={stackedBarChartData} keywords={keywords} concerns={concerns} suggestion={suggestion} sentimentData={sentimentData} />
            </View>
      }
      </ScrollView>


      <View style={commonStyles.bottomTextContainer}>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity>
            <Ionicons name='newspaper' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
            <Ionicons name='home-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.bottomText}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Ionicons name='person-circle-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Report;