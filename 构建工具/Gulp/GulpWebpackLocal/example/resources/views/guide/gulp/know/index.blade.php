<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>提前需知 - 斑马</title>
    <meta name="keywords" content="zebra">
    <meta name="description" content="光速斑马前端框架">
    <meta name="csrf-token" content="{{csrf_token}}">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="telephone=no" name="format-detection">
    <meta httpEquit="Cache-Control" content="no-cache, no-store, must-revalidate">
    <link rel="shortcut icon" href="/favicon.png">
    <link rel="stylesheet" href="/lib/widget/bootstrap/bootstrap-v3.3.7/css/bootstrap.min.css?_=20180809">
    <link rel="stylesheet" href="/lib/widget/guide-ui/ionicons.min.css?_=20180809">
    <link rel="stylesheet" href="/guide/css/_com/com.css?_=20180809">
  </head>
  <body>
    <nav class="navbar bmw-navbar">
      <div class="navbar-header"><a class="bmw-navbar-brand" href="/index"><span class="icon-bmw-bmw"></span>
          <h1 class="navbar-title"><span>光速斑马<br></span><span>前端框架</span></h1></a></div>
      <div class="collapse navbar-collapse" id="bmw-navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-bell">
            <div><a href="/notice"><span class="icon-bmw-bell"></span><span class="badge badge-danger"></span></a></div>
          </li>
          <li class="nav-avatar">
            <div><span class="icon-bmw-avatar"></span></div>
          </li>
          <li class="nav-info dropdown bmw-user-control"><a class="no-login" href="/login">您好，请登陆</a>
            <ul class="dropdown-menu"> 
              <li><a class="regect-out" href="/personal"><span>个人信息</span></a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <aside class="bmw-main-aside">
      <nav class="bmw-nav-aside scroll-bar">
        <ul id="asideUl">
          <li class="index"><a class="waves-effect waves-dark" href="/index"><span class="ion icon-bmw-home"></span><span>首页 </span></a></li>
          <li class="gulp"><a class="waves-effect waves-dark" href="/gulp"><span class="ion icon-bmw-report"></span><span>框架</span></a>
            <ul> 
              <li class="gulp-know @if(Auth::user()->hasRole('manager'))menu-show @else menu-hide@endif"><a href="/gulp/know"><span>提前需知 </span></a></li>
              <li class="gulp-use"><a href="/gulp/use"><span>使用方法</span></a></li>
            </ul>
          </li>
          <li class="question"><a class="waves-effect waves-dark" href="/question"><span class="ion icon-bmw-report"></span><span>常见问题</span></a>
            <ul> 
              <li class="gulp-know"><a href="/question/mty"><span>前端常见问题     </span></a></li>
            </ul>
          </li>
          <li class="api"><a class="waves-effect waves-dark" href="/api"><span class="ion icon-bmw-alarm"></span><span>公共方法</span></a>
            <ul> 
              <li class="api-core"><a href="/api/core"><span>基础框架</span></a></li>
              <li class="api-utils"><a href="/api/util"><span>工具</span></a></li>
              <li class="api-widget"><a href="/api/widget"><span>组件</span></a></li>
            </ul>
          </li>
          <li class="echarts"><a class="waves-effect waves-dark" href="/echarts"><span class="ion icon-bmw-report"></span><span>Echarts汇总</span></a>
            <ul> 
              <li class="echarts-shell"><a href="/echarts/shell"><span>图库</span></a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="bmw-main-container scroll-bar">
      <div class="container-fluid scroll-bar">
        <div class="panel panel-default">
          <div class="panel-body">
            <h3>gulp注意点</h3>
            <p>1：gulp 带点[.]为监听, 但不监听mod-js下的模块js文件，版本号为秒，资源编译且接口请求默认请求本地，不可将代码进行sftp upload</p>
            <p>2：gulp 不带点 为压缩</p>
            <p>3：创建新的文件夹 需要重新启动监听【关闭监听后在创建新文件夹】</p>
            <p>4：每更新css和js时候 需要将对应html更新下 主要功能是：更新版本后缀 用户重新请求资源[pipe(replace(/\.js?_=20180809/ig,'.js?_=20180809?_='+new Date().getTime()))]</p>
            <p>5：单独打包各自负责文件js</p>
            <p>6：gulp 加号[+]为监听式压缩，版本号变成年月日，资源压缩且接口请求变为服务器路径，执行此操作后将代码进行sftp upload </p>
            <p>6：每次从git pull 代码需要将gulp监听关闭</p>
            <p>7：支持本地开发 以及mock伪数据</p>
            <p>8：需使用pug模板引擎</p>
            <p>9：需要先配置路由 在[example/router.config.js?_=20180809] 每次新增路由需要从新启用gulp监听</p>
            <p>10：资源路径与php的一致 并使用相对路径 弃用后台{{assets('')}}</p>
            <p>11：页面路由跳转 需要在router中配置，弃用后台{{url('')}},跟后端配路由保持一致</p>
            <p>12：现版本 严格 点[.]开发在本地 加号[+]开发在服务器</p>
            <p>13：并为对本地服务器进行容错处理，出现中断，需要重新开启命令</p>
          </div>
        </div>
      </div>
    </div>
    <script>
      if (window["context"] == undefined) {
      if (!window.location.origin) {
      console.log('ie')
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
      }
      window["context"] = location.origin;
      }
      var baseUrl = window.location.origin+'/';
      var imgBaseUrl = window.location.origin+'/';
    </script>
    <script src="/lib/core/jquery-1.10.2.min.js?_=20180809" type="text/javascript"></script>
    <script src="/lib/widget/bootstrap/bootstrap-v3.3.7/js/bootstrap.min.js?_=20180809" type="text/javascript"></script>
    <script src="/guide/js/_com/com.min.js?_=20180809" type="text/javascript"></script>
    <script src="/lib/widget/layer/layer.js?_=20180809" type="text/javascript"></script>
    <script src="/lib/widget/waves.js?_=20180809" type="text/javascript"></script>
  </body>
</html>