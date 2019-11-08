
export function fmtDate(dates,fmt) {
  var date = new Date(dates);
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
/*
* @desc
* @时间戳转成日期
* @params 时间戳
* @return yyyyMMddhhmmss
* */
export function timestampToTime(timestamp) {
  var date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y,M,D,h,m,s;
  Y = (date.getFullYear()).toString();
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)).toString();
  D = date.getDate() < 10 ? '0' + date.getDate() : (date.getDate()).toString();
  h = date.getHours() <10 ? '0' + date.getHours() : (date.getHours()).toString();
  m = date.getMinutes() <10 ? '0' + date.getMinutes() : (date.getMinutes()).toString();
  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : (date.getSeconds()).toString();
  // console.log('y',Y);
  // console.log('m',M);
  // console.log('d',D);
  // console.log('h',h);
  // console.log('m',m);
  // console.log('s',s);
  return Y+M+D+h+m+s;
}
