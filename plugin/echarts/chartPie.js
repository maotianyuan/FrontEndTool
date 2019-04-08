// 饼图
// https://gallery.echartsjs.com/editor.html?c=xHyjabwiDX

import { ECHARTS_COLORS } from 'constant/colors'

// 根据业务定制不同主题，私有
const Theme = {
    'normal': {
        color: ECHARTS_COLORS,
        center: ['50%', '64%'],
        legendConfig: {
            top: 50,
            x: 'center'
        }
    },
    'inlineTop': {
        color: ECHARTS_COLORS,
        center: ['50%', '55%'],
        legendConfig: {
            top: 20,
            x: 'center'
        }
    },
    'multiple': {
        color: ECHARTS_COLORS,
        center: ['32%', '55%'],
        legendConfig: {
            orient: 'vertical',
            right: 10,
            left: '60%',
            y: 'center',
            align: 'left'
                // padding: [80, 10, 0, 10]
        }
    },
    'multiple7': {
        color: ECHARTS_COLORS,
        center: ['40%', '55%'],
        legendConfig: {
            orient: 'vertical',
            right: 10,
            left: '70%',
            y: 'center',
            align: 'left'
                // padding: [80, 10, 0, 10]
        }
    }
}
const InlineTopLegend = ['test', '特殊处理文字', '文字', '业务处理'] // legend出现这些，则位置有所变化
    /**
     * 饼图
     * @param { Object },
     * value = [], legend = [], color = [], title = ‘’
     * theme = 默认配置组合 权重低于singleTheme  默认值 ‘normal’
     * singleTheme = ‘单独配置项，权重高于theme内部’
     * @return { Object }
     */

export function chartPie({ legend = [], value = [], title = '', theme = 'normal', singleTheme = {} }) {
    let targetTheme = Object.assign({}, Theme[theme], singleTheme)
        // value = [12, 23, 13]
        // legend = ['接待态度不好', '展厅环境/设施不舒适', '对产品车辆本身不满意']

    if (legend.length === 7) {
        targetTheme = Theme['multiple7']
    } else if (legend.length > 3) {
        targetTheme = Theme['multiple']
    } else {
        targetTheme = InlineTopLegend.includes(legend[0]) ? Theme['inlineTop'] : Theme['normal']
    }
    let { color, center, legendConfig } = targetTheme
    let seriesData = []

    let legend_n = []
    value.map((item, index) => {
        let _tempStr = legend[index]
        let newStr = ''
        if (legend.length > 3) {
            newStr = _tempStr && _tempStr.length > 18 ? _tempStr.substring(0, 18) + '\n' + _tempStr.slice(18) : _tempStr
        } else {
            newStr = _tempStr && _tempStr.length > 14 ? _tempStr.substring(0, 14).concat('...') : _tempStr
        }
        legend_n.push(newStr)
        seriesData.push({
            value: item,
            name: newStr
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
        legend: {
            ...legendConfig,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            borderRadius: 4,
            data: legend_n,
            textStyle: {
                fontSize: 12,
                color: '#414957'
            }
        },
        series: {
            name: '-',
            type: 'pie',
            hoverAnimation: false,
            center: center,
            radius: ['0%', '55%'],
            labelLine: {
                normal: {
                    show: true,
                    length: 10,
                    length2: 20,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    },
                    emphasis: {
                        show: true
                    }
                }
            },
            label: {
                normal: {
                    formatter: function(param) {
                        if (!param.percent) return param.percent
                        var f = Math.round(param.percent * 10) / 10
                        var s = f.toString()
                        var rs = s.indexOf('.')
                        if (rs < 0) {
                            rs = s.length
                            s += '.'
                        }
                        while (s.length <= rs + 1) {
                            s += '0'
                        }
                        let name = param.data.value + ','
                        return ['{a|' + name + '}\n{hr|}\n{per|' + s + '%}']
                    },
                    rich: {
                        a: {
                            fontSize: 13,
                            color: '#414957',
                            width: 22,
                            padding: [0, 0, 0, 0],
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#ccc',
                            width: '100%',
                            borderWidth: 0,
                            height: 0
                        },
                        per: {
                            fontSize: 13,
                            align: 'center',
                            color: '#414957',
                            padding: [2, 6]
                        }
                    }
                }
            },
            color: color,
            data: seriesData
        }
    }
}