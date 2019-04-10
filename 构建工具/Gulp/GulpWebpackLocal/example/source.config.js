var path = require("path");
module.exports = {
    'jquery' : path.join(__dirname,'./public/lib/core/jquery-1.10.2.min'),
    'es5' : path.join(__dirname,'./public/lib/core/es5'),
    'cnzz':path.join(__dirname,'./public/lib/util/util.cnzz'),
    'util':path.join(__dirname,'./public/lib/util/util.zebra'),
    'waves':path.join(__dirname,'./public/lib/widget/waves.js'),
    'layer':path.join(__dirname,'./public/lib/widget/layer/layer.js'),
    'layerCss':path.join(__dirname,'./public/lib/widget/layer/theme/default/layer.css'),
    'flexible':path.join(__dirname,'./public/lib/widget/flexible.js'),
    'fileinputJs':path.join(__dirname,'./public/lib/widget/bootstrap/bootstrap-fileinput/js/fileinput.js'),
    'fileinputCss':path.join(__dirname,'./public/lib/widget/bootstrap/bootstrap-fileinput/css/fileinput.min.css'),
    'datetimeCss':path.join(__dirname,'./public/lib/widget/bootstrap/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css'),
    'datetimeJs':path.join(__dirname,'./public/lib/widget/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js'),
    'datetimeCN':path.join(__dirname,'./public/lib/widget/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.zh-CN.js'),
    'jQTableJs':path.join(__dirname,'./public/lib/widget/jquery-table/jquery.dataTables.min.js'),
    'jQBootTableJs':path.join(__dirname,'./public/lib/widget/jquery-table/dataTables.bootstrap.min.js'),
    'jQBootTableCss':path.join(__dirname,'./public/lib/widget/jquery-table/dataTables.bootstrap.min.css'),
};