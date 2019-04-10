import util from 'util'
import LineBar from './mod-js/line-bar.js'
/**
 * 页面中的ajax请求路由 集合
 */
const urlConfig = {
	indexReport: '/bi/joyIndexSecond',
}
class EcharIndex {
	constructor() {
		$('#asideUl .echarts-shell').asideSet()
		this.getLineBar()
	}
	getLineBar() {
		var lineBar = new LineBar()
		lineBar.createEchar({
			id: 'lineBar_1',
			myValue: [40, 60, 29, 70, 100], //矩形数值
			name: '提示描述信息',
			lineColor: '#C4C9D3',
			rectColor: ['#7091C4', '#5170A2', '#A6A6A6', '#C4C9D3', '#3FA7DC'], //矩形颜色
			rectHeight: 24, //矩形高度
			step: 12, //矩形上线间距
			lineWidth: 2, //连线宽度
			originX: 180, //距离左上 0 0 x的距离
			originY: 50, //距离画布左上0 0 y的距离
		})
	}
}


$(function() {
	new EcharIndex()
})