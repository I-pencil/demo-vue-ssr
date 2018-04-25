const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const vueLoaderConfig = require('./vue-loader.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const clientWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  clientWebpackConfig.plugins.push(
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  )
}

module.exports = clientWebpackConfig;
