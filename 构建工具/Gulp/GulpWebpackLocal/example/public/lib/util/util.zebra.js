/**
 * 工具类集合
 */

/**
 * 通过webpack打包 可获得 全局公共参数
 */
console.log(process.env) 

const util = {
	 /**
     * 公共AJAX
     * @param opts
     * @returns {*}
     */
    easyAjax (opts) {
        var _that = this;
        if(process.env.NODE_ENV==='development'){
             opts.url = '/mockApi/'+opts.url
        }else{
          // opts.url = opts.url.replace(/mockApi\/|localApi\//i,'')
        }
        var define = {
            type: 'POST',
            url: '',
            scriptCharset: "utf-8",
            dataType: 'json',
            data: {},
            async: false,
            cache: false,
            // processData: false,
            // contentType: false,
            statusCode: {
                500: function (res, textStatus, err) {
                    layer.msg("操作失败，服务器出现异常！", {time : 1500, icon : 2});
                },
            },
            beforeSend:function(data,xhr){
                // _that.getToken();
                // console.log(xhr);
                // console.log(xhr.data);
                // console.log(data);
            },
            success: function (data) {
            },
            error: function (sta, xhr, thrown) {
                var isIE = navigator.userAgent;
                if (isIE.indexOf('MSIE') < 0) {
                    console.log(sta);
                    console.log(xhr);
                    console.log(thrown);
                }
            }
        };
        $.extend(define, opts);
        return $.ajax(define);
    },
    /**
     * 公共url地址获取
     * @param url
     * @returns {{}}
     */
    paraseUrl(url) {
        var pattern = /(\w+)=([^\#&]*)/ig;
        var parames = {};
        url.replace(pattern, function(attr, key, value) {
            parames[key] = decodeURI(value);
        })
        return parames;
    },
    getYear(){
        return new Date().getFullYear()
    },
}
export default util;
