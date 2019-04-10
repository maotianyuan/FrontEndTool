
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