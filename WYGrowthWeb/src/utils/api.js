import axios from 'axios'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import Router from '@/router'

import BASE_URL from './baseurl'





function logout() {
  Router.push({
    name: 'login'
  })
  // store.commit('login/LOGIN_OUT')
}

const Request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 12000000
})
const onRequest = (req) => {
  // req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (localStorage.getItem('ACCOUNT_DETAIL') && localStorage.getItem('ACCOUNT_DETAIL') !== 'undefined') {
    req.data.biz_id = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).biz_id
    req.headers['Authorization'] = JSON.parse(localStorage.getItem('ACCOUNT_DETAIL')).token
    // req.headers['web_version'] = '1.0.0'

  }
  if(localStorage.getItem('org_id')) {
    let data = JSON.parse(JSON.stringify(req.data))
    if(!data.org_id) {
      data.org_id = localStorage.getItem('org_id')
    }
    req.data = data
    // req.data.org_id = JOSN.parse(localStorage.getItem('org_id'))
  }
  return req
}

const onRequestError = (err) => {
  return Promise.reject(err)
}

const onResponse = (res) => {
  if (res.headers.sys_version != '1.0.2') {
    // window.location.reload()
  }
  if (res.data.status == '401') {
    ElNotification({
      message: res.data.content,
      type: 'error',
      duration: 2000
    })
    setTimeout(() => {
      logout()
    }, 500);
    return
  }
  const code = res.data.code
  switch (code) {
    case 0:
      ElMessage({
        // message: '警告哦，这是一条警告消息',
        message: res.data.message ? res.data.message : 'Data Error',
        type: 'warning'
      })
      // ElNotification({
      //   message: res.data.message ? res.data.message : res.message,
      //   type: 'error',
      //   duration: 2000
      // })
      break
    case 500:
      ElNotification({
        message: res.data.message || '出错了',
        type: 'error',
        duration: 2000
      })
      setTimeout(() => {
      }, 500);
      break
    case 401:
      ElNotification({
        message: res.data.message,
        type: 'error',
        duration: 2000
      })
      setTimeout(() => {
        logout()
      }, 500);
      break
   
  }
  return res.data
}
let isNotice = false
const onResponseError = (err) => {
  const title = err.response.data.content || '出错了！'
  let out = false
  let message = ''
  if (err.response) {
    switch (err.response.data.status) {
      case '401':
        // message = '鉴权失败'
        message = err.response.data.message
        out = true
        break
      // case 403:
      //   message = '拒绝执行'
      //   break
      // case 404:
      //   message = '资源未找到'
      //   break
      // case 405:
      //   message = '方法错误'
      //   break
      // case 409:
      //   message = '未登录'
      //   // out = true
      //   break
      // case 500:
      //   message = '无法完成请求'
      //   break
      // case 503:
      //   message = '暂时无法处理请求'
      //   break
      // default:
      //   message = err.response.data.errmsg
    }
  }
  if (!isNotice) {
    isNotice = true
    ElNotification({
      title,
      message,
      type: 'error',
      duration: 2000
    })
  }
  setTimeout(() => {
    isNotice = false
  }, 2000);
  if (out) {
    logout()
  }
  return Promise.reject(err)
}

Request.interceptors.request.use(onRequest, onRequestError)
Request.interceptors.response.use(onResponse, onResponseError)



export default Request
