
export var  commonApp = {

    constructor(){
      var _that = this;
      // _that._init();
    },
    /**
     * 初始化
     * @private
     */
    _init () {
        // 网页全屏
        this._fullScreen($('#js-full-screen'),function (isNormalScreen,$e) {
            $e.html('<span class="ion ion-arrow-'+(isNormalScreen?'expand':'shrink')+'">');
        });

        // 加载侧导航
        this._navNarrow($('#js-toggle-aside-nav'));
        this._navCollapse($('#js-aside-collapse'));
    },

    /**
     * 侧导航折叠效果
     * @param $element 根<ul>元素
     * @private
     */
    _navCollapse($element) {
        $element.children('li').each(function (i,n) {
            var $this = $(n),
                $ul = $this.children('ul'),
                $a = $this.children('a');

            if($ul.size() > 0){
                var aClass = 'collapsed waves-effect waves-dark',
                    ulClass = '',
                    thisClass= 'panel';
                if($ul.children('.active').size() > 0){
                    aClass = 'waves-effect waves-dark';
                    ulClass = 'collapse in';
                    thisClass = 'panel has-children-active';
                }

                $this.attr({'class':thisClass});
                $a.attr({'href':'javascript:;','data-toggle':'collapse','data-parent':'#'+$element[0].id,'class':aClass,'data-target':'#nav-aside-collapse-'+i,'data-index':i})
                    .append('<span class="ion-chevron-right">');
                $ul.attr({'id':'nav-aside-collapse-'+i,'class':ulClass});
            }
        });
    },

    /**
     * 侧导航收起
     * @param $element
     * @private
     */
     _navNarrow ($element) {
        /*if(localStorage.getItem('navAsideStatus')){
            $('body').addClass('bmw-nav-aside-narrow');
        }*/
        $element.click(function () {
            var $body = $('body');
            if($body.hasClass('bmw-nav-aside-narrow')){
                $body.removeClass('bmw-nav-aside-narrow');
                //localStorage.removeItem('navAsideStatus');
            }else{
                $body.addClass('bmw-nav-aside-narrow');
                //localStorage.setItem('navAsideStatus',true);
            }
        });
    },

    /**
     * 浏览器全屏
     * @private
     * @param $element
     * @param callback(isNormalScreen,$element)
     */
    _fullScreen ($element,callback) {
        var isNormalScreen = function () {
          return !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement;
        },
        fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

        // 触发全屏切换
        $element.click(function () {
            if(fullscreenEnabled) {
                // 全屏
                if(isNormalScreen()) {
                    var element = document.documentElement;
                    if(element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if(element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if(element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if(element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }
                // 取消全屏
                else{
                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if(document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if(document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
        });

        // 监听全屏事件
        var callbackFun = function (event) {
            if(typeof callback == "function"){
                callback(isNormalScreen(),$element);
            }
        };
        document.onwebkitfullscreenchange = callbackFun;
        document.onmozfullscreenchange = callbackFun;
        document.onwebkitfullscreenchange = callbackFun;
        document.onmsfullscreenchange = callbackFun;
    }
};
