import path from 'path'
import dev from './dev'
import merge from 'lodash/merge'

const serverRoot = path.dirname(__dirname)
const root = path.resolve(serverRoot, '../')
const staticDir = path.join(root, 'static')
let config = {
  app: {
    name: 'koa2 Demo',
    port: 3000
  },
  debug: false,
  env: 'production',
  mongoConfig: {
    url: 'mongodb://localhost:27017/ocean',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'koa2System'
  },
  dir: {
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}
config = merge(config, process.env.NODE_ENV === 'development'
  ? dev
  : require('./private.js'))

export default config
