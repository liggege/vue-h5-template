import { reactive, ref, toRefs } from 'vue'
import { Toast } from 'vant'
import { VaccineDetailInfo, getVaccineDetailInfo } from '@/api/vaccine'

export interface VaccineInfoType {
    active: number
    info: VaccineDetailInfo

}

export const vaccineInfoEffect = () => {
    const vaccineInfoType = reactive<VaccineInfoType>({
        active: 0,
        info: {}
    })
   
    const requestVaccineDetailInfo = async (id: string) => {
        const toast = Toast.loading({
            message: '加载中......',
            forbidClick: true
        })
        const res = await getVaccineDetailInfo(id)
        toast.clear()
        const data = res.data
        vaccineInfoType.info = data
        document.title = data.name || ''
    }
    return {
        ...toRefs(vaccineInfoType),
        requestVaccineDetailInfo
    }
}