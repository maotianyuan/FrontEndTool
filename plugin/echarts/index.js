// 更多示例
// https://gallery.echartsjs.com/explore.html?u=bd-599414847&type=work#sort=rank~timeframe=all~author=all

import { chartBar } from './chartBar'
import { chartLine } from './chartLine'
import { chartPie } from './chartPie'
import { chartStackSingle } from './chartStackSingle'
import { chartStackMultiple } from './chartStackMultiple'

class EchartConfig {
    constructor() {
        this.ECHARTS_MAP = {
            barLine: [chartBar, chartLine],
            pieSingleStack: [chartPie, chartStackSingle],
            pieMultipleStack: [chartPie, chartStackMultiple],
            piePie: [chartPie, chartPie],
            onePie: [chartPie, null]
        }
    }
    comOption(type, before, after) {
        return {
            beforeChart: this.utilObjectLen(before) ? this.ECHARTS_MAP[type || 'barLine'][0](before) : before,
            afterChart: this.utilObjectLen(after) ? this.ECHARTS_MAP[type || 'barLine'][1](after) : after
        }
    }
    utilObjectLen(obj) {
        return obj && Object.keys(obj).length > 1 && !obj.tips
    }
}

const echartConfig = new EchartConfig()

export {
    echartConfig
}