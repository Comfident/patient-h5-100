import type { CodeType, User, UserInfo, PatientList } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request('/code', 'GET', { mobile, type })
}

// 手机号登陆
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}

// 获取个人信息
export const getUserInfo = () => request<UserInfo>('/patient/myUser', 'GET')

// 获患者信息列表
export const getPatientList = () =>
  request<PatientList>('/patient/mylist', 'GET')
