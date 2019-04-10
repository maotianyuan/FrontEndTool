/**
 * 公共com.js
 */
// import {commonApp} from './mod-js/com';
import Util from 'util';
import './mod-js/asideSet';
// import 'waves';
import {cnzz} from 'cnzz'  //站长工具
cnzz() 

$.ajaxSetup({
  headers: {
    'Set-Cookie': "hidden=value; httpOnly",
    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

class LogOut {
  constructor() {
    this.action()
  }
  action() {
    var _this = this;
    $('#logOutA,#logout-form').on('click', function(e) {
      var e = e || window.event;
      e.preventDefault();
      _this.postLogOut();
    })
  }
  postLogOut() {
    Util.easyAjax({
      url: baseUrl + 'logout',
      type: 'GET',
      success: function() {
        window.location.href = baseUrl;
      },
      error: function() {
        window.location.href = baseUrl;
      }
    })
  }
}
$(function() {
  new LogOut();
})