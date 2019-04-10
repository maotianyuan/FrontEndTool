'use strict'

const os = require('os')
const folderName = process.argv[2]


/*************************gulpfile********************************/
function toDouble(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}
function _getfolder (num) {
	if(folderName){
		let str = folderName.split('-')[num] || ''
		return str.replace(/\.|\+/ig, '')
	}else{
		return ''
	}
}
exports.htmlData = function() {
	let years = new Date().getFullYear();
	let months = toDouble(new Date().getMonth() + 1);
	let dates = toDouble(new Date().getDate());
	return years + '' + months + '' + dates;
}
exports.getBanner = function() {
	return os.userInfo().username + ' modified this file at ' + new Date().toLocaleString()
}

exports.getFolder = function() {
	let tempPack = _getfolder(0)
	let tempPro = _getfolder(1)
	return {
		package:tempPack,
		project:tempPro,
		sourceType:_getfolder(2),
		assets:'/'+tempPack+'/resources/assets/',
		webPath: '/'+tempPack+'/resources/assets/'+tempPro+'/'
	}
}

exports.getWatch = function(){
  const sourceType = _getfolder(2)
  let bl = folderName.indexOf('.') == 0 || folderName.indexOf('+') == 0 ? "watch" : 'compile' + sourceType
  let isZarjs = folderName.indexOf('+') == 0 ? "1" : '0'
  let str = _getfolder(3)//压缩文件是否制定单个js文件
  let targetJsPath = ''
  if(bl!='watch'&& str){
    targetJsPath = str.replace('.js','') //单个文件压缩路径例子：Base/user/baseUserAdd
  }
  return {
  	isWatch:bl,
  	isZarjs:isZarjs,
  	targetJsPath:targetJsPath
  };
}

/***************************proxy******************************/
