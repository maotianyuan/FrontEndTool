## Element自定义主题和按需加载

### 目录
- 一、安装工具
- 二、初始化变量文件
- 三、编译主题
- 四、引入自定义主题
- 五、搭配插件按需引入组件主题
- 六、Element-theme在JSON/NODE配置
- 七、Vue配置Element-theme自定义主题和按需引入配置实例


#### 一、安装工具

>首先安装「主题生成工具」，可以全局安装或者安装在当前项目下，推荐安装在项目里，方便别人 clone 项目时能直接安装依赖并启动，这里以全局安装做演示。
```shell
npm i element-theme -g
```
安装白垩主题，可以从 npm 安装或者从 GitHub 拉取最新代码。
```shell
# 从 npm
npm i element-theme-chalk -D

# 从 GitHub
npm i https://github.com/ElementUI/theme-chalk -D
```

#### 二、初始化变量文件
>主题生成工具安装成功后，如果全局安装可以在命令行里通过 et 调用工具，如果安装在当前目录下，需要通过 node_modules/.bin/et 访问到命令。执行 -i 初始化变量文件。默认输出到 element-variables.scss，当然你可以传参数指定文件输出目录。
```shell
et -i [可以自定义变量文件]

> ✔ Generator variables file

# 实例
et --init ./src/lib/element-variables.scss
```
>如果使用默认配置，执行后当前目录会有一个 element-variables.scss 文件。内部包含了主题所用到的所有变量，它们使用 SCSS 的格式定义

>直接编辑 element-variables.scss 文件，例如修改主题色为红色。

#### 三、编译主题
```shell
et
```

#### 四、引入自定义主题
```js
import '../theme/index.css'
import ElementUI from 'element-ui'
import Vue from 'vue'

Vue.use(ElementUI)
```

#### 五、搭配插件按需引入组件主题
>如果是搭配 babel-plugin-component 一起使用，只需要修改 .babelrc 的配置，指定 styleLibraryName 路径为自定义主题相对于 .babelrc 的路径，注意要加 ~。

```shell
npm install babel-plugin-component -D
```

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "~src/app/index/theme"
      }
    ]
  ]
}
```

```js
  import Vue from 'vue'
  import {
    Button,
    Select
  }
  Vue.use(Button)
  Vue.use(Select)
```

#### 六、Element-theme在JSON/NODE配置
```json
{
  "element-theme": {
    "browsers": ["ie > 9", "last 2 versions"],
    "out": "./theme",
    "config": "./element-variables.css",
    "theme": "element-theme-chalk",
    "minimize": false,
    "components": ["button", "input"]
  }
}
```
```js
var et = require('element-theme')
 
// watch mode
et.watch({
  config: 'variables/path',
  out: 'output/path'
})
 
// build
et.run({
  config: 'variables/path',
  out: 'output/path',
  minimize: true
})
```

#### 七、Vue配置Element-theme自定义主题和按需引入配置实例
 1. 依赖安装：如上步骤一
 2. 自定义主题配置：
  - 2.1 如上步骤二：生成默认主题的变量文件``et --init ./src/lib/element-variables.scss``
  - 2.2 创建自定义主题变量文件``./src/app/index/theme-variables.scss`` 覆盖 et -i 生成默认变量 见下列 `theme-variables.scss` 优点：不改变默认主题变量文件
 3. 按需引入:  步骤五，见下列 `babel.confing.js`
 4. json配置: 步骤六，见下列 `package.json`
 5. vue项目使用: 见`main.js` `lib/element.js`


- package.json 
```json package.json 
{
  "name": "test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "serve-mock": "vue-cli-service serve --mode mock",
    "build": "vue-cli-service build --modern",
    "lint": "vue-cli-service lint",
    "theme-build": "et",
    "theme-init": "et --init ./src/lib/element-variables.scss",
    "theme-build-admin": "node theme.admin.js",
    "test:unit": "vue-cli-service test:unit"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5",
    "axios": "^0.18.0",
    "dayjs": "^1.7.8",
    "element-ui": "^2.6.3",
    "js-md5": "^0.7.3",
    "perfect-scrollbar": "^1.4.0",
    "vue": "^2.5.17",
    "vue-baidu-map": "^0.21.14",
    "vue-echarts": "^3.1.3",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.2.0",
    "@vue/cli-plugin-eslint": "^3.2.1",
    "@vue/cli-plugin-unit-mocha": "^3.2.0",
    "@vue/cli-service": "^3.5.3",
    "@vue/eslint-config-standard": "^4.0.0",
    "@vue/test-utils": "^1.0.0-beta.20",
    "babel-eslint": "^10.0.1",
    "babel-plugin-component": "^1.1.1",
    "babel-polyfill": "^6.26.0",
    "chai": "^4.1.2",
    "compression-webpack-plugin": "^2.0.0",
    "element-theme": "^2.0.1",
    "element-theme-chalk": "^2.6.3",
    "eslint": "^5.8.0",
    "eslint-loader": "^2.1.1",
    "eslint-plugin-vue": "^5.0.0-0",
    "html2canvas": "^1.0.0-alpha.12",
    "image-webpack-loader": "^4.6.0",
    "jspdf": "^1.5.3",
    "lint-staged": "^7.2.2",
    "lodash": "^4.17.11",
    "lodash-webpack-plugin": "^0.11.5",
    "style-resources-loader": "^1.2.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "vue-cli-plugin-element": "^1.0.0",
    "vue-cli-plugin-style-resources-loader": "^0.1.3",
    "vue-template-compiler": "^2.5.17"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "@vue/standard"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "vue/require-prop-type-constructor": "off",
      "vue/require-valid-default-prop": "off",
      "camelcase": 0
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 10"
  ],
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "vue-cli-service lint",
      "git add"
    ],
    "*.vue": [
      "vue-cli-service lint",
      "git add"
    ]
  },
  "element-theme": {
    "browsers": [
      "ie > 9",
      "last 2 versions"
    ],
    "out": "./src/app/index/theme",
    "config": "./src/app/index/theme-variables.scss",
    "theme": "element-theme-chalk",
    "minimize": true,
    "components": [
      "button",
      "dropdown",
      "dropdown-item",
      "dropdown-menu",
      "table",
      "table-column",
      "input",
      "popover",
      "tag",
      "dialog",
      "tooltip",
      "pagination",
      "select",
      "option",
      "tabs",
      "tab-pane",
      "autocomplete",
      "col",
      "row",
      "form",
      "form-item",
      "checkbox",
      "checkbox-group",
      "container",
      "aside",
      "header",
      "main",
      "input-number",
      "message",
      "cascader",
      "date-picker",
      "radio",
      "radio-group",
      "button-group",
      "loading",
      "upload",
      "cascader",
      "tree",
      "menu",
      "submenu",
      "menu-item",
      "menu-item-group",
      "scrollbar",
      "progress"
    ]
  }
}

```
- babel.confing.js
```js babel.confing.js
module.exports = {
  'presets': [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': '~src/app/index/theme'
      }
    ]
  ]
}
```
- main.js
```js main.js
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store'
import axios from '@/lib/axios'

import './lib/element.js'

Vue.config.productionTip = false

Vue.use(axios, { store, router })

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  Vue.config.performance = true
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
- ./lib/element.js
```js ./lib/element.js
import Vue from 'vue'
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Input,
  Popover,
  Tag,
  Dialog,
  Tooltip,
  Pagination,
  Select,
  Option,
  Tabs,
  TabPane,
  Autocomplete,
  Col,
  Row,
  Form,
  FormItem,
  Message,
  MessageBox,
  Cascader,
  DatePicker,
  Radio,
  RadioGroup,
  ButtonGroup,
  Loading,
  Upload,
  Scrollbar,
  Container,
  Aside,
  Header,
  Main,
  Submenu,
  MenuItem,
  Checkbox,
  Progress,
  CheckboxGroup,
  MenuItemGroup
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Autocomplete)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Scrollbar)
Vue.use(Loading.directive)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(ButtonGroup)
Vue.use(MenuItemGroup)
Vue.use(Progress)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
```

- ./src/app/index/theme-variables.scss

```scss ./src/app/index/theme-variables.scss

// ...
$--color-white: #fff;
$--color-primary: #667184;
$--color-success: #667184;
// ....

@import './src/lib/element-variables.scss'; // et -i 生成
```

[Element自定义主题](http://element-cn.eleme.io/#/zh-CN/component/custom-theme)

[element-theme](https://www.npmjs.com/package/element-theme)

- 自定义安装老遇到问题
当 npm run theme-init or theme-build 不成功
```
第一：先卸载`npm uninstall element-theme-chalk`
第二：在安装`npm install element-theme-chalk`
第三：找到目录下element-variables.scss删除 然后重新执行`npm run theme-init`
第四：执行 `npm run theme-build` ⚠️不要使用et，虽然npm run theme-build后面命令是et，因为package.json里面有关于element配置信息，用npm跑等于读取了里面的配置信息； package.json配置里有 "config": "./src/app/index/theme-variables.scss" ，文件里面引入了element-variables.scss, 引入这个文件的路径需要特别注意，是相对于package.json的路径，如果这个文件第一遍写错，将会导致报错，需要从第一步开始重新执行；
```