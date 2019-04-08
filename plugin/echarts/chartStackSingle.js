// 单一堆积图

import Echarts from 'vue-echarts/components/ECharts'
import { ECHARTS_COLORS } from 'constant/colors'

const Theme = {
        'normal': {
            color: ECHARTS_COLORS,
            formatterValue: 100,
            symbol: '%'
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

export function chartStackSingle({ legend = [], xAxis = [], yAxisOrigin = [], yAxis = [], title = '', theme = 'normal', singleTheme = {}, maxLegendIndex = 0 }) {
    let targetTheme = Object.assign({}, Theme[theme], singleTheme)
    let { color, formatterValue, symbol } = targetTheme
    // legend = ['非常有意愿/9-10分', '可能有意愿/7-8分', '不太有意愿/1-6分']
    // yAxis = [
    //   [10, 7, 8, 8, 7, 9, 8, 7, 7, 8, 10, 10, 10],
    //   [6, 5, 4, 7, 3, 8, 5, 3, 4, 5, 3, 7, 11],
    //   [6, 5, 1, 7, 2, 8, 5, 3, 4, 5, 3, 1, 11]
    // ]
    // xAxis = ['2017-Q1', '2017-Q2', '2017-Q3', '2017-Q4', '2018-Q1', '2018-Q1', '2018-Q2']
    let isSingle = legend instanceof Array && legend.length === 1 ? 1 : 0
    let seriesData = []
    legend instanceof Array && legend.forEach((item, index) => {
        let name = legend[index]
        let _areaStyle = {}
        if (index === maxLegendIndex) {
            _areaStyle = {
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        fontSize: '13',
                        color: '#414957',
                        formatter: function(data) {
                            return data.value ? (data.value * formatterValue).toFixed(1) + symbol : ''
                        }
                    }
                },
                areaStyle: { // 区域填充样式
                    normal: {
                        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(109,131,188,0.23)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(109,131,188,0.07)'
                            }
                        ], false)
                    }
                }
            }
        } else {
            _areaStyle = {
                label: {
                    normal: {
                        show: false
                    }
                }
            }
        }
        seriesData.push({
            name: name,
            type: 'line',
            // stack: '总量',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            symbolSize: 5,
            ..._areaStyle,
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
            data: yAxis[index]
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
            formatter: function(params) {
                let time = ''
                let str = []
                for (var i of params) {
                    time = i.name.replace(/\n/g, '').concat('')
                    let value = i.value ? (i.value * formatterValue).toFixed(1) : i.value
                    let _yAxisOrigin = isSingle === 1 ? `数量: ${yAxisOrigin[i.dataIndex]}` :
                        `数量: ${yAxisOrigin[i.seriesIndex] && yAxisOrigin[i.seriesIndex][i.dataIndex]}`
                    let _value = `百分比:${value}${symbol}`
                    let name = isSingle === 1 ? `<div style="height:24px;line-height:24px;text-align:left">${_yAxisOrigin}</div><div style="height:24px;line-height:24px;text-align:left">百分比: ${value}${symbol}</div>` :
                        `<div style="height:24px;line-height:24px;text-align:left"><span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}"></span>${i.seriesName}：${_yAxisOrigin};&nbsp;&nbsp;${_value}</div>`
                    str.push((i.data === 'null' || i.data === null) ?
                        `<span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}"></span>无数据<br/>` :
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
            show: legend.length > 1,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            borderRadius: 4,
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
                show: false
            },
            axisLabel: {
                show: true,
                interval: '0',
                color: '#687284'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 10,
                textStyle: {
                    color: '#687284'
                }
            },
            scale: true,
            splitLine: {
                show: true,
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#F1F3F5',
                    type: 'solid'
                }
            },
            splitNumber: 3
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