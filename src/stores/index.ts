import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// pinia 实例创建
const pinia = createPinia()

// 持久化
pinia.use(persist)

// 导出
export default pinia
