import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

//const baseUrRL = (process.env.NODE_ENV === 'development') ? '/' : 'http://10.3.64.212:9020/'
// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // baseURL: process.env.API_ROOT,
  //baseURL: baseUrRL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === 'get' || config.method === 'delete') {
      config.data = true
    }
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  response => {
    if (response.status === 500) {
      return Promise.reject(new Error('服务异常，请稍后重试！'))
    }
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.returnCode !== '00200' & res.returnCode !== '00900') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401 && error.response.data.returnCode !== '00603') {
      MessageBox.alert('登录信息失效，请重新登录', {}).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      const message = (error.response && error.response.data && error.response.data.msg) || '请求失败，请稍后重试'
      return Promise.reject(message)
    }
  }
)
export default service
