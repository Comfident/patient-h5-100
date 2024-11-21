import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// pinia 实例创建
const pinia = createPinia()

// 持久化
pinia.use(persist)

// 导出pinia
export default pinia

// 导出user
export * from './modules/user'
