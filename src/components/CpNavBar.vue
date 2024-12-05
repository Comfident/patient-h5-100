<script setup lang="ts">
import { useRouter } from 'vue-router';

  const router = useRouter()

  const onClickLeft = () => {
    if (history.state?.back) {
      router.back()
    } else {
      router.push('/')
    }
  }

  defineProps<{
    title?: string,
    rightText?: string
  }>()

  const emit = defineEmits<{
    'click-right': []
  }>()

  const onClickRight = () => {
    emit('click-right')
  }
</script>
<template>
  <!-- 中间的title文字是由父组件传来的，title前别忘了冒号 -->
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight" />
</template>

<style lang="scss" scoped>
  :deep() {
    .van-nav-bar {
      // 箭头样式
      &__arrow {
        font-size: 18px;
        color: var(--cp-text1);
      }

      // 调节bar字大小
      &__text {
        font-size: 15px;
      }
    }
  }
</style>


