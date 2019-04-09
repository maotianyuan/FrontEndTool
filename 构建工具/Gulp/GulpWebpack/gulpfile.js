/*
 * ls  监听test_www文件下 html中 所有 .html文件
 * gulp .yourproject-test_www-less  监听test_www文件下 less中 所有 .less 文件
 * gulp .yourproject-test_www-js  监听test_www文件下改的 js文件
 * gulp .yourproject-test_www-all  监听test_www所有资源文件
 * gulp yourproject-test_www-all 打包压缩全部
 * gulp yourproject-test_www-js压缩test_www资源文件所有js
 * gulp yourproject-test_www-js-Base/user/baseUser压缩test_www资源文件下base/user/baseUser.js文件
 * gulp yourproject-test_www-css  压缩test_www资源文件所有css
 * gulp yourproject-test_www-html  压缩test_www资源文件html文件
 *      不带[.]点为打包，带[.]为监听所有静态资源文件 不监听mod-js下的模块js文件
 */

const glob = require('glob');
const gulp = require('gulp');
const less = require('gulp-less');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const webpack = require('webpack');
const gulpwebpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const os = require('os');
const fs = require('fs');

let d = new Date();
var htmlData = ((d) => {
    let years = new Date().getFullYear();
    let months = toDouble(new Date().getMonth() + 1);
    let dates = toDouble(new Date().getDate());
    return years + '' + months + '' + dates;
})();

function toDouble(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
var banner = os.userInfo().username + ' modified this file at ' + new Date().toLocaleString()
const folderName = process.argv[2];

const package = (() => {
    var str = folderName.split('-')[0] || 'yourproject';
    var nstr = str.replace('.', '');
    return nstr.replace('+', '');
})();

const webpackConfig = require('./' + package + '/webpack.config');

//【test_www,test_admin前台后台】
const project = (() => {
    var str = folderName.split('-')[1] || 'test_test';
    var nstr = str.replace('.', '');
    return nstr.replace('+', '');
})();

// 引入组件
const cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件更名
    gulpcopy = require('gulp-file-copy');

//【all|js|css|html|css】
const sourceType = (() => {
    var str = folderName.split('-')[2] || console.log('请输入打包类型all js css html');
    if (str) {
        var nstr = str.replace('.', '');
        return nstr.replace('+', '');
    }
})();

var targetJsPath = '';
var targetJsFilePath = '/';
var isZarJs = 0; //监听法压缩js文件
// 监控 || 打包
const isWatch = (() => {
    //带点为监听，不带点位打包
    var bl = folderName.indexOf('.') == 0 || folderName.indexOf('+') == 0 ? "watch" : 'compile' + sourceType;
    isZarjs = folderName.indexOf('+') == 0 ? "1" : '0';
    //压缩文件是否制定单个js文件
    var str = folderName.split('-')[3];
    if (bl != 'watch' && str) {
        targetJsPath = str.replace('.js', ''); //单个文件压缩路径例子：Base/user/baseUserAdd
    }
    return bl;
})();

//静态资源存放地点，可随不同项目变更
const assets = '/' + package + '/resources/assets/'
const webPath = assets + project + '/';

let method = {
    //监控
    watch() {
        var isNormal = 1;
        switch (sourceType) {
            case "all":

                if (isZarjs == 1) {

                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejsZar(event)
                    });
                } else {
                    htmlData = d.getTime();
                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejs(event)
                    });
                }

                gulp.watch('.' + webPath + 'less/**/*.less', function(event) {
                    method.compileless(event)
                });
                gulp.watch('.' + webPath + 'css/**/*.css', function(event) {
                    method.compilecss(event)
                });
                gulp.watch('.' + webPath + '/html/**/*.html', function(event) {
                    method.compilehtml(event)
                });
                // method.compileall();
                break;
            case "js":
                gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                    method.compilejs(event)
                });
                // method.compilejs();
                break;
            case "less":
                gulp.watch('.' + webPath + 'less/**/*.less', function(event) {
                    method.compileless(event)
                });
                // method.compileless();
                break;
            case "html":
                gulp.watch('.' + webPath + '/html/**/*.html', function(event) {
                    method.compilehtml(event);
                });
                break;
            case "css":
                gulp.watch('.' + webPath + 'css/**/*.css', function() {
                    method.compilecss(event)
                });
                // method.compilecss();
                break;
            default:
                isNormal = 0;
                console.log('未选择打包类型');
                break;
        }
        if (isNormal) {
            console.log("\n****************************************************\n" + package + '项目下' + project + "监控模式已启动,请注意在开发结束后执行发布命令(不带[.])\n****************************************************\n")
        } else {
            console.log('\nerror\n');
        }
    },
    compileall() {
        method.compilejs();
        method.compilecss();
        method.compileless();
        method.compilehtml();
    },
    // 压缩JS
    compilejs(event) {
        webpackConfig.entry = {};
        if (typeof event === 'object') {
            var from = event.path;
            if (from.indexOf("\\mod-js\\") > -1) { //如果监听目录中宝航mod-js则不打包
                console.log('************************不打包mod-js下的文件************************')
                return;
            }
            var index = from.lastIndexOf("\\");
            var to = from.substr(0, index).replace("resources\\assets", "public");
            var fileName = from.substring(index + 1, from.length).replace('.js', '');
        } else {
            if (isWatch != 'watch') {
                if (targetJsPath) { //单个
                    var index = targetJsPath.lastIndexOf("/");
                    targetJsFilePath = targetJsPath.substr(0, index);
                    if (!targetJsFilePath) {
                        targetJsFilePath = '/';
                    }
                    var from = path.join(__dirname, webPath + 'js/**/*.js');
                    var to = path.join(__dirname, './' + package + '/public/' + project + '/js/' + targetJsFilePath);
                } else { //批量
                    var from = path.join(__dirname, webPath + 'js/**/*.js');
                    var to = path.join(__dirname, './' + package + '/public/' + project + '/js/dist');
                }
            } else {
                return;
            }
        }

        //打包文件
        if (isWatch != "watch") {
            if (!targetJsPath) {
                console.log('\n！！！！！！！！！！将打包所有js文件！！！！！！！！！！！！！\n')
                readFile(webPath + 'js/**/*.js');
            } else {
                var paths = webPath + 'js/' + targetJsPath + '.js'
                console.log('\n****************将打包' + paths + '文件***********************\n')
                readFile(paths);
            }

            function readFile(readurl) {
                webpackConfig.entry = {};
                glob.sync(__dirname + readurl).forEach(function(files) {
                    if (files.indexOf("\\mod-js\\") > -1) {
                        console.log(files + '自动屏蔽mod-js下的模块文件')
                    } else {
                        var name = files.match(/([^/]+?)\.js/)[1];
                        webpackConfig.entry[name] = files //打包多文件入口
                    }
                });
            }

            webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    except: ['$super', '$', 'exports', 'require']
                },
            }));
        } else {
            webpackConfig.entry[fileName] = from //打包单文件入口
            webpackConfig.output.publicPath = to; // 相对页面的配置
        }

        compile();

        function compile() {
            let time = new Date();
            gulp.src(from)
                .pipe(gulpwebpack(webpackConfig))
                .pipe(replace(/^/ig, `/**\n\t* ${banner} \n*/\n`))
                .pipe(gulp.dest(to));
            console.log(sourceType + ": js-success!");
        }
    },
    compilejsZar(event) {
        webpackConfig.entry = {};
        if (typeof event === 'object') {
            var from = event.path;
            if (from.indexOf("\\mod-js\\") > -1) { //如果监听目录中宝航mod-js则不打包
                console.log('************************不打包mod-js下的文件************************')
                return;
            }
            var index = from.lastIndexOf("\\");
            var to = from.substr(0, index).replace("resources\\assets", "public");
            var fileName = from.substring(index + 1, from.length).replace('.js', '');

        }
        webpackConfig.entry[fileName] = from //打包单文件入口
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
        }));
        webpackConfig.output.publicPath = to; // 相对页面的配置
        compile();

        function compile() {
            let time = new Date();
            gulp.src(from)
                .pipe(gulpwebpack(webpackConfig))
                .pipe(replace(/^/ig, `/**\n\t* ${banner} \n*/\n`))
                .pipe(gulp.dest(to));
            console.log(sourceType + ": js-success!");
        }
    },
    compilecss(event) {
        if (typeof event === 'object') {
            var from = event.path;
            var index = from.lastIndexOf("\\");
            var to = from.substr(0, index).replace("resources\\assets", "public");
        } else {
            var from = path.join(__dirname, webPath + 'css/**/*.css');
            var to = path.join(__dirname, './' + package + '/public/' + project + '/css/');
        }

        compile();

        function compile() {
            gulp.src(from) //多个文件以数组形式传入
                .pipe(plumber())
                .pipe(less())
                .pipe(autoprefixer({
                    browsers: ['last 2 versions', 'Android >= 4.0'],
                    cascade: true, //是否美化属性值 默认：true 像这样：
                    remove: true //是否去掉不必要的前缀 默认：true
                }))
                .pipe(cleanCSS())
                .pipe(gulp.dest(to));
            console.log(sourceType + ": css-success!");
        }
    },
    compileless(event) {
        if (typeof event === 'object') {
            var from = event.path;
            var index = from.lastIndexOf("\\");
            var to = from.substr(0, index).replace("resources\\assets", "public").replace("\\less\\", "\\css\\");
        } else {
            var from = path.join(__dirname, webPath + 'less/**/*.less');
            var to = path.join(__dirname, './' + package + '/public/' + project + '/css/');
        }


        compile();

        function compile() {
            gulp.src(from) //多个文件以数组形式传入
                .pipe(plumber()) //出现错误不终止watch
                .pipe(less())
                .pipe(less())
                .pipe(autoprefixer({
                    browsers: ['last 2 versions', 'Android >= 4.0'],
                    cascade: true, //是否美化属性值
                    remove: true //是否去掉不必要的前缀 默认：true
                }))
                .pipe(cleanCSS())
                .pipe(gulp.dest(to));
            console.log(sourceType + ": less-success!");
        }
    },
    compilehtml(event) {

        if (typeof event === 'object') {
            var from = event.path;
            var index = from.lastIndexOf("\\");
            var to = from.substr(0, index).replace("\\assets\\", "\\views\\").replace('\\html\\', '\\');
        } else {
            var from = path.join(__dirname, webPath + 'html/**/*.html');
            var to = path.join(__dirname, './' + package + '/resources/views/' + project + '/');
        }
        compile();

        function compile() {
            var options = {
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            }
            gulp.src(from, {
                    cwd: './' + package + '/resources/views/' + project
                })
                .pipe(htmlmin(options))
                .pipe(rename(function(path) {
                    path.extname = ".blade.php";
                }))
                // .pipe(replace(/\.js/ig,'.js?_='+new Date().getTime()))
                // .pipe(replace(/\.css/ig,'.css?_='+new Date().getTime()))
                .pipe(replace(/\.js/ig, '.js?_=' + htmlData))
                .pipe(replace(/\.css/ig, '.css?_=' + htmlData))
                .pipe(gulp.dest(to));
            console.log(sourceType + ": html-success!");
        }
    },
}

gulp.task(process.argv[2], method[isWatch]);