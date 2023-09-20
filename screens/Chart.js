import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';

/* css */
import { chartStyles } from '../css/chartStyles';

function Chart({pieChartData, stackedBarChartData, keywords, concerns, suggestion, sentimentData}) {
  const sentiment = pieChartData[0].population > pieChartData[1].population;
  
  return (
    <View>
      <Text style={chartStyles.title}>이번 주의 주요 키워드 입니다</Text>
      <View>
        {
          keywords.map((a, i) => {
            return (
              <View style={chartStyles.reportView} key={i}>
                <Text style={chartStyles.keyword}>{a.keyword}</Text>
                <Text style={chartStyles.count}>{a.count}회</Text>
                <View style={chartStyles.line} />
              </View>
            )
          })
        }
      </View>

      <View>
        <Text style={chartStyles.title}>키워드 기반 관심사 분석 결과</Text>
        {
          concerns.map((a, i) => {
            return (
              <Text style={chartStyles.concern} key={i}>{a}</Text>
            )
          })
        }
      </View>

      <View>

      </View>

      <View>
        <Text style={chartStyles.title}>이번 주 주요 감정은 {
          sentiment === true ? <Text style={chartStyles.positive}>긍정</Text> 
          : <Text style={chartStyles.negative}>부정</Text>
        } 입니다</Text>
        <Text style={chartStyles.subtitle}>아이의 {
          sentiment === true ? <Text style={chartStyles.positive}>긍정</Text> 
          : <Text style={chartStyles.negative}>부정</Text>
        } 키워드 TOP5</Text>
        {/* <PieChart
          data={pieChartData}
          width={350}
          height={150}
          chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"-5"}
          center={[10, -10]}
        /> */}
        {
          sentiment === true ? sentimentData.posData.map((a, i) => {
            return (
              <Text style={chartStyles.sentimentData} key={i}>{i + 1}.   {a}</Text>
            )
          })
          : sentimentData.negData.map((a, i) => {
            return (
              <Text style={chartStyles.sentimentData} key={i}>{i + 1}.   {a}</Text>
            )
          })
        }
      </View>
      <View>
        <Text style={chartStyles.title}>저번 주 대비 감정 추이 비교</Text>
        <View style={chartStyles.alignCenter}>
          <StackedBarChart
            data={stackedBarChartData}
            width={350}
            height={250}
            chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF', 
                backgroundGradientTo: '#FFFFFF', 
                color: (opacity = 1) => `#FFFFFF`,
                labelColor: (opacity = 1) => `#444444`,
                propsForLabels: {
                    fontSize: 15
                }
            }}
            withHorizontalLabels={false}
        />
        </View>
      </View>

      <View>
        <Text style={chartStyles.title}>부모님께 드리는 제안</Text>
        <Text style={chartStyles.suggestion}>{suggestion}</Text>
      </View>
    </View>
  )
}

export default Chart;