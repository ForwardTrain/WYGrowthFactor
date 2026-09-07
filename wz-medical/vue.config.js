const { defineConfig } = require('@vue/cli-service')
const path = require('path');//引入path模块

function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // 从 Vue CLI3.3 起已弃用，请使用publicPath
  // publicPath: 'http://127.0.0.1:8088', // 从 Vue CLI3.3 起已弃用，请使用publicPath
  outputDir: 'dist',
  lintOnSave: false,// 是否在保存的时候检查
  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   proxy: {},
  //   ...config.devServer,
  //   open: true, //运行打开浏览器
  // },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    proxy: {
      //配置自动启动浏览器
      "/WZGrowth": {
        
        target: "http://47.96.252.134:3093",
        // target: "http://47.96.252.134:3093",
        // target: "http://47.83.173.79:3093",
        // target: "http://192.168.1.5:8082",
        // target: "http://192.168.10.54:8082",
        // target: "https://old-rockets-return.loca.lt",
        changeOrigin: true,
        secure: false,
        // pathRewrite: {   //路径重写
        //   '^/HealthyMnHt':''          
        // },
      },
      '/api': {
        target: 'https://www.uniprot.org', // 目标跨域服务器
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },

      
      // "/ZDSchoolManager": {
      //   target: "http://192.168.31.54:8082",// 星
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
    open: true, //运x行打开浏览器
  },
  pluginOptions:{
    'style-resources-loader':{
      preProcessor:'scss',
      patterns:[]
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      // .set("base", resolve("baseConfig"))
      // .set("public", resolve("public"));
  },
})