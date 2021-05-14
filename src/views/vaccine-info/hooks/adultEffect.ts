import { ref } from 'vue'
import { Toast } from 'vant'
import { VaccineInoculationInfo, getVaccineInoculationInfoList } from '@/api/vaccine'


export const childEffect = () => {
    const tips =
      '下表中疫苗仅供参考，必须在医生指导下进行；因疫苗种类不同，免疫程序有所差别，接种时以疫苗说明书为准。'
    const columns = ['疫苗名称', '剂次', '程序']
    const info = ref<Array<Array<VaccineInoculationInfo>>>([])

    const requestVaccineInoculationInfoList = async () => {
        const toast = Toast.loading({
            message: '加载中......',
            forbidClick: true
          })
       const res =  await getVaccineInoculationInfoList({inoculationObject: '2'})
       toast.clear()
       const data = res.data
       const infoMap: Map<string, Array<VaccineInoculationInfo>> = new Map()
       data.forEach(element => {
        if (infoMap.has(element.name)) {
          infoMap.get(element.name)?.push(element)
        } else {
          infoMap.set(element.name, [element])
        }
      })
      info.value = [...infoMap.values()]
    }

    return {
        tips,
        columns,
        info,
        requestVaccineInoculationInfoList
    }

}