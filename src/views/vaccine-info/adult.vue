<template>
  <VaccineInoculationInfoTable
    :tips="tips"
    :columns="columns"
    :data="info"
  ></VaccineInoculationInfoTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  VaccineInoculationInfo,
  VACCINE_ADULT
} from '@/utils/vaccine-inoculation-info'

import VaccineInoculationInfoTable from './componets/AdultTable.vue'

export default defineComponent({
  name: 'ChildVaccineInfo',
  setup() {
    const tips =
      '下表中疫苗仅供参考，必须在医生指导下进行；因疫苗种类不同，免疫程序有所差别，接种时以疫苗说明书为准。'
    const columns = ['疫苗名称', '剂次', '程序']

    const infoMap: Map<string, Array<VaccineInoculationInfo>> = new Map()
    VACCINE_ADULT.forEach(element => {
      if (infoMap.has(element.name)) {
        infoMap.get(element.name)?.push(element)
      } else {
        infoMap.set(element.name, [element])
      }
    })
    const info = [...infoMap.values()]

    return {
      tips,
      columns,
      info
    }
  },
  components: {
    VaccineInoculationInfoTable
  }
})
</script>

<style lang="scss" scoped></style>
