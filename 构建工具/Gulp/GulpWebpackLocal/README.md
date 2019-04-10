##  斑马前端所用架构

#### 所使用目录结构

**目录模板[实例宝马项目]**
- `public` [目标版本]
  - **bmw_www**
    - js
    - css
  - **bmw_admin**
    - js
    - css
  - lib

- `resources`
  - assets [开发版本]
    - **bmw_www**
      - html
        - mod1
        - mod2
      - js
      - less
    - **bmw_admin**
      - html
      - js
      - less
  - views[目标html]
    - **bmw_www**
      - mod1
      - mod2
    - **bmw_admin**

----

### gulp注意点

- gulp 带点[.]为监听, 但不监听mod-js下的模块js文件，版本号为秒，资源编译且接口请求默认请求本地，不可将代码进行sftp upload
- gulp 不带点 为压缩  
- `bmw_www`[为resources/assets目录下所起的文件名]
- `创建新的文件夹 需要重新启动监听`
- 每更新css和js时候 需要将对应html更新下 主要功能是：更新版本后缀 用户重新请求资源[`pipe(replace(/\.js/ig,'.js?_='+new Date().getTime())) `]
- 单独打包各自负责文件js
- gulp 加号[+]为监听式压缩，版本号变成年月日，资源压缩且接口请求变为服务器路径，执行此操作后将代码进行sftp upload
`bmwcustomerboard`为[项目名]
- 每次从git pull 代码需要将gulp监听关闭


### 版本更新内容
- 支持本地开发 以及mock伪数据 
- 需使用pug模板引擎 
- 需要先配置路由  在[example/router.config.js] 每次新增路由需要从新启用gulp监听
- 资源路径与php的一致  并使用相对路径 弃用后台{{assets('')}} 
- 页面路由跳转 需要在router中配置，弃用后台{{url('')}}
- 现版本 严格 点[.]开发在本地 加号[+]开发在服务器
- 注 并为对本地服务器进行容错处理，出现中断，需要重新开启命令



### 命令行命令
```
- 外层打包命令 [外层可以减少每个系统都安装node_module]
gulp +bmwcustomerboard-bmw_www-all 监听法单独压缩js文件
gulp .bmwcustomerboard-bmw_www-all 监听法all文件
gulp bmwcustomerboard-bmw_www-all  压缩所有文件

-内层打包命令 [内层每个系统都安装自己node_module v1.1.0弃用 不支持内层开发]
-监听
gulp .bmw_www-all  监听bmw_www所有资源文件
gulp .bmw_www-html  监听bmw_www文件下 html中 所有 .html文件
gulp .bmw_www-js   监听bmw_www文件下改的 js文件
gulp .bmw_www-less  监听bmw_www文件下 less中 所有 .less 文件

-压缩
gulp bmw_www-all 打包压缩全部 【常用】
gulp bmw_www-js压缩bmw_www资源文件所有js
gulp bmw_www-html压缩bmw_www资源文件所有js

-外层单个压缩js
gulp +bmwcustomerboard-bmw_www-all 监听法单独压缩js文件
这个命令的使用避免了 查找单个文件的路径需要时间，直接在所需要压缩js文件 保存一下即可
gulp bmwcustomerboard-bmw_www-js-report/online/top.js   report 在线报告文件 压缩js 命令
gulp bmwcustomerboard-bmw_www-js-ap/apDetail.js   ap 方案详情 压缩js 命令
gulp bmwcustomerboard-bmw_www-js-ap/apadd.js   ap 创建方案 压缩js 命令
gulp bmwcustomerboard-bmw_www-js-home/personal.js   个人中心
gulp bmwcustomerboard-bmw_www-js-_com/com.js   公共
gulp bmwcustomerboard-bmw_www-js-toolbox/tbHome.js   工具首页 压缩

```

### package 配置快捷命令
- npm run .score    //点式压缩文件， 缓存是秒
- npm run +score  //监听式压缩js +式压缩文件 缓存后缀是年月日
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --inline",
  "mall": "node build.js mall-app:dev goods_list",
  ".bmw_www": "gulp .bmwcustomerboard-bmw_www-all", //监听
  "+bmw_www": "gulp +bmwcustomerboard-bmw_www-all",//监听打包js
  "+bmw_admin": "gulp +bmwcustomerboard-bmw_admin-all",//打包全部
  ".bmw_admin": "gulp .bmwcustomerboard-bmw_admin-all"
  ".gstj": "gulp .gstj-oa-all",
  ".score": "gulp .Score-oa-all",
  "+score": "gulp +Score-oa-all",
},
```
