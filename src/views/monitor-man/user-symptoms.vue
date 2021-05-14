<template>
  <div class="sym-form">
    <div class="head">
      <div>今日：{{ state.time }}</div>
      <div></div>
    </div>
    <div class="van-hairline--bottom"></div>
    <div class="form">
      <van-form scroll-to-error @submit="onSubmit">
        <van-cell-group title="体温检测">
          <van-field
            name="mbtp"
            v-model="state.mbtp"
            type="number"
            label="早（℃）"
            placeholder="请输入"
            :rules="[{ validator: validatorbtpMessage }]"
          ></van-field>
          <van-field
            name="nbtp"
            v-model="state.nbtp"
            type="number"
            label="晚（℃）"
            placeholder="请输入"
            :rules="[{ validator: validatorbtpMessage }]"
          ></van-field>
        </van-cell-group>
        <van-cell-group title="是否有以下临床表现：">
          <van-field name="symChecked">
            <template #input>
              <van-radio-group
                v-model="state.symChecked"
                @change="symCheckedChange"
              >
                <van-radio name="无">无</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="symGroup">
            <template #input>
              <van-checkbox-group
                v-model="state.symGroupChecked"
                @change="symGroupChange"
              >
                <van-checkbox name="发热" shape="square">发热</van-checkbox>
                <van-checkbox name="乏力" shape="square">乏力</van-checkbox>
                <van-checkbox name="胸闷" shape="square">胸闷</van-checkbox>
                <van-checkbox name="轻度纳差" shape="square"
                  >轻度纳差</van-checkbox
                >
                <van-checkbox name="恶心呕吐" shape="square"
                  >恶心呕吐</van-checkbox
                >
                <van-checkbox name="头疼" shape="square">头疼</van-checkbox>
                <van-checkbox name="结膜炎" shape="square">结膜炎</van-checkbox>
                <van-checkbox name="咳嗽" shape="square">咳嗽</van-checkbox>
                <van-checkbox name="咽痛" shape="square">咽痛</van-checkbox>
                <van-checkbox name="呼吸困难" shape="square"
                  >呼吸困难</van-checkbox
                >
                <van-checkbox name="精神稍差" shape="square"
                  >精神稍差</van-checkbox
                >
                <van-checkbox name="腹泻" shape="square">腹泻</van-checkbox>
                <van-checkbox name="心慌" shape="square">心慌</van-checkbox>
                <van-checkbox name="轻度四肢或腰背部肌肉酸痛" shape="square"
                  >轻度四肢或腰背部肌肉酸痛</van-checkbox
                >
                <van-checkbox name="其他不适" shape="square"
                  >其他不适</van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 36px 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSymEffect } from './hooks/userSymEffect'

export default defineComponent({
  name: 'MointorUserSym',
  setup() {
    const {
      state,
      validatorbtpMessage,
      symGroupChange,
      symCheckedChange,
      onSubmit
    } = userSymEffect()
    return {
      state,
      validatorbtpMessage,
      symGroupChange,
      symCheckedChange,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.sym-form {
  .head {
    display: flex;
    justify-content: space-between;
    padding: 20px 12px;
    line-height: 1.5;
  }
  ::v-deep .van-cell-group__title {
    background-color: #9697990f;
  }
  ::v-deep .van-cell {
    font-size: 16px;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  ::v-deep .van-checkbox {
    padding: 6px 0;
  }
}
</style>
