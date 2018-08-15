/* 创建token */
import jwt from 'jsonwebtoken'
/**
 * 
 * @param {*} ctx 
 * @param {*} userInfo  {username:'zhangsan',password:1111111}
 */
export let createToken = async (ctx, userInfo) => {
  // 为方便测试，有效期设置为 10s 进行监测，普通生产情况下可以设置为更长的时间
  let secret = ctx.config.jwt.cert // 这是加密的key（密钥）
  let token = jwt.sign(
    {
      userInfo: userInfo
    },
    secret,
    { expiresIn: 60 * 60 * 24 }
  ) // 24小时过期
  console.log('token ：' + token)
  return token
}

export let checkToken = async (ctx, name) => {
  const authorization = ctx.get('Authorization')
  if (!authorization) {
    ctx.throw(401, `no token detected in http header 'Authorization'`)
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    /* 验证token是否有效 */
    tokenContent = await jwt.verify(token, ctx.config.jwt.cert)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expried')
    }
    ctx.throw(401, 'invalid token')
  }
  ctx.checkToken = tokenContent
}
