/**
 *  本地环境配置路由 需 和后端配置路路由一致
 */
const routerConfig = [{
        router: '/',
        path: "guide/home/index"
    }, {
        router: '/index',
        path: "guide/home/index"
    },
    {
        router: '/gulp',
        path: "guide/gulp/index"
    },
    {
        router: '/gulp/use',
        path: "guide/gulp/use/index"
    },
    {
        router: '/gulp/know',
        path: "guide/gulp/know/index"
    },
    {
        router: '/api',
        path: "guide/api/index"
    },
    {
        router: '/api/core',
        path: "guide/api/core/index"
    },
    {
        router: '/api/util',
        path: "guide/api/util/index"
    },
    {
        router: '/api/widget',
        path: "guide/api/widget/index"
    },
    {
        router: '/question',
        path: "guide/question/index"
    },
    {
        router: '/question/mty',
        path: "guide/question/mty/index"
    },
    {
        router: '/echarts/shell',
        path: "guide/echarts/shell/index"
    },
    {
        router: '/echarts',
        path: "guide/echarts/index"
    },
    {
        router: '/404',
        tag: '404',
        path: "guide/report/rpHome"
    }
];
module.exports = routerConfig;