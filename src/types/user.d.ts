export type User = {
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
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// user页面的个人信息：
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  // 订单信息
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}
