import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import Area from '@/utils/area'
import { validateIdCard } from '@/utils/idcard'
import {  submitPersonReportInfo } from '@/api'

export const personInfoEffect = () => {
  const router = useRouter()
  const state = reactive({
    show: false,
    numberKeyboardShow: false,
    showReportTypePicker: false,
    username: '',
    idcard: '',
    phone: '',
    area: '',
    areaCode: '',
    addr: '',
    reportType: '',
    remark: ''
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

  const reportTypeFieldName = { text: 'text', values: 'value' }
  const reportTypes = [
    '宣恩本地（无明确接触）',
    '宣恩本地（有明确接触）',
    '外地来宣（无明确接触）',
    '外地来宣（有明确接触）'
  ]
  state.reportType = reportTypes[0]

  const onConfirmReportType = (value: any) => {
    console.log(value)
    state.reportType = value
    state.showReportTypePicker = false
  }

  const onSubmit = async (values: any) => {
    const toast = Toast.loading({
      message: '上传中...',
      forbidClick: true
    })
    await submitPersonReportInfo({ ...values })
    toast.clear()
    router.push({ path: '/report-success' })
  }

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
}
