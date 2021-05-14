import { MutationTree, ActionTree } from 'vuex'
import { State } from "./types/state-types";
import { Mutation, Mutations} from './types/mutation-types'


export const state: State = {
    userInfo: {}
}

const mutations: MutationTree<State> & Mutations = {
    [Mutation.SET_USER_INFO](state,info) {
        state.userInfo = info
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

