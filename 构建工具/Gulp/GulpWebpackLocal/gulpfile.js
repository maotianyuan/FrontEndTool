/**
 * ls  监听bmw_www文件下 html中 所有 .html文件
 * gulp .bmwdashboard-bmw_www-less  监听bmw_www文件下 less中 所有 .less 文件
 * gulp .bmwdashboard-bmw_www-js  监听bmw_www文件下改的 js文件
 * gulp .bmwdashboard-bmw_www-all  监听bmw_www所有资源文件
 * gulp bmwdashboard-bmw_www-all 打包压缩全部
 * gulp bmwdashboard-bmw_www-js压缩bmw_www资源文件所有js
 * gulp bmwdashboard-bmw_www-js-Base/user/baseUser压缩bmw_www资源文件下base/user/baseUser.js文件
 * gulp bmwdashboard-bmw_www-css  压缩bmw_www资源文件所有css
 * gulp bmwdashboard-bmw_www-html  压缩bmw_www资源文件html文件
 *      不带[.]点为打包，带[.]为监听所有静态资源文件 不监听mod-js下的模块js文件
 */

const glob = require('glob');
const gulp = require('gulp');
const less = require('gulp-less');
const stylus = require('gulp-stylus');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const webpack = require('webpack');
const gulpwebpack = require('gulp-webpack');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const gulpPug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    gulpcopy = require('gulp-file-copy');
const path = require('path');
const fs = require('fs');
const config = require('./config')


var webpackConfig = {}

var htmlData = config.dev.htmlData
const banner = config.dev.banner
var targetJsFilePath = '/';
const {
    package,
    project,
    sourceType,
    assets,
    webPath
} = config.dev.folder
const {
    isWatch,
    isZarjs,
    targetJsPath
} = config.dev.watch

let method = {
    //监控
    watch() {
        var server = livereload();
        livereload.listen();
        var isNormal = 1;
        switch (sourceType) {
            case "all":
                if (isZarjs == 1) {
                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejsZar(event)
                    });
                } else {
                    require('./www/proxy'); //启动web服务
                    htmlData = new Date().getTime();
                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejs(event)
                    });
                }

                gulp.watch('.' + webPath + 'css/**/*.less', function(event) {
                    method.compileless(event)
                });
                gulp.watch('.' + webPath + 'css/**/*.styl', function(event) {
                    method.compilestylus(event)
                });
                gulp.watch('.' + webPath + 'css/**/*.css', function(event) {
                    method.compilecss(event)
                });
                gulp.watch('.' + webPath + '/html/**/*.html', function(event) {
                    method.compilehtml(event)
                });
                gulp.watch('.' + webPath + '/html/**/*.pug', function(event) {
                    method.compilepug(event)
                });
                // method.compileall();
                break;
            case "js":
                if (isZarjs == 1) {
                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejsZar(event)
                    });
                } else {
                    htmlData = new Date().getTime();
                    gulp.watch('.' + webPath + 'js/**/*.js', function(event) {
                        method.compilejs(event)
                    });
                }

                // method.compilejs();
                break;
            case "less":
                gulp.watch('.' + webPath + 'css/**/*.less', function(event) {
                    method.compileless(event)
                });
                // method.compileless();
                break;
            case "styl":
                gulp.watch('.' + webPath + 'css/**/*.styl', function(event) {
                    method.compilestylus(event)
                });
                // method.compileless();
                break;
            case "html":
                gulp.watch('.' + webPath + '/html/**/*.html', function(event) {
                    method.compilehtml(event);
                });
                break;
            case "pug":
                gulp.watch('.' + webPath + '/html/**/*.pug', function(event) {
                    method.compilepug(event);
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
                console.log('请输入打包类型[all-js-css-pug-less]');
                break;
        }
        if (isNormal) {
            console.log("\n****************************************************\n" + package + '项目下' + project + "监控模式已启动,请注意在开发结束后执行发布命令([+])\n****************************************************\n")
        } else {
            console.log('\nerror\n');
            return
        }

    },
    compileall() {
        method.compilejs();
        method.compilecss();
        method.compileless();
        method.compilestylus();
        method.compilehtml();
        method.compilepug();
    },
    // 压缩JS
    compilejs(event) {

        webpackConfig = require('./build/webpack.dev.conf')
        webpackConfig.entry = {};
        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");
            if (from.indexOf("/mod-js/") > -1) { //如果监听目录中宝航mod-js则不打包
                console.log('************************不打包mod-js下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("resources/assets", "public");
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
                    // let files = files.replace(/\\/g, "/");
                    if (files.replace(/\\/g, "/").indexOf("/mod-js/") > -1) {
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
                .pipe(gulp.dest(to)).pipe(livereload());
            console.log(sourceType + ": js-success!");
        }
    },
    compilejsZar(event) {
        webpackConfig = require('./build/webpack.prod.conf')
        webpackConfig.entry = {};
        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");;
            if (from.indexOf("/mod-js/") > -1) { //如果监听目录中包含mod-js则不打包
                console.log('************************不打包mod-js下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("resources/assets", "public");
            var fileName = from.substring(index + 1, from.length).replace('.js', '');

        }
        webpackConfig.entry[fileName] = from //打包单文件入口
        webpackConfig.output.publicPath = to; // 相对页面的配置
        compile();

        function compile() {
            let time = new Date();
            gulp.src(from)
                .pipe(gulpwebpack(webpackConfig))
                .pipe(replace(/^/ig, `/**\n\t* ${banner} \n*/\n`))
                .pipe(gulp.dest(to))
                .pipe(livereload());
            console.log(sourceType + ": js-success!");
        }
    },
    compilecss(event) {
        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");;
            if (from.indexOf("/mod-css/") > -1) { //如果监听目录中包含mod-css则不打包
                console.log('************************不打包mod-css下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("resources/assets", "public");
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
                .pipe(gulp.dest(to))
                .pipe(livereload());
            console.log(sourceType + ": css-success!");
        }
    },
    compileless(event) {
        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");;
            if (from.indexOf("/mod-css/") > -1) { //如果监听目录中包含mod-css则不打包
                console.log('************************不打包mod-css下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("resources/assets", "public").replace("/less/", "/css/");
        } else {
            var from = path.join(__dirname, webPath + 'css/**/*.less');
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
                .pipe(gulp.dest(to)).pipe(livereload());
            console.log(sourceType + ": less-success!");
        }
    },
    compilestylus(event) {
        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");;
            if (from.indexOf("/mod-css/") > -1) { //如果监听目录中包含mod-css则不打包
                console.log('************************不打包mod-css下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("resources/assets", "public");
        } else {
            var from = path.join(__dirname, webPath + 'css/**/*.styl');
            var to = path.join(__dirname, './' + package + '/public/' + project + '/css/');
        }


        compile();

        function compile() {
            gulp.src(from) //多个文件以数组形式传入
                .pipe(plumber()) //出现错误不终止watch
                .pipe(stylus({
                    compress: true,
                    'include css': true,
                    linenos: true
                }))
                .pipe(cleanCSS())
                .pipe(gulp.dest(to)).pipe(livereload());
            console.log(sourceType + ": stylus-success!");
        }
    },
    compilehtml(event) {

        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");;
            if (from.indexOf("/mod-html/") > -1) { //如果监听目录中包含mod-css则不打包
                console.log('************************不打包mod-html下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("/assets/", "/views/").replace('/html/', '/');
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
                .pipe(gulp.dest(to)).pipe(livereload());
            console.log(sourceType + ": html-success!");
        }
    },
    compilepug(event) {

        if (typeof event === 'object') {
            var from = event.path.replace(/\\/g, "/");
            if (from.indexOf("/mod-html/") > -1) { //如果监听目录中包含mod-css则不打包
                console.log('************************不打包mod-html下的文件************************')
                return;
            }
            var index = from.lastIndexOf("/");
            var to = from.substr(0, index).replace("/assets/", "/views/").replace('/html/', '/');
        } else {
            var from = path.join(__dirname, webPath + 'html/**/*.pug');
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
                .pipe(plumber()) //出现错误不终止watch
                .pipe(gulpPug({
                    pretty: true //是否美化代码
                }))
                // .pipe(htmlmin(options))
                .pipe(rename(function(path) {
                    path.extname = ".blade.php";
                }))
                .pipe(replace(/\.js/ig, '.js?_=' + htmlData))
                .pipe(replace(/\.css/ig, '.css?_=' + htmlData))
                // .pipe(replace(/dist/ig,'/example/public'))
                .pipe(gulp.dest(to)).pipe(livereload());
            console.log(sourceType + ": pug-success!");
        }
    },
}

gulp.task(process.argv[2], method[isWatch]);