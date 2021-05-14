import request from '@/utils/request'

export type TreatmentHospitalInfoListRequest = {
    pageSize: number; 
    pageNo: number;
    areaCode?:string
}

export type  TreatmentHospitalInfo = {
    id: string;
    name: string;
    addrress: string
}

export type  TreatmentHospitalInfoListResponse = Array<TreatmentHospitalInfo>


export function getTreatmentHospitalInfoList(data: TreatmentHospitalInfoListRequest) {
    return request<TreatmentHospitalInfoListResponse>({
        'url': '/getTreatmentHospitalInfoList',
        method: 'POST',
        data
    })
}