/*
 * @Description: 用于自定义webpack上面的配置
 * @Author: 志洪
 * @Date: 2020-03-13 17:37:04
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-21 16:55:27
 */
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // 通过约定俗成的，mock文件命名，和接口拦截实现mock数据的返回
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 清除缓存,防止下次加载同样的接口是使用缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
