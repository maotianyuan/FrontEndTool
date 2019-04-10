/**
 * 站长工具，根据每个项目进行定制
 */

export function cnzz(){
        var mvl = document.createElement('script');
        mvl.type = 'text/javascript';
        mvl.async = true;
        mvl.src = ('https:' == document.location.protocol ? 'https://s13.cnzz.com/z_stat.php?id=1272902581&web_id=1272902581' : 'http://s13.cnzz.com/z_stat.php?id=1272902581&web_id=1272902581');
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(mvl, s);
}
