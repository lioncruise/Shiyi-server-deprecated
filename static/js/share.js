
// 按照平台修改下载链接
$(function() {
  var userAgent = navigator.userAgent;
  var downloadATag = $('#download-link');
  if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    downloadATag.attr('href', downloadATag.attr('ios'));
  } else if (userAgent.indexOf('Android') > -1) {
    downloadATag.attr('href', downloadATag.attr('android'));
  } else {
    downloadATag.click(function(){
      alert('仅支持IOS和Android设备');
    });
  }
});

