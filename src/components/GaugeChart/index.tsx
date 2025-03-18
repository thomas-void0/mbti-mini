import { View } from '@tarojs/components';
import * as echarts from "../ec-canvas/echarts";
import { useState } from 'react';

const GaugeChart = () => {
  const [ec] = useState({ onInit: initChart });

  function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    const option = {
      series: [{
        name: '业务指标',
        type: 'gauge',
        startAngle: 225,
        endAngle: -45,
        radius: '100%',
        center: ['50%', '55%'],
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.2, '#5ABCF5'],
              [1, '#E1E6E6']
            ]
          }
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: [{
          value: 0,
          name: 'SCORE'
        }]
      }],
      graphic: [
        {
          type: 'group',
          left: 'center',
          top: '45%',
          children: [
            {
              type: 'text',
              z: 100,
              left: 'center',
              top: 'middle',
              style: {
                fill: '#FF4D4F',
                text: '100W-500W',
                font: 'bold 16px Microsoft YaHei',
                textAlign: 'center'
              }
            },
            {
              type: 'text',
              z: 100,
              left: 'center',
              top: '30',
              style: {
                fill: '#FF4D4F',
                text: '百万流量池',
                font: '14px Microsoft YaHei',
                textAlign: 'center'
              }
            }
          ]
        }
      ]
    };

    chart.setOption(option);
    return chart;
  }

  return (
    <View className="mx-auto w-full h-full">
      <ec-canvas id="gauge-chart" canvas-id="gauge-chart" ec={ec}></ec-canvas>
    </View>
  );
}

export default GaugeChart;
