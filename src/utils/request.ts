import { AxiosRequestConfig } from 'axios'
import { Toast, Dialog } from 'vant'
import { ResponseCode } from './response_code'
import service from './axios'

interface BaseResponse<T> {
  code: string
  status: boolean
  data: T
  message?: string
}

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    service.request<BaseResponse<T>>(config).then(
      res => {
        resolve(res.data)
      },
      err => {
        const errCode = err?.code
        switch (err?.code) {
          
          case ResponseCode.FAIL:
            Toast(err.message)
            break;
          default:
            Toast('网络异常，请稍候重试......')
            break
        }
        reject(err)
      }
    ).catch
  })
}

export default request
