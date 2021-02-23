const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new StylelintPlugin({
      fix: true
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      },
      {
        reload: true,
        watch: true
      }
    ),
  ],
})
