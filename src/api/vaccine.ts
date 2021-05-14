/**疫苗信息 */
import request from '@/utils/request'

/**
 * 疫苗详情
 */
export type VaccineDetailInfo = {
  id?: string
  name?: string
  effect?: string
  site?: string
  taboos?: string
  attention?: string
  reaction?: string
}

/**
 * 疫苗接种信息
 */
export type VaccineInoculationInfo = {
  id: string
  vaccineId: string
  months: string
  days: string
  ageText: string
  index: string
  type: string
  typeValue: string
  inoculationObject: string
  inoculationObjectValue: string
  inoculationStep: string
  name: string
}

export type VaccineInoculationInfoListRequest = {
    inoculationObject: string //接种对象
}
export type VaccineInoculationInfoListReponse = Array<VaccineInoculationInfo>

/**
 * 获取疫苗接种排表
 * @param data 
 * @returns 
 */
export function getVaccineInoculationInfoList(data: VaccineInoculationInfoListRequest) {
    return request<VaccineInoculationInfoListReponse>({
        url: '/getVaccineInoculationInfoList',
        method: 'POST',
        data
    })

}

/**
 * 
 * @param id 获取疫苗详情
 * @returns 
 */
export function getVaccineDetailInfo(id: string){
    return request<VaccineDetailInfo>({
        url: `getVaccineDetailInfo/${id}`,
        method: 'GET'
    })
}
