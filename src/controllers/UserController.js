import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import { createToken } from '../utils/index'
class UserController {
  // async userInfo (ctx, next) {
  //   if (Number(ctx.params.id) !== 1) {
  //     throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
  //   }
  //   ctx.body = { id: 1, name: 'twj', age: 18 }
  // }

  // async userList (ctx, next) {
  //   ctx.body = [{ name: 'twj0', age: 18 }, { name: 'twj1', age: 19 }]
  //   await next()
  // }
  // async login (ctx, next) {
  //   ctx.body = [{ name: 'twj0', age: 18 }, { name: 'twj1', age: 19 }]
  //   await next()
  // }
  async aaaaaa(ctx, next) {
    ctx.body = [{ name: 'twj0', age: 18 }, { name: 'twj1', age: 19 }]
    await next()
  }
  async indexPage(ctx, next) {
    // ctx.body = [{ name: 'aaaa1', age: 18 }, { name: 'aaaa2', age: 19 }]
    // 1.判断是否登录
    // 2如果token存在 跳转到主页
    // 3.不存在跳转到登录
    await next()
  }

  /* 登录 */
  async login(ctx, next) {
    let query = ctx.request.query
    // console.log(query)
    let password = query.password
    let username = query.username
    try {
      /* 查询数据库 登录成功 */
      // if(!user){
      //   ctx.status = 401;
      //   ctx.body={
      //     ok:false,
      //     message:'用户名错误'
      //   }
      // }
      // 匹配密码是否相等
      //  if (await bcrypt.compare(body.password, user.password)) {
      //   ctx.status = 200
      //   ctx.body = {
      //     message: '登录成功',
      //     user: user.userInfo,
      //     // 生成 token 返回给客户端
      //     token: jsonwebtoken.sign({
      //       data: user,
      //       // 设置 token 过期时间
      //       exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
      //     }, secret),
      //   }
      // } else {
      //   ctx.status = 401
      //   ctx.body = {
      //     message: '密码错误',
      //   }
      // }
    } catch (error) {
      // ctx.throw(500)
    }
    let userInfo = { username: 'zhangsan', password: 1111111 }
    let tokenInfo = await createToken(ctx, userInfo)
    ctx.body = [
      { ok: true, msg: '登录成功', token: tokenInfo }
    ]
    await next()
  }
  /* 注册 */
  async register(ctx, next) {}
}

export default new UserController()
