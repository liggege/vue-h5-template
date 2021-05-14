<template>
  <div class="user-form" style="margin: 6px">
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
      <div style="margin: 36px 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Cascader, Popup, NumberKeyboard } from 'vant'
import Area from '@/utils/area'
import { validateIdCard } from '@/utils/idcard'

export default defineComponent({
  name: 'MonitorUser',
  setup() {
    const router = useRouter()
    const store = useStore()
    const userInfo = { ...store.state.monitorUser.userInfo }

    const state = reactive({
      show: false,
      numberKeyboardShow: false,
      username: userInfo.username || '',
      idcard: userInfo.idcard || '',
      phone: userInfo.phone || '',
      area: userInfo.area || '',
      areaCode: userInfo.areaCode || '',
      addr: userInfo.addr || ''
    })
    // 选项列表，children 代表子选项，支持多级嵌套
    const options = Area
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({
      value,
      selectedOptions
    }: {
      value: string
      selectedOptions: Array<{ text: string; value: string }>
    }) => {
      state.show = false
      state.area = selectedOptions.map(option => option.text).join('/')
    }

    const onInput = (key: string) => {
      state.idcard = `${state.idcard}${key}`
    }

    const onDelete = () => {
      const oldVal = `${state.idcard}`
      state.idcard = oldVal.substr(0, oldVal.length - 1)
    }

    const validatorIdCardMessage = (val: string) => {
      if (val === '') {
        return '请填写身份证号码'
      } else if (!validateIdCard(val)) {
        return '身份证号码格式错误'
      }
    }

    const validatorPhoneMessage = (val: string) => {
      if (val === '') {
        return '请填写手机号码'
      } else if (!/^1[0-9]{10}$/.test(val)) {
        return '手机号码格式错误'
      }
    }

    const onSubmit = (values: any) => {
      const { username, idcard, phone, area, areaCode, addr } = { ...state }
      store.commit('monitorUser/SET_USER_INFO', {
        username,
        idcard,
        phone,
        area,
        areaCode,
        addr
      })
      router.push({
        path: '/monitor-user-sym'
      })
    }

    return {
      state,
      options,
      onFinish,
      onInput,
      onDelete,
      validatorIdCardMessage,
      validatorPhoneMessage,
      onSubmit
    }
  },
  components: {
    [Cascader.name]: Cascader,
    [Popup.name]: Popup,
    [NumberKeyboard.name]: NumberKeyboard
  }
})
</script>
<style lang="scss">
.user-form {
  .form-head {
    line-height: 1.5;
    font-size: 34px;
    color: #333;
    padding: 28px 16px;
  }
  .van-cell {
    font-size: 16px;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  .van-cell__title {
    flex: none;
  }
}
</style>
