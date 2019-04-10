<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>常见问题汇总 - 斑马</title>
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
            <h3>HTML</h3>
            <p>1：检查 页面是否采用公共模板方式进行引用 【备注：公共模块需要抽离出来 并整理文档备注使用说明】</p>
            <p>2：检查 HTML 版本号是否更新，针对已更改外部引用资源的页面 【备注：外部资源更新 HTML版本号也更新，公共资源进行更新，统一处理所有页面版本号】</p>
            <p>3：检查 页面 中资源是否重复引用</p>
            <p>4：检查 页面 在多种浏览器中的兼容性</p>
            <p>5：检查 网站 TDK设置</p>
            <p>6：检查 网站 title 描述是否统一整齐合理</p>
            <h3>CSS</h3>
            <p>1：检查 公共样式与UI整理统一样式是否完全一致，对于视差与兼容造成的差异需要进行微调整 【备注：公共组件需要抽离，并整理文档，通过继承和层叠重用已有样式】</p>
            <p>2：检查 CSS 备注情况</p>
            <p>3：检查 项目中的小图标 是否使用全局定义 字体图标或者雪碧图 【备注：针对项目定制 公共小图标库 UI需准备svg图片】</p>
            <h3>JS</h3>
            <p>1：检查 支持模块化工具的项目 是否采用模块化方式进行编写 </p>
            <p>2：检查 支持代码压缩的项目 是否进行压缩后才上传 </p>
            <p>3：检查 公共方法能解决的问题，是否采用统一公共方法 【备注：频繁使用方法需要抽离 并整理文档备注使用说明】</p>
            <p>4：检查 JS 备注情况 【业务型代码 需整理备注信息】</p>
            <p>5：检查 JS 接口请求是否重复</p>
            <h3>项目</h3>
            <p>1：下班前需要提交git</p>
            <p>2：每个项目是否有对应模块详情介绍</p>
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