import request from '@/utils/request'

export type PersonReportInfoRequest = {
  username: string //姓名
  idcard: string //身份证
  phone: string //手机号
  area: string //所在区域名称
  areaCode: string //区域code
  addr: string //详细地址
  reportType: string //申报类型
  remark: string //备注
}

export type PersonReportInfoReponse = {}

export function submitPersonReportInfo(data: PersonReportInfoRequest) {
  return request({
    url: '/addPersonReportInfo',
    method: 'POST',
    data
  })
}
