<template>
  <VaccineInoculationInfoTable
    :tips="tips"
    :columns="columns"
    :data="info"
  ></VaccineInoculationInfoTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VaccineInoculationInfoTable from './componets/ChildTable.vue'
import { childEffect } from './hooks/childEffect'

export default defineComponent({
  name: 'ChildVaccineInfo',
  setup() {
    const {
      tips,
      columns,
      info,
      requestVaccineInoculationInfoList
    } = childEffect()

    requestVaccineInoculationInfoList()

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
