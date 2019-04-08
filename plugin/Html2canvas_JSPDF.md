## 网页转化为图片

### vue中minix片段

场景 将多个element html片段，生成多页PDF，不满一页PDF空白，并添加页脚；
mergePageIndex 需要于下一页合并的 element数组元素下标值（因为有的html片段过短）；

```downPdf.js
import JsPDF from 'jspdf'
import Html2canvas from 'html2canvas'
/**
 * 依赖参数
 * pptOptions: {
     title: '分析报告',
     direction: 'landscape',
     mergePageIndex: [1, 3],  // 表示 pageWrap_0需要于 pageWrap_1 合并到一页, pageWrap_2需要于 pageWrap_3
     size: [490, 641.89]
     element: ['#pageWrap_home', '#pageWrap_0', '#pageWrap_1', '#pageWrap_2',
       '#pageWrap_3', '#pageWrap_4', '#pageWrap_5', '#pageWrap_6', '#pageWrap_7', '#pageWrap_8', '#pageWrap_9', '#pageWrap_footer']
      
   }
 */
export default {
  data () {
    return {
      pdfWidth: ''
    }
  },
  methods: {
    async downPDF () {
      this.pdfWidth = this.$_getWidth()  // 计算一次pdf的宽度
      await this.$_createImage()
    },
    // 将对应的 element 片段生成 图片base64格式
    async $_createImage () {
      let pageDataList = []
      for (let i = 0; i < this.pptOptions.element.length; i++) {
        let canvas = await Html2canvas(document.querySelector(this.pptOptions.element[i]), {
          allowTaint: false,
          useCORS: true
        })
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        pageDataList.push({
          pageData: canvas.toDataURL('image/jpeg', 1), // 将图片格式由 png 改为jepe，改善很大，相同内容png 可能回到100+M 而jepe会优化至10M
          imgHeight: this.pdfWidth / contentWidth * contentHeight
        })
      }
      await this.$_savePdf(pageDataList)
    },
    // 将图片 转化为 PDF，该合并的合并，不合并的添加分页
    async $_savePdf (pageDataArr = []) {
      let PDF = new JsPDF(this.pptOptions.direction, 'pt', this.pptOptions.size)
      PDF.setFontSize(10)
      PDF.setFontType('normal')
      PDF.setTextColor(204, 204, 204)
      let len = pageDataArr.length
      pageDataArr.map(async (item, index) => {
        let { pageData, imgHeight } = item
        let _index = index
        if (this.pptOptions.mergePageIndex.includes(--_index)) {
          PDF.addImage(pageData, 'JPEG', 0, 214.97413970588235, this.pdfWidth, imgHeight)
          PDF.text(this.pdfWidth - 25, this.pptOptions.size[0] - 10, `0${1 + (++_index) / 2}`)
          await PDF.addPage()
        } else {
          PDF.addImage(pageData, 'JPEG', 0, 0, this.pdfWidth, imgHeight)
          if ((index + 1) < len) {
            if (!this.pptOptions.mergePageIndex.includes(index)) {
              index !== 0 && PDF.text(this.pdfWidth - 25, this.pptOptions.size[0] - 10, `0${--index}`)
              await PDF.addPage()
            }
          }
        }
      })
      await PDF.save(`${this.pptOptions.title}.pdf`)
    },

    $_getWidth () {
      return this.pptOptions.direction === 'landscape' ? this.pptOptions.size[1] : this.pptOptions.size[0]
    }
  }
}

```

### 不分页PDF

对一块html 片段生成 对应PDF
```
// 压缩base64
compressBlob(base64, bili, callback) {
  let _img = new Image();
  let _this = this
  _img.src = base64;
  _img.onload = function() {
    let _canvas = document.createElement("canvas");
    let w = this.width / bili;
    let h = this.height / bili;
    _canvas.setAttribute("width", w);
    _canvas.setAttribute("height", h);
    _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
    let base64 = _canvas.toDataURL("image/jpeg");  // 当生成文件很大切是动态数据时，不可忽视png和jgeg
    _canvas.toBlob(function(blob) {
      if (blob.size > 1024 * 1024) {
        _this.compressBlob(base64, bili, callback);
      } else {
        callback(blob, base64);
      }
    }, "image/jpeg");
  }
},
downPDF() {
  if (this.downBtnStatus == 'disabled') {
    return
  }
  let _this = this
  if (this.loadingInstance) this.loadingInstance.close();
  this.loadingInstance = this.$loading({
    lock: true,
    text: '报告下载中，请勿关闭',
    customClass: 'primary-loading',
    background: 'rgba(0,0,0,.5)',
  });
  this.downBtnStatus = 'disabled'
  html2canvas(document.querySelector('#mainRightBoxDoalog'), {
    allowTaint: false,
    useCORS: true,
  }).then(function(canvas) {
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    let pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    let imgWidth = 595.28
    let imgHeight = 592.28 / contentWidth * contentHeight
    let pageData = 0;

    // if(_this.typeLen>13){  // 注释代码 实际调整 .8 1 参数改观不大
          // pageData = canvas.toDataURL('image/jpeg', .8)
    // }else{
          pageData = canvas.toDataURL('image/jpeg', 1)
    // }

    console.log(pageData.length)
    var BILI = 1;   
    switch (_this.typeLen) {  //根据Pdf页数压缩 比例，否则页书过大，文件则过大，部分浏览器电脑会崩
      case 11:
        BILI = 1.1;
        break;
      case 12:
        BILI = 1.256;
        break;
      case 13:
        BILI = 1.256;
        break;
      case 14:
        BILI = 1.256;
        break;
      default:
        BILI = 1;
        break;
    }
    _this.compressBlob(pageData, BILI, function(blob, base64) {  // 实际此函数compressBlob并未调用，而是将png改为jepg优化，压缩base64 多种情况压缩清晰度不能稳定保证
      console.log(base64.length)
      console.log(base64.length / pageData.length)

      let PDF = new jsPDF('', 'pt', [imgWidth,imgHeight])
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      PDF.save(_this.PAGE_TITLE + '.pdf')

      // 可忽视业务代码
      setTimeout(() => {
        document.querySelector('#mainRightBoxDoalog').style.cssText = ''
        _this.downBtnStatus = 'normal'
        _this.loadingInstance.close();
        _this.handleClose()

        for (var i = 0; i < 15; i++) {  
            _this.multipleBottomDataDialog[`btmDialog${i}num`] = Object.assign({
              id: `btm${i}num`,
              isPdf: true,
            } || {}, {})
            _this.multipleBottomDataDialogZhanBI[`btmDialog${i}ratio`] = Object.assign({
              id: `btm${i}ratio`,
              isPdf: true
            } || {}, {})
        }
      }, 2000)
    })
  })
},
```

### 总结

- 适用场景
  - html2canvas,jsPDF 
    - 生成报告是静态的，页数可控制，内容不多小于3
    - 生成完既走
    - 文字多，图片少，清晰度要求不高
    - 对网络以及浏览器性能要求高
    - 依赖用户当前浏览器对css解析程度
>通过多次尝试，发现移动端不支持此插件，若发现支持者，欢迎沟通；故移动端也可以让/node/php/java 配合，前端需要的将网页生成base64图片，传给后端；

  - node puppeteer
    - 动态内容，页数过多，内容过多
    - 文件需要存储
    - 批量生成报告 
    - 图片过多要求高的清晰度
    - 看服务器配置

>依然有坑，看puppeteer 使用，坑大致为：
puppeteer需要安装google-chrome，然被墙；服务器上无法安装，如何使用看puppeteer使用，为同事整理；前提你公司使用node，可掘金搜索相关资料



  - php 现将图片转为ppt然后在专为pdf；