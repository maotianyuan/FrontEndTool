// 多折线 单折线
// https://gallery.echartsjs.com/editor.html?c=xXLsS1RDmy

import { utilNumDecimal } from '@/utils'
import { ECHARTS_COLORS } from 'constant/colors'

const Theme = {
        'normal': {
            color: ECHARTS_COLORS,
            yAxisLabel: true // 展示Y轴信息        --默认展示 true
        }
    }
    /**
     * 折线
     * @param { Object },
     * xAxis = [], yAxis = [[],[],], legend = [], color = [], title = ‘’
     * legendSelected = [], //默认选中
     * theme = 默认配置组合 权重低于singleTheme  默认值 ‘normal’
     * singleTheme = ‘单独配置项，权重高于theme内部’
     * @return { Object }
     */

export function chartLine({ legend = [], legendSelected = [], xAxis = [], yAxis = [], title = '', theme = 'normal', singleTheme = {} }) {
    let seriesArr = []
    let legendSele = {}
    let targetTheme = Object.assign({}, Theme[theme], singleTheme)
    let { color, yAxisLabel } = targetTheme
    yAxis.forEach((item, index) => {
        let name = legend[index]
        legendSelected.includes(name) ? legendSele[name] = true : legendSele[name] = false
        seriesArr.push({
            name: name,
            type: 'line',
            data: item,
            smooth: false,
            symbol: 'circle',
            hoverAnimation: true,
            showAllSymbol: true,
            symbolSize: '8'
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
        grid: {
            x: 35,
            y: 80,
            x2: '22%',
            y2: 70
        },
        color: color,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let time = ''
                let str = []
                for (var i of params) {
                    time = i.name.replace(/\n/g, '').concat('<br/>')
                    str.push((i.data === 'null' || i.data === null) ?
                        `<span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}"></span>${i.seriesName}：无数据<br/>` :
                        `<span style="height: 10px;width: 10px;display: inline-block;border-radius: 50%;background:${color[i.seriesIndex]}"></span>${i.seriesName}：${utilNumDecimal(i.data)}<br/>`
                    )
                }
                return time + str.join('')
            }
        },
        legend: {
            icon: 'roundRect',
            orient: 'vertical',
            right: 10,
            left: '80%',
            y: 'center',
            align: 'left',
            padding: [30, 10],
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            data: legend,
            textStyle: {
                fontSize: 12
            },
            formatter: (name) => {
                if (!name) return
                return name.length > 6 ? name.substring(0, 6).concat('...') : name
            },
            selected: legendSele
        },
        xAxis: {
            data: xAxis,
            axisLine: {
                lineStyle: {
                    color: '#AFB6C4',
                    type: 'solid'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: '0',
                color: '#687284',
                margin: 10
            },
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            scale: true,
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
                // lineStyle: {
                //   color: '#F1F3F5',
                //   type: 'solid'
                // }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#AFB6C4',
                    type: 'solid'
                }
            },
            axisLabel: {
                show: yAxisLabel,
                color: '#687284'
            },
            splitNumber: 4
        },
        dataZoom: [{
            type: 'slider',
            show: true,
            bottom: 20,
            height: 20,
            startValue: xAxis.length - 12,
            endValue: xAxis.length
        }],
        series: seriesArr
    }
}