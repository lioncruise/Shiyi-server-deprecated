function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
$('#qr_container').qrcode({render:"canvas",height:200, width:200,correctLevel:0,text:
window.location.protocol + '//' + window.location.host + window.location.pathname + '?id=' + getUrlParam('id')
});
$('#url').attr('href', window.location.protocol + '//' + window.location.host + window.location.pathname + '?id=' + getUrlParam('id'));
