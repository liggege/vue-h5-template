import request from '@/utils/request'
import {MonitorManUserBaseInfo} from '@/store/modules/monitor-man/types/state-types'

export type MonitorUserInfoRequest = {
    time: string; //时间
    mbtp?: string; //早体温
    nbtp?: string; //晚体温
    syms?: Array<string> //症状
    
} & MonitorManUserBaseInfo

export type MonitorUserInResponse = {}

export function submitMonitorUserInfo(data: MonitorUserInfoRequest){
    return request({
        url: '/addMonitorUserInfo',
        method: 'POST',
        data
    })
}