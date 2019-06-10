## Chrome调试技巧
### 目录
- copy & saving
- Command
- 代码块 Snippets
### 一、copy & saving
`copy(location)`
```js
// 然后粘贴会出现如下内容
{
  "href": "https://gallery.echartsjs.com/explore.html?u=bd-599414847&type=work#sort=rank~timeframe=all~author=all",
  "ancestorOrigins": {},
  "origin": "https://gallery.echartsjs.com",
  "protocol": "https:",
  "host": "gallery.echartsjs.com",
  "hostname": "gallery.echartsjs.com",
  "port": "",
  "pathname": "/explore.html",
  "search": "?u=bd-599414847&type=work",
  "hash": "#sort=rank~timeframe=all~author=all"
}
```
- 保存堆栈信息 `选中信息右键save`
- 切换 DevTools 的面板 ctrl + [ 和 ctrl + ]  或 ctrl + 1 到 ctrl + 9

### 二、Command
调出：在 Chrome 的调试打开的情况下 按下 [ Ctrl] + [Shift] + [P] (Mac： [⌘] + [Shift]+ [P] )
- 全屏截图 `Capture full size screenshot`
- Elements布局调整 `layout`
- 快速切换主题 `theme` 明亮 暗黑之间

### 三、代码块
- 代码块 Snippets
`进入到 Sources 面板，在导航栏里选中 Snippets 这栏，点击 New snippet(新建一个代码块) ，然后输入你的代码之后保存，大功告成！现在你可以通过右击菜单或者快捷键： [ctrl] + [enter] 来运行它了：`

- 运行其他来源的代码块
打开Command然后输入!,选择要执行的snippet名称

