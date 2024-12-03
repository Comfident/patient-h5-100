// 表单校验
const mobileRules = [
  { required: true, message: '请输入手机号' },

  // 第一个为1，第二个为3到9之间任意一个数字，任意一个数字字符出现九次
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const passwordRules = [
  { required: true, message: '请输入密码' },

  // 匹配任意一个字母数字或下划线字符，等价于 [a-zA-Z0-9_]
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]

const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码为六位数字' }
]

export { mobileRules, passwordRules, codeRules }
