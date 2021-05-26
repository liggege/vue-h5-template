import request from '@/utils/request'

export type VaccPointInfoListRequest = {
    pageSize: number; 
    pageNo: number;
    areaCode?:string
}

export type  VaccPointInfo = {
    id: string;
    name: string;
    addrress: string
}

export type VaccPointInfoListResponse = Array<VaccPointInfo>


export function getVaccPointInfoList(data: VaccPointInfoListRequest) {
    return request<VaccPointInfoListResponse>({
        'url': '/getVaccPointInfoList',
        method: 'POST',
        data
    })
}