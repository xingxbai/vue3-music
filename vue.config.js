// module.exports = {
//   lintOnSave: false,
//   devServer: {
//     overlay: {
//       warning: false,
//       errors: false
//     }
//   }
// }


// const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "./src/assets/scss/variable.scss";
          @import "./src/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    // before(app) {
    //   registerRouter(app)
    // },
    overlay: {
      warning: false,
      errors: false
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/',
  lintOnSave: false,
}
