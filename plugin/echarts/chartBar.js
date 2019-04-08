// https://gallery.echartsjs.com/editor.html?c=x_ojQGgSIk

import {
    utilNumDecimal
} from '@/utils'

// 一般样式根据业务以组合形式出现，故定义不同的主题
const Theme = {
    'normal': {
        barWidth: 12, // 柱子宽度
        color: ['#6D83BC', '#DA8084'],
        legendShow: false, // 图例是否展示
        legendRight: 'center', // 图例具右侧位置   --默认center居中
        scale: false, // y轴是否自动     --默认不自动 false
        symbol: '', // 数值是否带百分号        --默认为空 ''
        splitNum: [4, 4, 5, 6], // x轴label换行 --默认值 4 4 4 6  四个阶段 <=4 | 5-7| 8-9 |10-14
        seriesLabel: true, // 柱子上方toplabel --默认展示 trur
        yAxisLabel: false, // 展示Y轴信息        --默认展示 false
        ysplitLine: '#F1F3F5' // 分割线颜色
    }
}

/**
 * 单柱子
 * @param { Object },
 * xAxis = [], yAxis = [[],[],], legend = [], color = [], title = ‘’
 * theme = 默认配置组合 权重低于singleTheme  默认值 ‘normal’
 * singleTheme = ‘单独配置项，权重高于theme内部’
 * @return { Object }
 */

export function chartBar({ xAxis = [], yAxis = [], legend = [], title = '', theme = 'normal', singleTheme = {}, warning }) {
    let targetTheme = Object.assign({}, Theme[theme], singleTheme)
    let { barWidth, color, legendShow, legendRight, scale, symbol, splitNum, seriesLabel, yAxisLabel, ysplitLine } = targetTheme
    // 注释不删代码，业务代码
    // let myDataZoom = warning.length <= 0 ? { dataZoom: [{
    //   type: 'slider',
    //   show: warning.length <= 0 && xAxis.length > 8,
    //   bottom: 20,
    //   startValue: xAxis.length - 8 || 0,
    //   endValue: xAxis.length
    // }] } : {}
    var myData = (() => {
        let seriesArr = []
        let legendArr = []
        barWidth = warning && warning.length >= 0 ? 6 : barWidth
        yAxis.forEach((item, index) => {
            // legendArr.push({
            //   name: legend[index]
            // })
            let tempArr = []
            item.forEach(value => {
                tempArr.push(
                    (value || value === 0) ? value : 'null'
                )
            })
            seriesArr.push({
                // name: legend[index],
                type: 'bar',
                barGap: 0.4,
                data: tempArr,
                barCategoryGap: '2%',
                barWidth: barWidth,
                label: {
                    normal: {
                        show: seriesLabel,
                        formatter: function(data) {
                            return utilNumDecimal(data.value)
                        },
                        position: 'top',
                        textStyle: {
                            color: '#414957',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            textAlign: 'left',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 4,
                        color: function(params) {
                            let value = params.value
                            if (warning && warning.includes(value)) {
                                return color[1]
                            } else {
                                return color[index]
                            }
                        }
                    }
                }
            })
        })
        return {
            seriesArr,
            legendArr
        }
    })()
    return {
        title: {
            show: false,
            text: title
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let time = ''
                let str = []
                for (var i of params) {
                    time = i.name.replace(/\n/g, '')
                    str.push((i.data === 'null' || i.data === null) ?
                        `：无数据<br/>` :
                        `：${utilNumDecimal(i.data)}${symbol}<br/>`
                    )
                }
                return time + str.join('')
            },
            axisPointer: {
                type: 'none'
            }
        },
        legend: {
            show: legendShow,
            right: legendRight,
            top: 20,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            borderRadius: 4,
            data: myData.legendArr,
            textStyle: {
                color: '#414957',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
            }
        },
        grid: {
            x: 46,
            y: 80,
            x2: 30,
            y2: 55
        },
        xAxis: {
            type: 'category',
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
                textStyle: {
                    color: '#687284',
                    align: 'center',
                    whiteSpace: 'wrap',
                    lineHeight: 15,
                    height: 50,
                    fontSize: 10
                },
                rich: {
                    normal: {
                        height: 18
                    }
                },
                // 需要优化代码
                formatter: function(params, index) {
                    var newParamsName = ''
                    var splitNumber = 5
                    var paramsNameNumber = params && params.length
                    if (paramsNameNumber && paramsNameNumber <= 4) {
                        splitNumber = splitNum[0] || 4
                    } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                        splitNumber = splitNum[1] || 4
                    } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                        splitNumber = splitNum[2] || 4
                    } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                        splitNumber = splitNum[3] || 5
                    } else if (paramsNameNumber >= 15 && paramsNameNumber <= 16) {
                        splitNumber = splitNum[4] || 6
                    } else if (paramsNameNumber >= 17 && paramsNameNumber <= 20) {
                        splitNumber = splitNum[5] || 6
                    } else {
                        params = params && params.slice(0, 21)
                    }

                    var provideNumber = splitNumber // 一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = ''
                            var start = p * provideNumber
                            var end = start + provideNumber
                            if (p === rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber)
                            } else {
                                tempStr = params.substring(start, end) + '\n'
                            }
                            newParamsName += tempStr
                        }
                    } else {
                        newParamsName = params
                    }
                    let tag = 'normal'
                    let arr = newParamsName && newParamsName.split('\n')
                        // console.log(arr)
                    let str = []
                    switch (arr && arr.length) {
                        case 3:
                            arr.forEach((item, index) => {
                                str.push('{' + tag + '|' + item + '}')
                            })
                            break
                        case 2:
                            arr.forEach((item, index) => {
                                str.push('{' + tag + '|' + item + '}')
                            })
                            str.push('{' + tag + '|' + ' ' + '}')
                            break
                        case 1:
                            arr.forEach((item, index) => {
                                str.push('{' + tag + '|' + item + '}')
                            })
                            str.push('{' + tag + '|' + ' ' + '}')
                            str.push('{' + tag + '|' + ' ' + '}')
                            break
                        default:
                    }
                    return str.join('\n')
                },
                color: '#687284'
            }
        },
        yAxis: {
            scale: scale,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: yAxisLabel,
                textStyle: {
                    color: '#687284'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ysplitLine,
                    type: 'solid'
                }
            }
        },
        // ...myDataZoom,
        series: myData.seriesArr
    }
}