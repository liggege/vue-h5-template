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
              <tr v-if="index == 0" :key="item.id">
                <td :rowspan="values.length">{{ item.ageText }}</td>
                <td class="align-l" @click="onNavigate(item.id)">
                  <label
                    :class="item.type == 1 ? 'free' : 'unfree'"
                    @click="onNavigate(item.id)"
                  >
                    <i>{{ item.type == 1 ? '免费' : '自费' }}</i>
                  </label>
                  <span>{{ item.name }}</span>
                </td>
                <td>{{ item.index }}</td>
              </tr>
              <tr v-if="!(index == 0)" :key="item.id">
                <td class="align-l" @click="onNavigate(item.id)">
                  <label :class="item.type == 1 ? 'free' : 'unfree'">
                    <i>{{ item.type == 1 ? '免费' : '自费' }}</i>
                  </label>
                  <span>{{ item.name }}</span>
                </td>
                <td>{{ item.index }}</td>
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

label.free,
label.unfree {
  line-height: 0 !important;
  display: inline-block;
  width: 80px;
  height: 34px;
  vertical-align: middle;
}

label.free i,
label.unfree i {
  font-size: 0 !important;
  display: inline-block;
  width: 68px;
  height: 34px;
  vertical-align: top;
}

label.free i {
  background: url('../../../assets/vaccine/icon01.png') no-repeat;
  background-position: 0 0.01rem;
  background-size: contain;
}

label.unfree i {
  background: url('../../../assets/vaccine/icon02.png') no-repeat;
  background-position: 0 0.01rem;
  background-size: contain;
}
</style>
