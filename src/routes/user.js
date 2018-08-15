import userController from '../controllers/UserController'
export default async router => {
  router.get('/login', userController.login)
  router.get('/aaaa', userController.login)
  /* 1判断是否登录 */
  // router.get('/', userController.indexPage)
  // /* 1登录 */
  // router.get('/api/login', userController.login)
  // router.get('/login', userController.login)
  // /* 1注册 */
  // router.post('/register', userController.register)
}
