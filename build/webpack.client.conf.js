const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const vueLoaderConfig = require('./vue-loader.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const clientWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: Infinity,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_nodules[\\/]/,
          priority: -10,
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  clientWebpackConfig.plugins.push(
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
        },
      },
    }),
  )
}

module.exports = clientWebpackConfig
