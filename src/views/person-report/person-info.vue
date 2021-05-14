<template>
  <div class="person-form" style="margin: 6px">
    <div class="form-head van-hairline--bottom">
      <p>
        与新型冠状病毒肺炎患者接触，有较高的感染风险。如果您（可能）与新冠肺炎患者有过接触，
        请您进行信息登记，我们将与街道（社区）疫情防控人员联动，如有异常情况我们将与您及时联系
      </p>
    </div>
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="state.username"
        required
        maxlength="20"
        name="username"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="state.idcard"
        required
        maxlength="18"
        name="idcard"
        label="身份证号"
        readonly
        clickable
        placeholder="身份证号"
        :rules="[{ validator: validatorIdCardMessage }]"
        @touchstart.stop="state.numberKeyboardShow = true"
      />
      <van-number-keyboard
        safe-area-inset-bottom
        :show="state.numberKeyboardShow"
        extra-key="X"
        close-button-text="完成"
        @blur="state.numberKeyboardShow = false"
        @input="onInput"
        @delete="onDelete"
      />
      <van-field
        v-model="state.phone"
        type="tel"
        required
        name="phone"
        maxlength="11"
        label="手机号"
        placeholder="手机号"
        :rules="[{ validator: validatorPhoneMessage }]"
      />
      <van-field
        required
        v-model="state.area"
        name="area"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        :rules="[{ required: true, message: '请选择所在地区' }]"
        @click="state.show = true"
      />
      <van-popup v-model:show="state.show" round position="bottom">
        <van-cascader
          v-model="state.areaCode"
          title="请选择所在地区"
          :options="options"
          @close="state.show = false"
          @finish="onFinish"
        />
      </van-popup>
      <van-field
        v-model="state.addr"
        required
        name="addr"
        label="详细地址"
        placeholder="请输入详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <van-field
        v-model="state.reportType"
        required
        readonly
        clickable
        name="reportType"
        label="申报分类"
        @click="state.showReportTypePicker = true"
      />
      <van-popup v-model:show="state.showReportTypePicker" position="bottom">
        <van-picker
          :columns-field-names="reportTypeFieldName"
          :columns="reportTypes"
          @confirm="onConfirmReportType"
          @cancel="state.showReportTypePicker = false"
          :default-index="0"
        />
      </van-popup>
      <van-field
        name="remark"
        v-model="state.remark"
        rows="2"
        autosize
        label="备注（描述）"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <div style="margin: 36px 16px">
        <van-button round block type="primary" native-type="submit">
          主动申报
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Cascader, Popup, NumberKeyboard, Picker } from 'vant'
import { personInfoEffect } from './hooks/personInfoEffect'

export default defineComponent({
  name: 'PersonalReport',
  setup() {
    const {
      state,
      options,
      onFinish,
      onInput,
      onDelete,
      validatorIdCardMessage,
      validatorPhoneMessage,
      reportTypeFieldName,
      reportTypes,
      onConfirmReportType,
      onSubmit
    } = personInfoEffect()

    return {
      state,
      options,
      onFinish,
      onInput,
      onDelete,
      validatorIdCardMessage,
      validatorPhoneMessage,
      reportTypeFieldName,
      reportTypes,
      onConfirmReportType,
      onSubmit
    }
  },
  components: {
    [Cascader.name]: Cascader,
    [Popup.name]: Popup,
    [NumberKeyboard.name]: NumberKeyboard,
    [Picker.name]: Picker
  }
})
</script>

<style lang="scss" scoped>
.person-form {
  .form-head {
    line-height: 1.5;
    font-size: 32px;
    color: #333;
    padding: 28px 16px;
  }
  ::v-deep .van-cell {
    font-size: 16px;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  ::v-deep .van-cell__title {
    flex: none;
  }
}
</style>
