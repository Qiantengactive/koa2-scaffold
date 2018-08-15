import jwt from 'jsonwebtoken'

export default async function(ctx, next) {
  const authorization = ctx.get('Authorization')
  if (!authorization) {
    ctx.throw(401, `no token detected in http header 'Authorization'`)
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    /* 验证token是否有效 */
    tokenContent = await jwt.verify(token, ctx.config.jwt.cert)
    /*
    登录的时候要授权
       var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn : 60*60*24// 授权时效24小时
        });
    */
  } catch (err) {
    /*  "err": {
      "name": "TokenExpiredError",
      "message": "jwt expired",   //  token过了有效期
      "expiredAt": "2016-11-07T03:31:25.000Z"
    }
    "err": {
    "name": "JsonWebTokenError",
    "message": "invalid token"  //  伪造/无效的token
  }
    */
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expried')
    }
    ctx.throw(401, 'invalid token')
  }
  ctx.token = tokenContent
  await next()
}
