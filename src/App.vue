<script setup lang="ts">
import { useUserStore } from './stores/user'

const store = useUserStore()
</script>

<template>
  <p>{{ store.user }}</p>
  <button
    @click="store.setUser({ id: '11', mobile: '12', account: '13', avatar: '14', token: '15' })"
  >
    登录
  </button>
  <button @click="store.delUser()">
    退出
  </button>
</template>
