type User = {
  // 令牌
  token: string

  // 用户ID
  id: string

  // 用户名
  account: string

  // 手机号
  mobile: string

  // 头像URL
  avatar: string
}

// CodeType 可选类型：登录、注册、改手机号、忘记密码、绑定手机号
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

export { User }
