import request from '@/utils/request'

export type FeverClinicInfoListRequest = {
    pageSize: number; 
    pageNo: number;
    areaCode?:string
}


export type  FeverClinicInfo = {
    id: string;
    name: string;
    addrress: string
}

export type FeverClinicInfoListResponse = Array<FeverClinicInfo>


export function getFeverClinicInfoList(data: FeverClinicInfoListRequest) {
    return request<FeverClinicInfoListResponse>({
        'url': '/getFeverClinicInfoList',
        method: 'POST',
        data
    })
}