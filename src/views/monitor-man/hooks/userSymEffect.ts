import moment from "moment"
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { Toast } from 'vant'

import {MonitorUserInfoRequest, submitMonitorUserInfo } from '@/api/monitor-man'

export const userSymEffect = () =>{
    const store = useStore()
    const userInfo = { ...store.state.monitorUser.userInfo }

    const router = useRouter()

    const state = reactive({
        time: moment().format('yyyy-MM-DD'),
        mbtp: '',
        nbtp: '',
        symGroupChecked: [],
        symChecked: '无'
      })
      const validatorbtpMessage = (value: string) => {
        if (value != '' && !/^(3\d|4[0-5])(\.\d{1,2})?$/.test(value)) {
          return '体温填写错误'
        }
      }
      const symGroupChange = (names: any[]) => {
        if (names.length !== 0) {
          state.symChecked = ''
        }
      }
      const symCheckedChange = (name: string) => {
        if (name != '') {
          state.symGroupChecked = []
        }
      }
      const onSubmit = async (values: any) => {
          const toast = Toast.loading({
            message: '上传中...',
            forbidClick: true,
          });
          const userSymData: MonitorUserInfoRequest = {time: moment().format('YYYY-MM-DD HH:MM:SS')};
          if(state.symGroupChecked.length == 0 && state.symChecked != '') {
            userSymData.syms = [state.symChecked]
          }else{
            userSymData.syms = [...state.symGroupChecked]
          }
          userSymData.mbtp = state.mbtp
          userSymData.nbtp = state.nbtp
          await submitMonitorUserInfo({...userInfo, ...userSymData})
          toast.clear()
          router.push({path: '/monitor-success'})
        
      }

      return {
        state,
        validatorbtpMessage,
        symGroupChange,
        symCheckedChange,
        onSubmit
      }

}