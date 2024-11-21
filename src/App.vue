<script setup lang="ts">
  import { Button } from 'vant'
  import type { User } from '@/types/user'
  import { request } from '@/utils/request'
  import { useUserStore } from '@/stores/index'

  const store = useUserStore()
  const getUserInfo = async () => {
    const res = await request('/patient/myUser', 'get')
    console.log('getUserInfo')
    console.log(res)
  }


  const login = async () => {
    const res = await request<User>('/login/password', 'post', {
      // 测试手机号与密码
      mobile: '13211112222',
      password: 'abc12345'
    })

    // 这里需要 <User> 的类型断言，否则有语法错误
    store.setUser(res.data)
  }
</script>

<template>
  <Button @click="login">登录</Button>
  <Button @click="getUserInfo">获取用户信息</Button>
  <p>{{ store.$state }}</p>
</template>
