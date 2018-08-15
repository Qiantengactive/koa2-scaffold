import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import convert from 'koa-convert'
import koaStatic from 'koa-static'
import cors from 'koa-cors'
import path from 'path'
import router from './router'
import mongoose from 'mongoose'
import jwtKoa from 'koa-jwt'

import config from './config'
import respondFormatter from './middlewares/respondFormatter'
import middlewares from './middlewares/index'
let secret = config.jwt.cert

const app = new Koa()

// mongoose.Promise = global.Promise
// mongoose.connect(config.mongoConfig.url, {
//   useMongoClient: true
// })
/*
app.keys=
设置cookie的键
*/
app.keys = ['ocean-domon']
/*
  app.context是ctx的来源。你可以使用app.context添加额外的属性到ctx。
  这对于创建跨越整个app应用的属性或者方法来说是有用的，而且性能更好
*/
app.context.config = config
/* 跨域版本用的是第一代 应该升级到koa2-cors */
app
  .use(
    cors({
      maxAge: 7 * 24 * 60 * 60,
      credentials: true,
      methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
      headers: 'Content-Type, Accept, Authorization'
    })
  )

  .use(logger())
  .use(bodyParser())
  /*
如果想要继续使用<code>function*</code>语法，
可以使用 <code>koa-convert</code> 这个中间件进行转换
*/
  .use(convert(session(app)))
  .use(koaStatic(path.join(__dirname, '/public')))
  .use(respondFormatter('^/api')) // 仅格式化api开头的地址输出
  .use(
    jwtKoa({ secret }).unless({
      path: [/\/register/, /\/login/,/\/public/] // 数组中的路径不需要通过jwt验证
    })
  )
  // .use(middlewares.verifyToken)
  .use(router.routes())
  .use(router.allowedMethods())
/*
allowedMethods处理的业务是当所有路由中间件执行完成之后,
若ctx.status为空或者404的时候,丰富response对象的header头.
 */
export default app
