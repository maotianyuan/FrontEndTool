## yourproject 系统所用架构

#### 所使用目录结构

**目录模板**
- `public` [目标版本]
  - **test_www**
    - js
    - css
  - **test_admin**
    - js
    - css
  - lib

- `resources`
  - assets [开发版本]
    - **test_www**
      - html
        - mod1
        - mod2
      - js
      - less
    - **test_admin**
      - html
      - js
      - less
  - views[目标html]
    - **test_www**
      - mod1
      - mod2
    - **test_admin**

----

### gulp控制

- gulp 带点[.]为监听, 但不监听mod-js下的模块js文件
- gulp 不带点 为压缩  
- `test_www`[为resources/assets目录下所起的文件名]
- `创建新的文件夹 需要重新启动监听`
- 每更新css和js时候 需要将对应html更新下 主要功能是：更新版本后缀 用户重新请求资源[`pipe(replace(/\.js/ig,'.js?_='+new Date().getTime())) `]



- 单独打包各自负责文件js
`yourproject`为[项目名]

### 命令行命令

```
- 外层打包命令 [外层可以减少每个系统都安装node_module]
gulp +yourproject-test_www-all 监听法单独压缩js文件
gulp .yourproject-test_www-all 监听法all文件
gulp yourproject-test_www-all  压缩所有文件

-内层打包命令 [内层每个系统都安装自己node_module]
-监听
gulp .test_www-all  监听test_www所有资源文件
gulp .test_www-html  监听test_www文件下 html中 所有 .html文件
gulp .test_www-js   监听test_www文件下改的 js文件
gulp .test_www-less  监听test_www文件下 less中 所有 .less 文件

-压缩
gulp test_www-all 打包压缩全部
gulp test_www-js压缩test_www资源文件所有js
gulp test_www-html压缩test_www资源文件所有js

-外层单个压缩js
gulp +yourproject-test_www-all 监听法单独压缩js文件
这个命令的使用避免了 查找单个文件的路径需要时间，直接在所需要压缩js文件 保存一下即可
gulp yourproject-test_www-js-report/online/top.js   report 在线报告文件 压缩js 命令
gulp yourproject-test_www-js-ap/apDetail.js   ap 方案详情 压缩js 命令
gulp yourproject-test_www-js-ap/apadd.js   ap 创建方案 压缩js 命令
gulp yourproject-test_www-js-home/personal.js   个人中心
gulp yourproject-test_www-js-_com/com.js   公共
gulp yourproject-test_www-js-toolbox/tbHome.js   工具首页 压缩

```

### package 配置快捷命令
- npm run .score    //点式压缩文件， 缓存是秒
- npm run +score  //监听式压缩js +式压缩文件 缓存后缀是年月日
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --inline",
  "mall": "node build.js mall-app:dev goods_list",
  ".test_www": "gulp .yourproject-test_www-all", //监听
  "+test_www": "gulp +yourproject-test_www-all",//监听打包js
  "+test_admin": "gulp +yourproject-test_admin-all",//打包全部
  ".test_admin": "gulp .yourproject-test_admin-all"
},
```
