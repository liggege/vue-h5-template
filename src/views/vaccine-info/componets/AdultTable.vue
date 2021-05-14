<template>
  <div class="knowledge-wrap">
    <p class="tips-box">
      {{ tips }}
    </p>
    <div class="tabble-warp">
      <table style="display:table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="values in data">
            <template v-for="(item, index) in values">
              <tr v-if="index == 0" :key="item.id" @click="onNavigate(item.id)">
                <td :rowspan="values.length">{{ item.name }}</td>
                <td>
                  {{ item.index }}
                </td>

                <td>{{ item.inoculationStep }}</td>
              </tr>
              <tr
                v-if="!(index == 0)"
                :key="item.id"
                @click="onNavigate(item.id)"
              >
                <td>
                  {{ item.index }}
                </td>
                <td>{{ item.inoculationStep }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { VaccineInoculationInfo } from '@/utils/vaccine-inoculation-info'

export default defineComponent({
  props: {
    tips: {
      type: String,
      requied: false
    },
    columns: {
      type: Array as PropType<Array<string>>,
      required: true,
      default: () => []
    },
    data: {
      type: Array as PropType<Array<Array<VaccineInoculationInfo>>>,
      required: false,
      default: () => []
    }
  },
  setup() {
    const router = useRouter()

    const onNavigate = (id: string) => {
      router.push({
        path: `/vaccine-info/${id}`
      })
    }
    return {
      onNavigate
    }
  }
})
</script>

<style lang="scss" scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th,
td {
  font-weight: normal;
  text-align: left;
  vertical-align: middle;
}
.tips-box {
  margin-top: 10px;
  font-size: 34px;
  padding: 9px 18px;
  color: #ffa73b;
  border: 1px solid #f5d053;
  background: #fff5be;
}
.tabble-warp table {
  width: 100%;
}
.tabble-warp td,
.tabble-warp th {
  font-size: 34px;
  padding: 20px;
  text-align: center;
  color: #666;
  border: 1px solid #eee;
}
.tabble-warp th {
  color: #0cb8f5;
  border: 1px solid #d0effa;
  background: #e8f6fb;
}
.tabble-warp .align-l {
  text-align: left;
}
.knowledge-wrap .tabble-warp {
  padding: 10px;
}
</style>
