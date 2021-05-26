<template>
  <div class="risk-form" style="margin-top: 16px">
    <van-form
      @submit="submit"
      @failed="failed"
      ref="riskForm"
      validate-trigger="onSubmit"
    >
      <van-field
        style="position: absolute;opacity: 0;"
        name="sex"
        v-model="state.sex"
        :rules="[{ required: true, message: '1.性别' }]"
      ></van-field>
      <van-cell-group title="1.性别">
        <van-radio-group v-model="state.sex">
          <van-cell-group>
            <van-cell title="男" clickable @click="state.sex = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="state.sex = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="age"
        v-model="state.age"
        :rules="[{ required: true, message: '2.年龄' }]"
      ></van-field>
      <van-cell-group title="2.年龄">
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="ageRange"
          @change="onAgeRangeSelect"
        />
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="height"
        v-model="state.height"
        :rules="[{ required: true, message: '2.身高' }]"
      ></van-field>
      <van-cell-group title="3.身高">
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="heightRange"
          @change="onheightRangeSelect"
        />
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="weight"
        v-model="state.weight"
        :rules="[{ required: true, message: '4.体重' }]"
      ></van-field>
      <van-cell-group title="4.体重">
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="weightRange"
          @change="onWeightRangeSelect"
        />
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="waistline"
        v-model="state.waistline"
        :rules="[{ required: true, message: '5.腰围' }]"
      ></van-field>
      <van-cell-group title="5.腰围">
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="waistlineRange"
          @change="onWaistlineRangeRangeSelect"
        />
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="diabetesField"
        v-model="state.diabetesField"
        :rules="[
          {
            required: true,
            message: '6.TA和TA的亲属中，是否有糖尿病患者'
          }
        ]"
      ></van-field>
      <van-cell-group title="6.TA和TA的亲属中，是否有糖尿病患者">
        <van-radio-group
          v-model="state.diabetesStatus"
          @change="onDiabetesStatusChange"
        >
          <van-cell-group>
            <van-cell title="有" clickable @click="state.diabetesStatus = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-checkbox-group
              class="inner-checkbox-group"
              v-show="state.diabetesSelectShow"
              v-model="state.diabetesSelect"
            >
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in familyRelations"
                  clickable
                  :key="item"
                  :title="`${item}`"
                  @click="onDiabetesFamilyRelationsToggle(index)"
                >
                  <template #right-icon>
                    <van-checkbox
                      :ref="el => (diabetesFamilyRelationsRefs[index] = el)"
                      :name="item"
                      @click.stop
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
            <van-cell
              title="没有"
              clickable
              @click="state.diabetesStatus = '0'"
            >
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="hbpField"
        v-model="state.hbpField"
        :rules="[
          {
            required: true,
            message: '7.TA和TA的亲属中，是否有高血压患者'
          }
        ]"
      ></van-field>
      <van-cell-group title="7.TA和TA的亲属中，是否有高血压患者">
        <van-radio-group v-model="state.hbpStatus" @change="onHbpStatusChange">
          <van-cell-group>
            <van-cell title="有" clickable @click="state.hbpStatus = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-checkbox-group
              class="inner-checkbox-group"
              v-show="state.hbpSelectShow"
              v-model="state.hbpSelect"
            >
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in familyRelations"
                  clickable
                  :key="item"
                  :title="`${item}`"
                  @click="onhbpRelationsToggle(index)"
                >
                  <template #right-icon>
                    <van-checkbox
                      :ref="el => (hbpFamilyRelationsRefs[index] = el)"
                      :name="item"
                      @click.stop
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
            <van-cell title="没有" clickable @click="state.hbpStatus = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="strokeField"
        v-model="state.strokeField"
        :rules="[
          {
            required: true,
            message: '8.TA和TA的亲属中，是否有脑卒中（中风）病史'
          }
        ]"
      ></van-field>
      <van-cell-group title="8.TA和TA的亲属中，是否有脑卒中（中风）病史">
        <van-radio-group
          v-model="state.strokeStatus"
          @change="onStrokeStatusChange"
        >
          <van-cell-group>
            <van-cell title="有" clickable @click="state.strokeStatus = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-checkbox-group
              class="inner-checkbox-group"
              v-show="state.strokeSelectShow"
              v-model="state.strokeSelect"
            >
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in familyRelations"
                  clickable
                  :key="item"
                  :title="`${item}`"
                  @click="onStrokeRelationsToggle(index)"
                >
                  <template #right-icon>
                    <van-checkbox
                      :ref="el => (strokeFamilyRelationsRefs[index] = el)"
                      :name="item"
                      @click.stop
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
            <van-cell title="没有" clickable @click="state.strokeStatus = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="drinking"
        v-model="state.drinking"
        :rules="[
          {
            required: true,
            message: '9.TA是否喝酒？'
          }
        ]"
      ></van-field>
      <van-cell-group title="9.TA是否喝酒？">
        <van-radio-group v-model="state.drinking">
          <van-cell-group>
            <van-cell
              title="偶尔喝（每月3次一下）"
              clickable
              @click="state.drinking = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell
              title="经常喝（没周一次以上）"
              clickable
              @click="state.drinking = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="每天都喝" clickable @click="state.drinking = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
            <van-cell title="从不" clickable @click="state.drinking = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="smoking"
        v-model="state.smoking"
        :rules="[
          {
            required: true,
            message: '10.TA是否吸烟？'
          }
        ]"
      ></van-field>
      <van-cell-group title="10.TA是否吸烟？">
        <van-radio-group v-model="state.smoking">
          <van-cell-group>
            <van-cell title="现在每天吸" clickable @click="state.smoking = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell
              title="现在吸，但不是每天吸"
              clickable
              @click="state.smoking = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell
              title="过去吸，现在不吸"
              clickable
              @click="state.smoking = '3'"
            >
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
            <van-cell title="从不吸烟" clickable @click="state.smoking = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="eatingHabtis"
        v-model="state.eatingHabtis"
        :rules="[
          {
            required: true,
            message: '11.TA目前的饮食习惯？'
          }
        ]"
      ></van-field>
      <van-cell-group title="11.TA目前的饮食习惯？">
        <van-radio-group v-model="state.eatingHabtis">
          <van-cell-group>
            <van-cell
              title="荤素均衡搭配"
              clickable
              @click="state.eatingHabtis = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell
              title="荤食为主"
              clickable
              @click="state.eatingHabtis = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell
              title="素食为主"
              clickable
              @click="state.eatingHabtis = '3'"
            >
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="eatingTasteField"
        v-model="state.eatingTasteField"
        :rules="[
          {
            required: true,
            message: '12.TA目前的饮食口味？'
          }
        ]"
      ></van-field>
      <van-cell-group title="12.TA目前的饮食口味？">
        <van-checkbox-group
          v-model="state.eatingTasteSelect"
          @change="onEatingTasteChange"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in eatingTastes"
              clickable
              :key="item.text"
              :title="item.text"
              @click="onEatingTastesToggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  shape="square"
                  :ref="el => (eatingTastesRefs[index] = el)"
                  :name="item.value"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-radio-group v-model="state.eatingTastesOhter">
          <van-cell-group>
            <van-cell title="还算正常" clickable @click="onEatingTastesOhter">
              <template #right-icon>
                <van-radio shape="square" name="4" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="motion"
        v-model="state.motion"
        :rules="[
          {
            required: true,
            message: '13.TA的运动情况？'
          }
        ]"
      ></van-field>
      <van-cell-group title="13.TA的运动情况？">
        <van-radio-group v-model="state.motion">
          <van-cell-group>
            <van-cell
              title="每天（从事体力劳动）"
              clickable
              @click="state.motion = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell
              title="每周一次以上"
              clickable
              @click="state.motion = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="偶尔" clickable @click="state.motion = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
            <van-cell title="不运动" clickable @click="state.motion = '4'">
              <template #right-icon>
                <van-radio name="4" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="bpValField"
        v-model="state.bpValField"
        :rules="[
          {
            required: true,
            message: '14.请输入TA的血压值？'
          }
        ]"
      ></van-field>
      <van-cell-group title="14.请输入TA的血压值？">
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="sbpRange"
          @change="onsbpRangeSelect"
        />
        <van-picker
          :visible-item-count="5"
          :item-height="36"
          :show-toolbar="false"
          :columns="dbpRange"
          @change="onDbpRangeSelect"
        />
        <van-checkbox-group
          ref="bpValStatusRef"
          v-model="state.bpValStatus"
          @change="onBpValStatusChange"
        >
          <van-cell-group>
            <van-cell title="不清楚" clickable @click="onBpValStatusToggle">
              <template #right-icon>
                <van-checkbox shape="square" name="1" @click.stop />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="bloodFat"
        v-model="state.bloodFat"
        :rules="[
          {
            required: true,
            message: '15.TA是否血脂异常？'
          }
        ]"
      ></van-field>
      <van-cell-group title="15.TA是否血脂异常？">
        <van-radio-group v-model="state.bloodFat">
          <van-cell-group>
            <van-cell title="是" clickable @click="state.bloodFat = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="否" clickable @click="state.bloodFat = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="不详" clickable @click="state.bloodFat = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="medicalHis1Field"
        v-model="state.medicalHis1Field"
        :rules="[
          {
            required: true,
            message: '16.TA是否有以下病史?（多选）'
          }
        ]"
      ></van-field>
      <van-cell-group title="16.TA是否有以下病史?（多选）">
        <van-checkbox-group
          v-model="state.medicalHis1"
          @change="onmedicalHis1Change"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in medicalHis1List"
              clickable
              :key="item.text"
              :title="item.text"
              @click="onMedicalHis1Toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  shape="square"
                  :ref="el => (medicalHis1Refs[index] = el)"
                  :name="item.value"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-checkbox-group
          ref="medicalHis1OhterRef"
          v-model="state.medicalHis1Ohter"
          @change="onMedicalHis1OhterChange"
        >
          <van-cell-group>
            <van-cell
              title="以上症状均无"
              clickable
              @click="onMedicalHis1OhterToggle"
            >
              <template #right-icon>
                <van-checkbox shape="square" name="0" @click.stop />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="medicalHis2Field"
        v-model="state.medicalHis2Field"
        :rules="[
          {
            required: true,
            message: '17.TA是否有以下病史?（多选）'
          }
        ]"
      ></van-field>
      <van-cell-group title="17.TA是否有以下病史?（多选）">
        <van-checkbox-group
          v-model="state.medicalHis2"
          @change="onmedicalHis2Change"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in medicalHis2List"
              clickable
              :key="item.text"
              :title="item.text"
              @click="onMedicalHis2Toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  shape="square"
                  :ref="el => (medicalHis2Refs[index] = el)"
                  :name="item.value"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-checkbox-group
          ref="medicalHis2OhterRef"
          v-model="state.medicalHis2Ohter"
          @change="onMedicalHis2OhterChange"
        >
          <van-cell-group>
            <van-cell
              title="以上均无"
              clickable
              @click="onMedicalHis2OhterToggle"
            >
              <template #right-icon>
                <van-checkbox shape="square" name="0" @click.stop />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-cell-group>
      <van-field
        style="position: absolute;opacity: 0;"
        name="longDrug"
        v-model="state.longDrug"
        :rules="[
          {
            required: true,
            message: '18.TA是否长期接受抗精神类药物和（或）抗抑郁症药物治疗?'
          }
        ]"
      ></van-field>
      <van-cell-group
        title="18.TA是否长期接受抗精神类药物和（或）抗抑郁症药物治疗?"
      >
        <van-radio-group v-model="state.longDrug">
          <van-cell-group>
            <van-cell title="是" clickable @click="state.longDrug = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="否" clickable @click="state.longDrug = '0'">
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
      <div style="margin: 36px 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { Checkbox, Form, Picker, Dialog } from 'vant'
import { riskInfoEffect } from './hooks/riskInfoEffect'

export default defineComponent({
  name: 'RiskAssessment',
  setup() {
    const riskForm = ref<typeof Form>()
    const state = reactive({
      sex: '',
      age: '',
      height: '',
      weight: '',
      waistline: '',
      diabetesStatus: '',
      diabetesSelectShow: false,
      diabetesSelect: [],
      diabetesField: '',
      hbpStatus: '',
      hbpSelectShow: false,
      hbpSelect: [],
      hbpField: '',
      strokeStatus: '',
      strokeSelectShow: false,
      strokeSelect: [],
      strokeField: '',
      drinking: '',
      smoking: '',
      eatingHabtis: '',
      eatingTasteSelect: [],
      eatingTastesOhter: '',
      eatingTasteField: '',
      motion: '',
      bpValStatus: [],
      sbp: '',
      dbp: '',
      bpValField: '',
      bloodFat: '',
      medicalHis1: [],
      medicalHis1Ohter: [],
      medicalHis1Field: '',
      medicalHis2: [],
      medicalHis2Ohter: [],
      medicalHis2Field: '',
      longDrug: ''
    })
    const ageRange = [
      {
        values: [...Array(103).keys()].map(i => i + 18),
        defaultIndex: 32
      },
      {
        values: ['岁'],
        defaultIndex: 0
      }
    ]
    const onAgeRangeSelect = (value: any) => {
      state.age = value[0]
    }
    const heightRange = [
      {
        values: [...Array(111).keys()].map(i => i + 120),
        defaultIndex: 50
      },
      {
        values: ['cm'],
        defaultIndex: 0
      }
    ]
    const onheightRangeSelect = (value: any) => {
      state.height = value[0]
    }
    const weightRange = [
      {
        values: [...Array(101).keys()].map(i => i + 20),
        defaultIndex: 50
      },
      {
        values: ['kg'],
        defaultIndex: 0
      }
    ]
    const onWeightRangeSelect = (value: any) => {
      state.weight = value[0]
    }
    const waistlineRange = [
      {
        values: [...Array(101).keys()].map(i => i + 50),
        defaultIndex: 35
      },
      {
        values: ['cm'],
        defaultIndex: 0
      }
    ]
    const onWaistlineRangeRangeSelect = (value: any) => {
      state.waistline = value[0]
    }

    const familyRelations = [
      '评测者',
      '子',
      '女',
      '父亲',
      '母亲',
      '兄弟姐妹',
      '祝父母或外祖父母'
    ]

    //糖尿病
    const diabetesFamilyRelationsRefs = ref<Array<typeof Checkbox>>([])
    const onDiabetesStatusChange = (value: string) => {
      if (value != '1') {
        state.diabetesSelectShow = false
        state.diabetesSelect = []
      } else {
        state.diabetesSelectShow = true
      }
    }
    const onDiabetesFamilyRelationsToggle = (index: number) => {
      diabetesFamilyRelationsRefs.value[index].toggle()
    }

    watch([() => state.diabetesStatus, () => state.diabetesSelect], () => {
      if (state.diabetesStatus == '0') {
        //选择没有
        state.diabetesField = '1'
      } else if (
        state.diabetesStatus == '1' &&
        state.diabetesSelect.length > 0
      ) {
        //选择有
        state.diabetesField = '1'
      } else {
        state.diabetesField = ''
      }
    })

    //高血压
    const hbpFamilyRelationsRefs = ref<Array<typeof Checkbox>>([])
    const onHbpStatusChange = (value: string) => {
      if (value != '1') {
        state.hbpSelectShow = false
        state.hbpSelect = []
      } else {
        state.hbpSelectShow = true
      }
    }
    const onhbpRelationsToggle = (index: number) => {
      hbpFamilyRelationsRefs.value[index].toggle()
    }
    watch([() => state.hbpStatus, () => state.hbpSelect], () => {
      if (state.hbpStatus == '0') {
        //选择没有
        state.hbpField = '1'
      } else if (state.hbpStatus == '1' && state.hbpSelect.length > 0) {
        //选择有
        state.hbpField = '1'
      } else {
        state.hbpField = ''
      }
    })

    //脑卒中（中风）
    const strokeFamilyRelationsRefs = ref<Array<typeof Checkbox>>([])
    const onStrokeStatusChange = (value: string) => {
      if (value != '1') {
        state.strokeSelectShow = false
        state.strokeSelect = []
      } else {
        state.strokeSelectShow = true
      }
    }
    const onStrokeRelationsToggle = (index: number) => {
      strokeFamilyRelationsRefs.value[index].toggle()
    }

    watch([() => state.strokeStatus, () => state.strokeSelect], () => {
      if (state.strokeStatus == '0') {
        //选择没有
        state.strokeField = '1'
      } else if (state.strokeStatus == '1' && state.strokeSelect.length > 0) {
        //选择有
        state.strokeField = '1'
      } else {
        state.strokeField = ''
      }
    })

    //饮食口味
    const eatingTastes = [
      {
        text: '嗜盐',
        value: '1'
      },
      {
        text: '嗜油',
        value: '2'
      },
      {
        text: '嗜糖',
        value: '3'
      }
    ]
    const eatingTastesRefs = ref<Array<typeof Checkbox>>([])
    const onEatingTastesToggle = (index: number) => {
      eatingTastesRefs.value[index].toggle()
    }

    const onEatingTasteChange = (values: string[]) => {
      if (values.length > 0) {
        state.eatingTastesOhter = ''
      }
    }

    const onEatingTastesOhter = () => {
      if (state.eatingTastesOhter != '') {
        state.eatingTastesOhter = ''
      } else {
        state.eatingTastesOhter = '4'
        state.eatingTasteSelect = []
      }
    }

    watch(
      [() => state.eatingTastesOhter, () => state.eatingTasteSelect],
      () => {
        if (
          state.eatingTastesOhter != '' ||
          state.eatingTasteSelect.length > 0
        ) {
          state.eatingTasteField = '1'
        } else {
          state.eatingTasteField = ''
        }
      }
    )

    //血压值
    const sbpRange = [
      {
        values: ['收缩压'],
        defaultIndex: 0
      },
      {
        values: [...Array(191).keys()].map(i => i + 60),
        defaultIndex: 60
      },
      {
        values: ['mmHg'],
        defaultIndex: 0
      }
    ]
    const onsbpRangeSelect = (value: any) => {
      state.sbp = value[1]
    }
    const dbpRange = [
      {
        values: ['舒张压'],
        defaultIndex: 0
      },
      {
        values: [...Array(151).keys()].map(i => i + 30),
        defaultIndex: 50
      },
      {
        values: ['mmHg'],
        defaultIndex: 0
      }
    ]

    const onDbpRangeSelect = (value: any) => {
      state.dbp = value[1]
    }
    const bpValStatusRef = ref<typeof Checkbox>()
    const onBpValStatusChange = (values: string[]) => {
      if (values.length > 0) {
        state.sbp = ''
        state.dbp = ''
      }
    }
    const onBpValStatusToggle = () => {
      bpValStatusRef.value!.toggleAll()
    }

    watch([() => state.bpValStatus, () => state.sbp, () => state.dbp], () => {
      if (
        state.bpValStatus.length > 0 ||
        (state.sbp != '' && state.dbp != '')
      ) {
        state.bpValField = '1'
      } else {
        state.bpValField = ''
      }
    })

    //病史1
    const medicalHis1List = [
      {
        text: '有糖调节受损（IGR,又称糖尿病前期)',
        value: '1'
      },
      {
        text: '动脉粥样硬化心脑血管疾病',
        value: '2'
      },
      {
        text: '有一过性类固醇糖尿病',
        value: '3'
      },
      {
        text: '房颤或明显的脉搏不齐',
        value: '4'
      },
      {
        text: '短暂脑缺血发作病史(TIA)',
        value: '5'
      }
    ]
    const medicalHis1Refs = ref<Array<typeof Checkbox>>([])
    const onmedicalHis1Change = (values: string[]) => {
      if (values.length > 0) {
        state.medicalHis1Ohter = []
      }
    }
    const onMedicalHis1Toggle = (index: number) => {
      medicalHis1Refs.value[index].toggle()
    }
    const medicalHis1OhterRef = ref<typeof Checkbox>()
    const onMedicalHis1OhterChange = (values: string[]) => {
      if (values.length > 0) {
        state.medicalHis1 = []
      }
    }
    const onMedicalHis1OhterToggle = () => {
      medicalHis1OhterRef.value!.toggleAll()
    }
    watch([() => state.medicalHis1, () => state.medicalHis1Ohter], () => {
      if (state.medicalHis1.length > 0 || state.medicalHis1Ohter.length > 0) {
        state.medicalHis1Field = '1'
      } else {
        state.medicalHis1Field = ''
      }
    })
    //病史2
    const medicalHis2List = [
      {
        text: '有巨大儿（出生体重≥4kg）生产史',
        value: '1'
      },
      {
        text: '有妊娠期糖尿病史',
        value: '2'
      },
      {
        text: '多囊卵巢综合症患者',
        value: '3'
      }
    ]
    const medicalHis2Refs = ref<Array<typeof Checkbox>>([])
    const onmedicalHis2Change = (values: string[]) => {
      if (values.length > 0) {
        state.medicalHis2Ohter = []
      }
    }
    const onMedicalHis2Toggle = (index: number) => {
      medicalHis2Refs.value[index].toggle()
    }
    const medicalHis2OhterRef = ref<typeof Checkbox>()
    const onMedicalHis2OhterChange = (values: string[]) => {
      if (values.length > 0) {
        state.medicalHis2 = []
      }
    }
    const onMedicalHis2OhterToggle = () => {
      medicalHis2OhterRef.value!.toggleAll()
    }
    watch([() => state.medicalHis2, () => state.medicalHis2Ohter], () => {
      if (state.medicalHis2.length > 0 || state.medicalHis2Ohter.length > 0) {
        state.medicalHis2Field = '1'
      } else {
        state.medicalHis2Field = ''
      }
    })

    //提交
    const submit = () => {
      console.log({ ...state })
    }
    const failed = (errorInfo: {
      values: object
      errors: { name: string; message: string }[]
    }) => {
      console.log(errorInfo)
      const { name, message } = errorInfo.errors[0]
      Dialog.alert({
        message: `您有未作答的题目：${message}`
      }).then(() => {
        console.log('ssssssss')
        riskForm.value!.scrollToField(name, true)
      })
    }
    return {
      riskForm,
      state,
      ageRange,
      onAgeRangeSelect,
      heightRange,
      onheightRangeSelect,
      weightRange,
      onWeightRangeSelect,
      waistlineRange,
      onWaistlineRangeRangeSelect,
      onDiabetesStatusChange,
      familyRelations,
      diabetesFamilyRelationsRefs,
      onDiabetesFamilyRelationsToggle,
      hbpFamilyRelationsRefs,
      onHbpStatusChange,
      onhbpRelationsToggle,
      strokeFamilyRelationsRefs,
      onStrokeStatusChange,
      onStrokeRelationsToggle,
      eatingTastes,
      onEatingTastesToggle,
      eatingTastesRefs,
      onEatingTasteChange,
      onEatingTastesOhter,
      sbpRange,
      onsbpRangeSelect,
      dbpRange,
      onDbpRangeSelect,
      bpValStatusRef,
      onBpValStatusChange,
      onBpValStatusToggle,
      medicalHis1List,
      medicalHis1Refs,
      onmedicalHis1Change,
      onMedicalHis1Toggle,
      medicalHis1OhterRef,
      onMedicalHis1OhterChange,
      onMedicalHis1OhterToggle,
      medicalHis2List,
      medicalHis2Refs,
      onmedicalHis2Change,
      onMedicalHis2Toggle,
      medicalHis2OhterRef,
      onMedicalHis2OhterChange,
      onMedicalHis2OhterToggle,
      failed,
      submit
    }
  },
  components: {
    [Picker.name]: Picker
  }
})
</script>
<style lang="scss" scoped>
::v-deep .van-cell-group__title {
  background-color: #9697990f;
  font-size: 16px;
}
::v-deep .van-cell {
  font-size: 16px;
  padding-left: 30px;
  padding-right: 30px;
}
::v-deep .van-radio {
  padding: 6px 0;
}
::v-deep .van-checkbox {
  padding: 6px 0;
}
::v-deep .van-picker-column {
  flex: none;
}
::v-deep .van-picker__columns {
  justify-content: center;
}
::v-deep .van-picker-column__item {
  padding-left: 20px;
  padding-right: 20px;
}
::v-deep .van-picker__frame {
  left: 0px;
  right: 0px;
}
.inner-checkbox-group {
  padding-left: 12px;
}
</style>
