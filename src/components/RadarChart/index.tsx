import { View } from '@tarojs/components'
import * as echarts from "../ec-canvas/echarts"
import { useState } from 'react'

const EChart = () => {
  const [ec] = useState({ onInit: initChart })

  function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr
    })
    canvas.setChart(chart)

    const option = {
      radar: {
        indicator: [
          { name: '粉丝', max: 100 },
          { name: '流量', max: 100 },
          { name: '作品', max: 100 },
          { name: '粉关比', max: 100 },
          { name: '定位', max: 100 },
          { name: '涨粉', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [80, 90, 70, 85, 75, 60],
            name: '数据',
            areaStyle: {
              // 配置区域填充样式
              color: 'rgba(0, 102, 204, 0.5)' // 颜色和透明度可以根据需要调整
            }
          }
        ]
      }]
    }

    chart.setOption(option)
    return chart
  }

  return (
    <View className="mt-[12px] mx-auto w-[300px] h-[300px]">
      <ec-canvas id='mychart-dom-bar' canvas-id='mychart-bar' ec={ec}></ec-canvas>
    </View>
  )
}

export default EChart
