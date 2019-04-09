var path = require("path");
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var banner = 'lastmodify: ' + new Date().toLocaleString();
var config = {
    entry: {
        //test:'./resources/assets/index/library.js', //单入口文件
    },
    output: {
        path: path.join(__dirname, './public/js'), //打包输出的路径
        filename: '[name].min.js', //打包后的名字
        chunkFilename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)(-lazy)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            discardComments: { removeAll: true }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.html$/,
            loader: "text"
        }, {
            test: /\.blade.php$/,
            loader: "text"
        }, {
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
        }],
        postLoaders: [{
                test: /\.(js|jsx)(-lazy)?$/,
                loaders: ['es3ify-loader']
            },
            // 这个配置放到打包到生产环境中去，测试环境打到一个包
            {
                test: /-lazy\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'bundle-loader?lazy&name=[name]'
            }
        ]
    },
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
    },
    resolve: {
        extensions: ['', '.js', '.json', 'less', 'scss', 'html', '.blade.php'],
        root: path.dirname(__dirname),
        alias: {
            'jquery': path.join(__dirname, './public/lib/core/jquery-1.10.2.min'),
            'es5': path.join(__dirname, './public/lib/core/es5'),
            'cnzz': path.join(__dirname, './public/lib/util/util.cnzz'),
            'util': path.join(__dirname, './public/lib/util/util.bmw'),
            'waves': path.join(__dirname, './public/lib/widget/waves.js'),
            'layer': path.join(__dirname, './public/lib/widget/layer/layer.js'),
            'layerCss': path.join(__dirname, './public/lib/widget/layer/theme/default/layer.css'),
            'flexible': path.join(__dirname, './public/lib/widget/flexible.js'),
            'fileinputJs': path.join(__dirname, './public/lib/widget/bootstrap/bootstrap-fileinput/js/fileinput.js'),
            'fileinputCss': path.join(__dirname, './public/lib/widget/bootstrap/bootstrap-fileinput/css/fileinput.min.css'),
            'datetimeCss': path.join(__dirname, './public/lib/widget/bootstrap/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css'),
            'datetimeJs': path.join(__dirname, './public/lib/widget/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js'),
            'datetimeCN': path.join(__dirname, './public/lib/widget/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.zh-CN.js'),
            'jQTableJs': path.join(__dirname, './public/lib/widget/jquery-table/jquery.dataTables.min.js'),
            'jQBootTableJs': path.join(__dirname, './public/lib/widget/jquery-table/dataTables.bootstrap.min.js'),
            'jQBootTableCss': path.join(__dirname, './public/lib/widget/jquery-table/dataTables.bootstrap.min.css'),
        }
    },
    resolveLoader: {
        root: path.join(__dirname, './node_modules')
    },
    externals: {
        'jQuery': 'window.jQuery',
        'jquery': 'window.jQuery',
        'Zepto': 'window.Zepto'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
    ]
};
Object.assign(config.resolve.alias);
module.exports = config;