import routesLoader from '../utils/routesLoader'

export default router => {
  routesLoader(`${__dirname}`).then(routersList => {
    routersList.forEach(initRouter => {
      initRouter.default(router)
    })
  })
}
