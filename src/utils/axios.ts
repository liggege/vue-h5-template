import axios, { AxiosInstance } from 'axios'
import { ResponseCode } from './response_code'

// eslint-disable-next-line
const config = require('../../config')
const { baseURL } = config[process.env.NODE_ENV]


// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000
  // withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
        return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== ResponseCode.SUCCESS) {
      return Promise.reject(res)
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
