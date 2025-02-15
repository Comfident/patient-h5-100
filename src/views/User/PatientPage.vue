<script setup lang="ts">
  import { getPatientList } from '@/services/user'
  import type { PatientList } from '@/types/user'
  import { onMounted, ref } from 'vue'

  const list = ref<PatientList>([])
  const loadList = async () => {
    const res = await getPatientList()
    list.value = res.data
  }
  onMounted(() => {
    loadList()
  })

  // 默认选中女性
  const gender = ref(1)
  const options = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
  ]

  // 2. 打开侧滑栏
  const show = ref(false)
  const showPopup = () => {
    show.value = true
  }

  const hidePopup = () => {
    show.value = false
    console.log('quxiao')
  }
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in list"
        :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            <!-- 身份证脱敏处理 -->
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}
          </span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div
          class="tag"
          v-if="item.defaultFlag === 1">
          默认
        </div>
      </div>

      <div
        class="patient-add"
        v-if="list.length < 6"
        @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>

      <!-- 侧边栏 -->
      <van-popup
        v-model:show="show"
        position="right"
        close-icon-position="top-left">
        <cp-nav-bar
          :back="() => (show = false)"
          title="添加患者"
          right-text="保存"></cp-nav-bar>
        <van-form
          autocomplete="off"
          ref="form">
          <van-field
            label="真实姓名"
            placeholder="请输入真实姓名" />
          <van-field
            label="身份证号"
            placeholder="请输入身份证号" />
          <van-field
            label="性别"
            class="pb4">
            <!-- 单选按钮组件 -->
            <template #input>
              <cp-radio-btn :options="options"></cp-radio-btn>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox
                :icon-size="18"
                round />
            </template>
          </van-field>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .patient-page {
    // 46
    padding: 0px 0 80px;
    :deep() {
      .van-popup {
        width: 100%;
        height: 100%;
        // 46
        padding-top: 0px;
        box-sizing: border-box;
      }
    }
  }

  .patient-list {
    padding: 15px;
  }
  .patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;
    .info {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      span {
        color: var(--cp-tip);
        margin-right: 20px;
        line-height: 30px;
        &.name {
          font-size: 16px;
          color: var(--cp-text1);
          width: 80px;
          margin-right: 0;
        }
        &.id {
          color: var(--cp-text2);
          width: 180px;
        }
      }
    }
    .icon {
      color: var(--cp-tag);
      width: 20px;
      text-align: center;
    }
    .tag {
      position: absolute;
      right: 60px;
      top: 21px;
      width: 30px;
      height: 16px;
      font-size: 10px;
      color: #fff;
      background-color: var(--cp-primary);
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.selected {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
      .icon {
        color: var(--cp-primary);
      }
    }
  }
  .patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;
    .cp-icon {
      font-size: 24px;
    }
  }
  .patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
  }
  .pb4 {
    padding-bottom: 4px;
  }
</style>
