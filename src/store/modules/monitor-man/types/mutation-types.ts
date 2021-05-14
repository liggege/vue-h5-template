import { State, MonitorManUserBaseInfo } from './state-types'

export enum Mutation {
    SET_USER_INFO = 'SET_USER_INFO'
}

export type Mutations<S = State> = {
    [Mutation.SET_USER_INFO](State: S, info: MonitorManUserBaseInfo): void
}