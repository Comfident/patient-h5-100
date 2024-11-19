import { ref } from 'vue'
import { defineStore } from 'pinia'
<<<<<<< Updated upstream
import type { User } from '../type/user'
=======
import type { User } from '../types/user'
>>>>>>> Stashed changes

export const useUserStore = defineStore(
	'cp-user',
	() => {
		// 存储当前用户状态
		const user = ref<User>()

		// 设置用户信息
		const setUser = (u: User) => {
			user.value = u
		}

		// 清空用户状态
		const delUser = () => {
			user.value = undefined
		}

		return { user, setUser, delUser }
	},
	// 持久化
	{
		persist: true
	}
)
