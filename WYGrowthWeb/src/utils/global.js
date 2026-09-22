// let hostname = 'http://127.0.0.1:8082'
// let target = 'http://192.168.31.190:8082'
let hostname = ''
let target = ''
// let target = 'http://127.0.0.1:8082'

import axios from 'axios'


let time = new Date()
let y = time.getFullYear()
let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
let d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
const today = `${y}-${m}-${d}`


// const downUrlLeft = 'http://47.96.252.134:3093'
const downUrlLeft = 'http://47.83.173.79:3093'



let sel_view_recode = function(path) {



  axios({
    url: 'http://47.83.173.79:3093/WZGrowth/HomeBasic/sel_view_recode',
    method: 'POST',
    // params: params,
    data: {
      path: path
    }
  }).then((res) => {
    console.log(res, 9999)
  })
}

let homeBasicInfo = function() {
  let sys = getBrowserInfo()
  axios({
    url: 'http://47.83.173.79:3093/WZGrowth/HomeBasic/info',
    method: 'POST',
    // params: params,
    data: {
      app_name: sys.browser,
      app_version: sys.ver,
    }
  }).then((res) => {
    localStorage.setItem('HomeBasicInfo', JSON.stringify(res.data.data))
    localStorage.setItem('today', today)
    console.log(res, 9999)
  })
}
 let getBrowserInfo = function (){
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
  var m = ua.match(re);
  Sys.browser = m[1].replace(/version/, "'safari");
  Sys.ver = m[2];
  return Sys;
}


// let getBrowserName = function() {
//   let userAgent = navigator.userAgent;
//   if (userAgent.indexOf("Firefox") > -1) {
//       return "Firefox";
//   } else if (userAgent.indexOf("Chrome") > -1) {
//       return "Chrome";
//   } else if (userAgent.indexOf("Safari") > -1) {
//       // 注意，Safari的userAgent字符串可能也存在于Chrome的字符串中（因为Chrome基于Chromium，而Chromium和Safari有一定关联），需要更精确的判断
//       if (userAgent.indexOf("Chrome") === -1) {
//           return "Safari";
//       }
//   } else if (userAgent.indexOf("Opera") > -1) {
//       return "Opera";
//   } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
//       return "Internet Explorer";
//   }
//   return "Unknown";
// }

export default {
  hostname,
  target,
  today,
  sel_view_recode,
  homeBasicInfo,
  downUrlLeft
}