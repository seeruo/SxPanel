// vue.config.js
const path = require('path')

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/color.less'),
            ],
        })
}
// 设置静态路径解析
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        // 加载less解析
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        // key,value自行定义，比如.set('@@', resolve('src/components'))
        config.resolve.alias.set('@static', resolve('./public/static'))
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: 'http://api.saas.com'
        // disableHostCheck: true,
        // proxy: proxyObj,
        // before: app => {}
    }
}