import util from 'util'

/**
 * 页面中的ajax请求路由 集合
 */
const urlConfig = {
    indexReport: '/bi/joyIndexSecond', 
}
class homeIndex {
    constructor() {
        $('#asideUl .index').asideSet();
        $('#footerYear').text(util.getYear())
    }
}

$(function() {
    new homeIndex()
})