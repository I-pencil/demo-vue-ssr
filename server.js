const config = require('./config')
const webpack = require('webpack')
const opn = require('opn')
const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const proxyMiddleware = require('http-proxy-middleware')

const outputPath = config.build.assetsRoot // /dist/ 这里和配置文件output路径一致

const resolve = file => path.resolve(__dirname, file)

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const { createBundleRenderer } = require('vue-server-renderer')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

const serverInfo = `express/${require('express/package.json').version}` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
let renderer
if (isProduction) {
  // In production: create server renderer using server bundle and index HTML
  // template from real fs.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundlePath = path.join(outputPath, 'vue-ssr-server-bundle.json')
  const bundle = require(bundlePath)
  // src/index.html is processed by html-webpack-plugin to inject
  // build assets and output as dist/index.html.
  tplPath = path.join(outputPath, 'index.html')
  const template = fs.readFileSync(resolve(tplPath), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  require('./build/dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

function createRenderer (bundle, template) {
  const clientManifestPath = path.join(outputPath, 'vue-ssr-client-manifest.json')
  const clientManifest = require(clientManifestPath)
  return createBundleRenderer(bundle, {
    template,
    clientManifest,
    runInNewContext: false, // 推荐
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const server = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProduction ? 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use('/dist', server('./dist', true))


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const date = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  // const errorHandler = err => {
  //   if (err && err.code === 404) {
  //     res.status(404).end('404 | Page Not Found')
  //   } else {
  //     // Render Error Page or Redirect
  //     res.status(500).end('500 | Internal Server Error')
  //     console.error(`error during render : ${req.url}`)
  //     console.error(err)
  //   }
  // }

  // renderer.renderToStream({ title: 'Vue SSR Demo', url: req.url })
  //   .on('error', errorHandler)
  //   .on('end', () => console.log(`whole request: ${Date.now() - date}ms`))
  //   .pipe(res)
  const context = { url: req.originalUrl }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})

app.listen(port)
