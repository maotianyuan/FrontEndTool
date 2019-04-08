// 堆积图
// https://gallery.echartsjs.com/editor.html?c=xC1pLMb20f

import Echarts from 'vue-echarts/components/ECharts'
import { ECHARTS_COLORS, ECHARTS_COLORS_OPACITY } from 'constant/colors'

const Theme = {
        'normal': {
            color: ECHARTS_COLORS,
            color_opacity: ECHARTS_COLORS_OPACITY,
            symbol: '%',
            formatterValue: 100
        }
    }
    /**
     * 折线
     * @param { Object },
     * xAxis = [], yAxis = [[],[],], legend = [], title = ‘’
     * theme = 默认配置组合 权重低于singleTheme  默认值 ‘normal’
     * singleTheme = ‘单独配置项，权重高于theme内部’
     * @return { Object }
     */

export function chartStackMultiple({ legend = [], xAxis = [], yAxis = [], yAxisOrigin = [], title = '', theme = 'normal', singleTheme = {} }) {
    let targetTheme = Object.assign({}, Theme[theme], singleTheme)
    let { color, symbol, color_opacity, formatterValue } = targetTheme
    let seriesData = []
        // legend = ['非常有意愿/9-10分', '可能有意愿/7-8分', '不太有意愿/1-6分']
        // yAxis = [
        //   [50, 35, 10, 12, 14, 55, 34],
        //   [35, 55, 40, 18, 90, 12, 30],
        //   [15, 10, 50, 70, 9, 12, 50]
        // ]
        // xAxis = ['2017-Q1', '2017-Q2', '2017-Q3', '2017-Q4', '2018-Q1', '2018-Q1', '2018-Q2']

    legend instanceof Array && legend.forEach((item, index) => {
        let name = legend[index]
        seriesData.push({
            name: name,
            type: 'line',
            stack: '总量',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            symbolSize: 5,
            label: {
                normal: {
                    show: false
                }
            },
            areaStyle: {
                normal: {
                    color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: color_opacity[index]
                        },
                        {
                            offset: 1,
                            color: color_opacity[index]
                        }
                    ], false)
                }
            },
            lineStyle: {
                normal: {
                    color: color[index]
                }
            },
            itemStyle: {
                normal: {
                    color: color[index]
                }
            },
            data: yAxis[index] && yAxis[index].map(item => item * formatterValue)
        })
    })
    return {
        title: {
            show: false,
            text: title,
            x: '4%',
            top: '4%',
            textStyle: {
                color: '#4D5562',
                fontSize: '16',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            formatter: function(params) {
                let time = ''
                let str = []
                for (var i of params) {
                    time = i.name.replace(/\n/g, '').concat('<br/>')
                        // let value = i.value ? (i.value * formatterValue).toFixed(1) : i.value
                    let value = i.value ? (i.value * 1).toFixed(1) : i.value
                    let _yAxisOrigin = `数量: ${yAxisOrigin[i.seriesIndex] && yAxisOrigin[i.seriesIndex][i.dataIndex]}`
                    let _value = `百分比:${value}${symbol}`
                    let name = `<div style="height:24px;line-height:24px;text-align:left"><span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}">
          </span>${i.seriesName}：${_yAxisOrigin};&nbsp;&nbsp;${_value}</div>`
                    str.push((i.data === 'null' || i.data === null) ?
                        `<span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}"></span> ${i.seriesName}：无数据<br/>` :
                        `${name}`
                    )
                }
                return time + str.join('')
            }
        },
        legend: {
            right: 10,
            top: 45,
            x: 'center',
            icon: 'roundRect',
            data: legend,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            textStyle: {
                fontSize: 12,
                color: '#414957'
            }
        },
        grid: {
            x: 50,
            y: 80,
            x2: 50,
            y2: 70
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis,
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#F1F3F5',
                    type: 'solid'
                }
            },
            axisLabel: {
                show: true,
                interval: '0',
                margin: 10,
                color: '#687284'
            }
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLine: {
                show: true,
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#F1F3F5',
                    type: 'solid'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                formatter: '{value}' + symbol,
                textStyle: {
                    color: '#687284'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: seriesData,
        dataZoom: [{
            type: 'slider',
            show: true,
            bottom: 20,
            height: 20,
            startValue: xAxis.length - 12,
            endValue: xAxis.length
        }]
    }
}