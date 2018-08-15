export default {
  env: 'development',
  debug: true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/ocean',
    opts: {
      user: '',
      pass: ''
    }
  },
  jwt: {
    cert: 'koa2System',
    content: 'qianteng'
  }
}
/*
content // 要生成token的主题信息
根据 用户名 密码生成
cert // 这是加密的key（密钥）
*/
