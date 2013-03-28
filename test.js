exports._columns=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
}
return buf.join("");
};exports._datatable=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
}
return buf.join("");
};exports._pagination=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
}
return buf.join("");
};exports.admin=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
 var admin_page = 'users';
buf.push('<ul class="nav nav nav-pills"><li');
buf.push(attrs({ terse: true, "class": (admin_page=='users'?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/">采集点管理</a></li></ul></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.admin_users=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
 var admin_page = 'users';
buf.push('<ul class="nav nav nav-pills"><li');
buf.push(attrs({ terse: true, "class": (admin_page=='users'?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/">采集点管理</a></li></ul>');
 var admin_page = 'users';
{
buf.push('<table class="table"><tr><th>电子邮箱地址</th><th>操作</th></tr>');
// iterate users
;(function(){
  if ('number' == typeof users.length) {

    for (var $index = 0, $$l = users.length; $index < $$l; $index++) {
      var user = users[$index];

buf.push('<tr><td>');
var __val__ = user.email
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</td><td>');
if ( !user.isAdmin)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('' + (user._id) + '/?page=' + (curPage) + ''), "class": ('btn') + ' ' + ('btn-info') + ' ' + ('btn-mini') }, {"href":true}));
buf.push('>编辑</a><a');
buf.push(attrs({ terse: true, 'href':('' + (user._id) + '/?_method=delete&page=' + (curPage) + ''), "class": ('btn') + ' ' + ('btn-danger') + ' ' + ('btn-mini') }, {"href":true}));
buf.push('>删除</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var $index in users) {
      $$l++;      var user = users[$index];

buf.push('<tr><td>');
var __val__ = user.email
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</td><td>');
if ( !user.isAdmin)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('' + (user._id) + '/?page=' + (curPage) + ''), "class": ('btn') + ' ' + ('btn-info') + ' ' + ('btn-mini') }, {"href":true}));
buf.push('>编辑</a><a');
buf.push(attrs({ terse: true, 'href':('' + (user._id) + '/?_method=delete&page=' + (curPage) + ''), "class": ('btn') + ' ' + ('btn-danger') + ' ' + ('btn-mini') }, {"href":true}));
buf.push('>删除</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('<tr><td></td><td><a');
buf.push(attrs({ terse: true, 'href':('new/?page=' + (curPage) + ''), "class": ('btn') + ' ' + ('btn-success') + ' ' + ('btn-mini') }, {"href":true}));
buf.push('>添加普通用户</a></td></tr></table>');
}
buf.push('<div class="pagination pagination-right">');
pagination_mixin(curPage, pageCount, '');
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.admin_users_user=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
 var admin_page = 'users';
buf.push('<ul class="nav nav nav-pills"><li');
buf.push(attrs({ terse: true, "class": (admin_page=='users'?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/">采集点管理</a></li></ul>');
 var admin_page = 'users';
buf.push('<form');
buf.push(attrs({ terse: true, 'method':('post'), 'action':(admin_user.isNew ? '../?page=' + (curPage) + '' : '?page=' + (curPage) + '') }, {"method":true,"action":true}));
buf.push('><input');
buf.push(attrs({ terse: true, 'type':('hidden'), 'name':('_method'), 'value':(admin_user.isNew?'post':'put') }, {"type":true,"name":true,"value":true}));
buf.push('><label class="row-fluid"><div class="span3"><div class="padding align-right">电子邮件地址:</div></div><div class="span9"><input');
buf.push(attrs({ terse: true, 'type':('text'), 'name':('admin_user[email]'), 'value':(admin_user.email) }, {"type":true,"name":true,"value":true}));
buf.push('></div></label><label class="row-fluid"><div class="span3"><div class="padding align-right">密码:</div></div><div class="span9"><input');
buf.push(attrs({ terse: true, 'type':('password'), 'name':('admin_user[password]'), 'value':(admin_user.password) }, {"type":true,"name":true,"value":true}));
buf.push('></div></label><div class="row-fluid"><div class="span3"></div><div class="span9"><button type="submit" class="btn btn-primary">');
var __val__ = admin_user.isNew?'添加用户':'保存修改'
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</button></div></div></form></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.dashboard=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><dl class="dl-horizontal"><dt>系统名称：</dt><dd>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</dd><dt>系统当前运行状态：</dt><dd>良好</dd>');
if ( user)
{
buf.push('<dt>采集点名称：</dt><dd>');
var __val__ = user.email
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</dd>');
}
buf.push('<dt>程序版本：</dt><dd>');
var __val__ = version
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</dd></dl></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.data=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ terse: true, 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ terse: true, 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
buf.push('<ul class="breadcrumb"><li>当前所在位置：</li>');
// iterate path
;(function(){
  if ('number' == typeof path.length) {

    for (var $index = 0, $$l = path.length; $index < $$l; $index++) {
      var seg = path[$index];

buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (seg._id) + '/'), 'title':(seg._typeHash.name) }, {"href":true,"title":true}));
buf.push('>');
var __val__ = seg._typeHash.label(seg)
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a><span class="divider">/</span></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in path) {
      $$l++;      var seg = path[$index];

buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (seg._id) + '/'), 'title':(seg._typeHash.name) }, {"href":true,"title":true}));
buf.push('>');
var __val__ = seg._typeHash.label(seg)
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a><span class="divider">/</span></li>');
    }

  }
}).call(this);

buf.push('</ul><h1>' + escape((interp = path[path.length-1].label) == null ? '' : interp) + '</h1><h6>(' + escape((interp = path[path.length-1].name) == null ? '' : interp) + ')</h6><dl class="dl-horizontal">');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<dt>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</dt><dd>');
column_mixin(item, column);
buf.push('</dd>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<dt>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</dt><dd>');
column_mixin(item, column);
buf.push('</dd>');
    }

  }
}).call(this);

if ( item.user_id)
{
buf.push('<td></td><dd><a');
buf.push(attrs({ terse: true, 'href':('/records/users/' + (data.user_id) + '') }, {"href":true}));
buf.push('>对应采集点</a></dd>');
}
if ( item.smdevice_id)
{
buf.push('<td></td><dd><a');
buf.push(attrs({ terse: true, 'href':('/records/smdevices/' + (data.smdevice_id) + '') }, {"href":true}));
buf.push('>对应采集记录</a></dd>');
}
buf.push('</dl>');
datatable_mixin(data);
buf.push('</div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.error=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><div class="alert alert-error"><h1>操作失败</h1><hr><h4>对不起，该操作未能正确完成，失败的原因为:</h4><pre>');
var __val__ = message
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</pre></div></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.html=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;"></body></html>');
}
return buf.join("");
};exports.layout=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.login=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><form action="/login" method="post" class="form-horizontal"><div class="control-group"><label class="control-label">邮箱：</label><div class="controls"><input type="text" name="email" id="email" placeholder="Email"></div></div><div class="control-group"><label class="control-label">密码：</label><div class="controls"><input type="password" name="password" id="password" placeholder="Password"></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" name="remember">Remember me</label><button type="submit" name="submit" class="btn">登录</button></div></div></form><script>$(\'#email\').focus();</script></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.records=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ terse: true, 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
datatable_mixin(data);
buf.push('</div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.relations=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><div id="canvas" style="position:relative;"><div id="info" style="display:none;"><div class="alert alert-info"><h2>提示：</h2><ul><li>双击节点可使其固定</li><li>将鼠标放在节点上可查看节点详情</li><li>点击机主节点可使其展开</li></ul></div></div><div id="search" style="position:absolute;right:-6px;top:-6px;width:40%;height:100%;padding:6px;overflow:auto;" class="well"></div><div style="position:absolute;right:10px;top:0;padding:6px;"><a id="help" href="#" onclick="$(\'#search\').html($(\'#info\').html());return false;" class="btn btn-info">帮助</a></div><script type="text/javascript">\n(function() {\n  $(function() {\n    return $(\'a#help\').trigger(\'click\');\n  });\n\n}).call(this);\n</script></div><style>.node{\n  stroke: #333;\n  fill: #999;\n}\n.fixed>.node{\n  fill: #bbb;\n  stroke: #bbb;\n}\n\n.label{\n  display:none;\n}\n.fixed>.label{\n  display:block;\n}\n.label>a{\n  display:block;\n}\n.link{\n  stroke: #999;\n  stroke-opacity: .6;\n}</style><script src="/d3/d3.min.js"></script><script>var initialGraph = ' + ((interp = JSON.stringify(initialGraph)) == null ? '' : interp) + ';\nvar central = ' + ((interp = JSON.stringify(central)) == null ? '' : interp) + '</script><script type="text/javascript">\n(function() {\n  var deviceExp, force, getR, globalLoading, links, load, nodes, redraw, svg;\n\n  deviceExp = /-/;\n\n  globalLoading = null;\n\n  force = d3.layout.force();\n\n  force.nodes(initialGraph.nodes);\n\n  force.links(initialGraph.links);\n\n  force.linkStrength(function(link) {\n    return link.weight / 10;\n  });\n\n  force.on(\'tick\', function() {\n    links.attr(\'x1\', function(d) {\n      return d.source.x;\n    });\n    links.attr(\'y1\', function(d) {\n      return d.source.y;\n    });\n    links.attr(\'x2\', function(d) {\n      return d.target.x;\n    });\n    links.attr(\'y2\', function(d) {\n      return d.target.y;\n    });\n    nodes.attr(\'cx\', function(d) {\n      return d.x;\n    });\n    return nodes.attr(\'cy\', function(d) {\n      return d.y;\n    });\n  });\n\n  svg = d3.select("#canvas").append("svg");\n\n  nodes = svg.selectAll(\'.node\');\n\n  links = svg.selectAll(\'.link\');\n\n  window.onresize = function() {\n    var h, w;\n\n    force.charge - 300;\n    force.linkDistance(function(l) {\n      if (l.source.name.match(deviceExp || l.target.name.match(deviceExp))) {\n        return 30;\n      }\n      return 80;\n    });\n    force.gravity(0.03);\n    w = $(window).width() - 80;\n    h = $(window).height() - 200;\n    force.size([w * 0.7, h]);\n    svg.attr(\'width\', w);\n    svg.attr(\'height\', h);\n    return force.start();\n  };\n\n  window.onresize();\n\n  $(function() {\n    initialGraph.nodes.push({\n      name: central,\n      isDevice: true\n    });\n    return load(central);\n  });\n\n  load = function(newNode) {\n    if (globalLoading != null) {\n      globalLoading.abort();\n    }\n    return globalLoading = $.ajax({\n      url: \'data.json\',\n      type: \'POST\',\n      data: \'graph=\' + (encodeURIComponent(JSON.stringify(initialGraph))) + \'&newnode=\' + (encodeURIComponent(newNode)),\n      dataType: \'json\',\n      success: function(graph) {\n        var i, link, node, nodesIndexes, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;\n\n        _ref = graph.nodes;\n        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {\n          node = _ref[i];\n          initialGraph.nodes.push(node);\n        }\n        nodesIndexes = {};\n        _ref1 = initialGraph.nodes;\n        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {\n          node = _ref1[i];\n          nodesIndexes[node.name] = i;\n        }\n        _ref2 = graph.links;\n        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {\n          link = _ref2[_k];\n          link.source = nodesIndexes[link.source];\n          link.target = nodesIndexes[link.target];\n          initialGraph.links.push(link);\n        }\n        redraw();\n        return window.onresize();\n      }\n    });\n  };\n\n  redraw = function() {\n    var circles, lines, title;\n\n    links = links.data(initialGraph.links);\n    nodes = nodes.data(initialGraph.nodes);\n    lines = links.enter().insert(\'line\');\n    lines.style(\'stroke-width\', function(d) {\n      return Math.sqrt(d.weight);\n    });\n    lines.attr(\'class\', \'link\');\n    circles = nodes.enter().insert(\'circle\');\n    circles.attr(\'r\', getR);\n    circles.attr(\'class\', \'node\');\n    circles.style(\'fill\', function(d) {\n      if (d.isDevice && d.name !== central) {\n        return \'#0769AD\';\n      } else {\n        return void 0;\n      }\n    });\n    circles.on(\'click\', function(d) {\n      var c;\n\n      c = d3.select(this);\n      setTimeout((function() {\n        return c.style(\'fill\', d.fixed ? \'#fff\' : void 0);\n      }), 100);\n      return load(d.name);\n    });\n    circles.on(\'mouseover\', function(d) {\n      return $(\'#search\').load(\'/search/?layout=html&q=\' + encodeURIComponent(d.name));\n    });\n    circles.on(\'dblclick\', function(d) {\n      var c;\n\n      d.fixed = !d.fixed;\n      c = d3.select(this);\n      return c.style(\'fill\', d.fixed ? \'#fff\' : void 0);\n    });\n    circles.call(force.drag);\n    title = circles.append(\'title\');\n    return title.text(function(d) {\n      return d.name;\n    });\n  };\n\n  getR = function(d) {\n    if (d.isDevice) {\n      return 20;\n    }\n    return 6;\n  };\n\n}).call(this);\n</script><script>//- var width = 960,\n//- height = 500;\n\n//- var force = d3.layout.force();\n\n//- var setup = function(){\n//-   force\n//-     .charge(0 - Number($(\'#charge\').val()))\n//-     .linkDistance(Number($(\'#linkDistance\').val()))\n//-     .gravity(0.04)\n//-     .start();\n//- }\n//- $(\'#charge,#linkDistance\').mousemove(setup);\n\n//- var svg = d3.select("#canvas").append("svg");\n\n\n//- window.onresize = function(){\n//-   var w = $(window).width()-80,\n//-     h = $(window).height()-200;\n//-   force.size([w, h]);\n//-   svg.attr("width", w).attr("height", h);\n//-   //- var nodes = force.nodes().filter(function(node){return node.isDevice;});\n//-   //- for(var i = 0; i < nodes.length; i++){\n//-   //-   var angle = Math.random() * 2 * Math.PI;\n//-   //-   nodes[i].x = (Math.cos(angle)*0.8 + 1) * w/2;\n//-   //-   nodes[i].y = (Math.sin(angle)*0.8 + 1) * h/2;\n//-   //-   nodes[i].fixed = true;\n//-   //- }\n//-   setup();\n//- }\n//- window.onresize();\n\n//- var loading = svg.append(\'text\')\n//-     .attr("transform", \'translate(\' + Number(svg.attr(\'width\'))/2 + \',\' + Number(svg.attr(\'height\'))/2 + \')\')\n//-     .text(\'正在绘制，请稍候...\');\n//- d3.json(\'data.json?graph=\' + encodeURIComponent(JSON.stringify(initialData)), function(error, graph) {\n//-   setTimeout(function(){ loading.remove();},2000);\n//-   force\n//-       .nodes(graph.nodes)\n//-       .links(graph.links)\n//-       .linkStrength(function(link){ return link.value/10;});\n//-   window.onresize();\n\n//-   var link = svg.selectAll(".link")\n//-       .data(graph.links)\n//-     .enter().append("line")\n//-       .attr("class", "link")\n//-       .style("stroke-width", function(d) { return Math.sqrt(d.value); });\n\n//-   var getR = function(d){\n//-     if(d.isDevice) return 30\n//-     return Math.min(d.group/5 + 4, 20);\n//-     //- return 10\n//-   }\n//-   var nodes = svg.selectAll(".node")\n//-       .data(graph.nodes)\n//-     .enter().append(\'g\')\n//-       .attr(\'class\', function(d){return d.isDevice?\'fixed\':\'\';})\n//-       .on(\'mouseover\', function(d){\n//-         if(d.isDevice) {\n//-         }else{\n//-           d3.select(this)\n//-               .attr(\'class\',\'fixed\')\n//-             .select(\'circle\')\n//-               .attr(\'r\', 40);\n//-         }\n//-       })\n//-       .on(\'mouseout\', function(d){\n//-         if(d.isDevice) {\n//-         }else{\n//-           d3.select(this)\n//-               .attr(\'class\',\'\')\n//-             .select(\'circle\')\n//-               .attr(\'r\', getR);\n//-         }\n//-       })\n//-       .on(\'click\', function(d){\n//-         if(d.isDevice){\n//-           d.fixed = !d.fixed;\n//-           d3.select(this)\n//-             .select(\'circle\')\n//-               .style(\'fill\', d.fixed?\'#86c5cc\':undefined);\n//-         }  \n//-       })\n//-       .call(force.drag);\n\n//-   var circles = nodes.append("circle")\n//-       .attr("class", "node")\n//-       .attr(\'r\', function(d){ return Math.max(getR(d), d.isDevice?40:0);})\n//-       .style("stroke-width", function(d){ if(d.isDevice) return "4";});\n//-   nodes.append(\'text\')\n//-       .attr(\'class\',\'label\')\n//-       .attr(\'dx\', function(d){ return \'-\' + (d.name.replace(/-.+/g,\'\').length / 4 + 0.5) + \'em\';})\n//-       .attr(\'dy\', \'0.5\')\n//-       .text(function(d){return d.name.replace(/-.+/g,\'\');})\n//-       .append(\'a\')\n//-       .attr(\'xlink:href\',function(d){return \'?central=\'+ encodeURIComponent(graph.centrals.join(\',\') + \',\' + d.name);})\n//-       .style(\'stroke\', \'red\')\n//-       .text(function(d){\n//-         if(!d.isDevice) return \'\'\n//-         return graph.centrals.indexOf(d.name)==-1?\'+\':\'\'\n//-       });\n//-   nodes.append(\'text\')\n//-       .attr(\'class\',\'label\')\n//-       .attr(\'dx\', \'-1em\')\n//-       .attr(\'dy\', \'1.5em\')\n//-       .append(\'a\')\n//-       .attr(\'xlink:href\',function(d){return \'/search/?q=\'+ encodeURIComponent(d.name.replace(/-/,\' \'));})\n//-       .attr(\'target\', \'_blank\')\n//-       .text(\'搜索\');\n\n//-   nodes.append(\'title\')\n//-       .text(function(d){return d.name;});\n//-   force.on("tick", function() {\n//-     link.attr("x1", function(d) { return d.source.x; })\n//-         .attr("y1", function(d) { return d.source.y; })\n//-         .attr("x2", function(d) { return d.target.x; })\n//-         .attr("y2", function(d) { return d.target.y; });\n//-     nodes.attr("transform", function(d) { return \'translate(\'+d.x+\',\'+d.y+\')\'; });\n\n//-   });\n//- });\n\n\n</script></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.search=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well">');
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ terse: true, 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ terse: true, 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ terse: true, 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
buf.push('<form class="form-search"><input');
buf.push(attrs({ terse: true, 'type':('text'), 'name':('q'), 'value':(q), "class": ('input-xxlarge') + ' ' + ('search-query') }, {"type":true,"name":true,"value":true}));
buf.push('><button type="submit" class="btn">搜索所有数据</button></form>');
if ( data==null)
{
buf.push('正在搜索..<!--seaching--><script>func=function(){\n  $.get(location.href, function(data){\n    if(data.match(/<!--seaching-->/)){\n      setTimeout(func, 1000);\n    }else{\n      location.href = location.href;\n    }\n  });\n};\nfunc();\n</script>');
}
else
{
datatable_mixin(data);
}
buf.push('</div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.search_html=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var pagination_mixin = function(page, count, query){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div class="clearfix"><div class="pagination pull-right"><ul>');
var sticker = (0);
var pages = (Math.ceil(count/50));
if ( page==0)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">«</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page-1) + '') }, {"href":true}));
buf.push('>«</a></li>');
}
var i = (0);
while (i < pages)
{
if ( i<4||Math.abs(page-i)<3||pages-i<3)
{
buf.push('<li');
buf.push(attrs({ "class": (i==page?'active':'') }, {"class":true}));
buf.push('><a');
buf.push(attrs({ 'href':('?page=' + (i) + ''+query) }, {"href":true}));
buf.push('>' + escape((interp = i+1) == null ? '' : interp) + '</a></li>');
}
else
{
if ( sticker!=i-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false" class="disabled">...</a></li>');
}
var sticker = (i);
}
var i = (i+1);
}
if ( page==pages-1)
{
buf.push('<li class="disabled"><a href="#" onclick="return false">»</a></li>');
}
else
{
buf.push('<li><a');
buf.push(attrs({ 'href':('?page=' + (page+1) + ''+query) }, {"href":true}));
buf.push('>»</a></li>');
}
buf.push('</ul></div><div class="btn-toolbar pull-left"><div class="btn-group"><div class="btn disabled">共' + escape((interp = count) == null ? '' : interp) + '条记录</div></div></div></div>');
};
var column_mixin = function(data, column, options){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 val = data[column.key];
if ( column.type=='string')
{
 val=String(val||'').trim()
if ( val=='')
{
buf.push('---');
}
else
{
if ( column.long)
{
buf.push('<div style="max-width:200px;">');
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
else
{
var __val__ = val
buf.push(escape(null == __val__ ? "" : __val__));
}
}
}
else if ( column.type=='time')
{
if ( !val)
{
buf.push('<span title="未记录时间">---</span>');
}
else
{
buf.push('<span');
buf.push(attrs({ 'title':((moment(val)).fromNow()) }, {"title":true}));
buf.push('>');
var __val__ = moment(val).format('YY-MM-DD hh:mm:ss')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
}
else if ( column.type=='enum')
{
var __val__ = column.enumLabels[Number(val)]||(column.key+":"+val)
buf.push(escape(null == __val__ ? "" : __val__));
}
else if ( column.type=='textgenerator')
{
var __val__ = column.generator(data, column)
buf.push(null == __val__ ? "" : __val__);
}
else if ( column.type=='plaintext')
{
var __val__ = column.text
buf.push(null == __val__ ? "" : __val__);
}
else
{
buf.push('未识别类型: ' + escape((interp = column.type) == null ? '' : interp) + '');
}
};
var datatable_mixin = function(data, opt){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var opt = (opt||{});
var options = ({sortable: true, pagable: true, filtable: true});
// iterate opt
;(function(){
  if ('number' == typeof opt.length) {

    for (var key = 0, $$l = opt.length; key < $$l; key++) {
      var value = opt[key];

 options[key] = value
    }

  } else {
    var $$l = 0;
    for (var key in opt) {
      $$l++;      var value = opt[key];

 options[key] = value
    }

  }
}).call(this);

if ( data.items.length==0)
{
buf.push('<div class="alert alert-info">没有找到数据</div>');
}
else
{
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
else
{
buf.push('<div class="pull-right">共' + escape((interp = data.count) == null ? '' : interp) + '条记录</div>');
}
buf.push('<table class="table table-hover">');
 var tableWidth = 0;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var $index = 0, $$l = data.items.length; $index < $$l; $index++) {
      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  } else {
    var $$l = 0;
    for (var $index in data.items) {
      $$l++;      var item = data.items[$index];

 tableWidth = Math.max(tableWidth, item._typeHash.columns.length);
    }

  }
}).call(this);

 var lastType = null;
// iterate data.items
;(function(){
  if ('number' == typeof data.items.length) {

    for (var i = 0, $$l = data.items.length; i < $$l; i++) {
      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  } else {
    var $$l = 0;
    for (var i in data.items) {
      $$l++;      var item = data.items[i];

if ( item._type != lastType)
{
 lastType = item._type;
{
buf.push('<tr><th>#</th>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var $index = 0, $$l = item._typeHash.columns.length; $index < $$l; $index++) {
      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  } else {
    var $$l = 0;
    for (var $index in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[$index];

buf.push('<th>');
var __val__ = column.name
buf.push(escape(null == __val__ ? "" : __val__));
if ( options.sortable)
{
buf.push('<a');
buf.push(attrs({ 'href':("?orderbyasc=" + (column.key) + "" + (data.fixedQuery) + "") }, {"href":true}));
buf.push('>link</a>');
}
buf.push('</th>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<th></th>');
}
buf.push('<th></th><!--查询输入栏，tr--></tr>');
}
}
buf.push('<tr><td><a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
var __val__ = data.page*50+i+1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td>');
// iterate item._typeHash.columns
;(function(){
  if ('number' == typeof item._typeHash.columns.length) {

    for (var i = 0, $$l = item._typeHash.columns.length; i < $$l; i++) {
      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  } else {
    var $$l = 0;
    for (var i in item._typeHash.columns) {
      $$l++;      var column = item._typeHash.columns[i];

buf.push('<td>');
if ( i)
{
column_mixin(item, column, {});
}
else
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/') }, {"href":true}));
buf.push('>');
column_mixin(item, column, {});
buf.push('</a>');
}
buf.push('</td>');
    }

  }
}).call(this);

var j = (item._typeHash.columns.length);
while (j++ < tableWidth)
{
buf.push('<td></td>');
}
buf.push('<td>');
if ( item._children.length)
{
buf.push('<a');
buf.push(attrs({ 'href':('/records/' + (item._id) + '/'), "class": ('pull-right') }, {"href":true}));
buf.push('><i class="icon-search"></i>(' + escape((interp = item._children.length) == null ? '' : interp) + '条子项)</a>');
}
buf.push('</td></tr>');
    }

  }
}).call(this);

buf.push('</table>');
if ( options.pagable)
{
pagination_mixin(data.page, data.count, '');
}
}
};
buf.push('<h2>');
var __val__ = q
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h2>');
datatable_mixin(data, {sortable: false, filtable:false, pagable: false});
}
return buf.join("");
};exports.upgrade=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><div class="alert alert-info">');
if ( status=='upgrading')
{
buf.push('<h1>正在升级数据库..</h1>升级数据库可能需要几分钟时间，请耐心等待...<!--seaching--><script>func=function(){\n  $.get(location.href, function(data){\n    if(data.match(/<!--seaching-->/)){\n      setTimeout(func, 1000);\n    }else{\n      location.href = location.href;\n    }\n  });\n};\nfunc();</script>');
}
else if ( status=='outdated')
{
buf.push('<h1>更新完成</h1>请<a href="/upgrade?_method=post" class="btn btn-info">升级数据库</a>，升级数据库可能需要几分钟时间，请耐心等待。');
}
else if ( status=='failed')
{
buf.push('<h1>升级失败</h1>升级时发生了一些错误，请联系技术人员并提供以下消息<pre>');
var __val__ = errorMessage
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</pre>');
}
else if ( status=='up-to-date')
{
buf.push('<h1>升级成功</h1>数据库升级成功。<a href="/" class="btn btn-primary">返回首页</a>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};exports.upload=function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="zh-CN"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><script src="/jquery/jquery.min.js"></script><script src="/bootswatch/js/bootstrap.min.js"></script><link href="/bootswatch/cerulean/bootstrap.min.css" rel="stylesheet"><link href="/bootswatch/default/bootstrap-responsive.min.css" rel="stylesheet"><title>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link href="/pancon/style.css" rel="stylesheet"><style>body{\n  font-family: arial, sans-serif !important;\n}\ni{\n  display: inline !important;\n  line-height: 1 !important;\n  background-image: none !important;\n  vertical-align:baseline !important;\n}\nth{\n  white-space: nowrap;\n}</style><!--[if IE 8]><script type="text/javascript">var ie8 = 8;</script><![endif]--><script type="text/javascript">\n(function() {\n  if (!window.localStorage || typeof ie8 !== \'undefined\') {\n    location.href = \'/oldbrowser.html\';\n  }\n\n  $(function() {\n    return $(\'[title]\').tooltip();\n  });\n\n}).call(this);\n</script></head><body style="background-color:#fafafa;padding: 10px 0;">');
 requestPath = typeof(requestPath)=='undefined'?'':requestPath
 user = typeof(user)=='undefined'?null:user
buf.push('<div class="container-fluid"><div class="row-fluid"><div class="span12"><div class="navbar"><div class="navbar-inner"><a href="/" class="brand"><i class="icon-sm-image"></i>');
var __val__ = process.env.SYSNAME
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
if ( user)
{
buf.push('<ul class="nav"><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/'?'active':'') }, {"class":true}));
buf.push('><a href="/"> <i class="icon-home"></i>首页</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath=='/search/'?'active':'') }, {"class":true}));
buf.push('><a href="/search/"> <i class="icon-search"></i>搜索</a></li><li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/records\//)?'active':'') }, {"class":true}));
buf.push('><a href="/records/"> <i class="icon-os-details"></i>所有采集记录</a></li></ul><ul class="nav pull-right">');
if ( user.isAdmin)
{
buf.push('<li');
buf.push(attrs({ terse: true, "class": (requestPath.match(/^\/admin\//)?'active':'') }, {"class":true}));
buf.push('><a href="/admin/users/"> <i class="icon-admin"></i>系统管理</a></li>');
}
buf.push('<li> <a href="/logout"> <i class="icon-off"></i>退出</a></li></ul>');
}
buf.push('</div></div></div></div><div class="row-fluid"><div class="span12"><div class="well"><form method="post" enctype="multipart/form-data" class="form-horizontal"><div class="control-group"><label for="file" class="control-label">案件文件</label><div class="controls"><input id="file" type="file" placeholder="*.smcase" name="file"></div></div><div class="control-group"><div class="controls"><button type="submit" class="btn">上传</button></div></div></form></div></div></div><div class="row-fluid"><div class="span12"><footer style="color:#ccc;">Powered By ForensicHub ' + escape((interp = version) == null ? '' : interp) + ' Copyright © 2002-2012 - 盘石软件（上海）有限公司</footer></div></div></div></body></html>');
}
return buf.join("");
};