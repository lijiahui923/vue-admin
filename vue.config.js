/* eslint-disable no-unused-vars */
const path = require("path");
module.exports = {
  //基本路径
  // publicPath: "/",
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  /**
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: config => {
    // 修复HMR
    //config.resolve.symlinks(true)
    //const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    //types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  configureWebpack: config => {
    config.resolve = {
      // 配置解析别名
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        components: path.resolve(__dirname, "./src/components"),
        utils: path.resolve(__dirname, "./src/utils"),
        common: path.resolve(__dirname, "./src/common"),
        api: path.resolve(__dirname, "./src/api"),
        router: path.resolve(__dirname, "./src/router"),
        views: path.resolve(__dirname, "./src/views"),
        data: path.resolve(__dirname, "./src/data"),
        styles: path.resolve(__dirname, "./src/styles"),
        public: path.resolve(__dirname, "public")
      }
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/main.scss";`
      }
    }
    // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: true
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      // 设置代理
      "/devapi": {
        target: "http://www.web-jshtml.cn/productapi", //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/devapi": ""
        }
      }
    },
    before: app => {}
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
};
