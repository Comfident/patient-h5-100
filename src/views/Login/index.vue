<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
  import {
    loginByPassword,
    sendMobileCode,
    loginByMobile
  } from '@/services/user'
  import { useUserStore } from '@/stores'
  import { onUnmounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

  const route = useRoute()
  const router = useRouter()
  const store = useUserStore()
  const isPass = ref(true)
  const show = ref(true)
  const agree = ref(false)
  const code = ref('')
  const password = ref('')
  const mobile = ref('')
  // 表单提交
  const login = async () => {
    if (!agree.value) {
      return showToast('请勾选我已同意')
    }
    // 验证完毕，进行登录

    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await loginByMobile(mobile.value, code.value)
    store.setUser(res.data)
    router.push((route.query.returnUrl as string) || '/user')
    showToast('登陆成功')
  }

  // --------------------- 发送验证码模块 -------------------------
  // 倒计时
  const time = ref(0)

  // 计时器id
  let timeId: number

  // form表单实例，undefined
  const form = ref<FormInstance>()
  // 发送验证码
  const send = async () => {
    // 超时直接返回
    if (time.value > 0) {
      return
    }

    // 用表单实例对mobile表单进行验证
    await form.value?.validate('mobile')

    // 发送验证码
    console.log(mobile.value)

    const res = await sendMobileCode(mobile.value, 'login')

    showSuccessToast(`发送成功，验证码为${res.data.code}`)
    console.log(res.data.code)

    // 倒计时
    time.value = 60

    clearInterval(timeId)
    setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timeId)
    }, 1000)
  }

  onUnmounted(() => {
    clearInterval(timeId)
  })
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航栏 -->
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"></cp-nav-bar>

    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a
        href="javascript:;"
        @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form
      autocomplete="off"
      @submit="login">
      <!-- 手机号：共用部分 -->
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"></van-field>

      <!-- 密码 -->
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'">
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-else
        v-model="code"
        :rules="codeRules"
        placeholder="短信验证码">
        <!-- 名为button的插槽 -->
        <template #button>
          <span
            class="btn-send"
            :class="{ active: time > 0 }"
            @click="send">
            {{ time > 0 ? `还有${time}秒后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>

      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button
          block
          round
          type="primary"
          native-type="submit">
          登 录
        </van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img
          src="@/assets/qq.svg"
          alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    &-page {
      padding-top: 0px;

      // 原先顶部距离46px，可能暂时设置
      // padding-top: 46px;
    }
    &-head {
      display: flex;
      padding: 30px 30px 50px;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 1;
      h3 {
        font-weight: normal;
        font-size: 24px;
      }
      a {
        font-size: 15px;
      }
    }
    &-other {
      margin-top: 60px;
      padding: 0 30px;
      .icon {
        display: flex;
        justify-content: center;
        img {
          width: 36px;
          height: 36px;
          padding: 4px;
        }
      }
    }
  }
  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      line-height: 24px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
    .btn-send {
      color: var(--cp-primary);
      &.active {
        color: rgba(22, 194, 163, 0.5);
      }
    }
  }
</style>
