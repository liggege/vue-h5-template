import { GetterTree } from 'vuex'
import {State as MonitorUserState } from './modules/monitor-man/types/state-types'

export interface State {
    monitorUser: MonitorUserState
    //..
}

export type Getters = {
    getMonitorUserIdCard(state: State): string | undefined
}

const getters: GetterTree<State,State> & Getters = {
    getMonitorUserIdCard: state => state.monitorUser.userInfo.idcard
}

export default getters
