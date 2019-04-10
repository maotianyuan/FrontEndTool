(function(factory) {
  "use strict";
  //noinspection JSUnresolvedVariable
  if (typeof define === 'function' && define.amd) { // jshint ignore:line
    // AMD. Register as an anonymous module.
    define(['jquery'], factory); // jshint ignore:line
  } else { // noinspection JSUnresolvedVariable
    if (typeof module === 'object' && module.exports) { // jshint ignore:line
      // Node/CommonJS
      // noinspection JSUnresolvedVariable
      module.exports = factory(require('jquery')); // jshint ignore:line
    } else {
      // Browser globals
      factory(window.jQuery);
    }
  }
}(function($) {
  "use strict";

  var AsideStyle = function(ele, option) {
      this.$element = ele,
      this.default = {
        'element': '',
      },
      this.setting = $.extend({}, this.default, option);
  };
  AsideStyle.prototype = {
    setActive: function() {
      this.$element.addClass('active');
      return this.$element.css({
        'element': this.setting.element,
      });
    }
  };
  $.fn.asideSet = function(option) {
    var mp = new AsideStyle(this, option);
    return mp.setActive();
  };

}));
