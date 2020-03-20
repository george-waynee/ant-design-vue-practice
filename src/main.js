import Vue from "vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  notification,
  message
} from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 权限组件
import Authorized from "./components/Authorized.vue";
// 全局组件
Vue.component("Authorized", Authorized);

// 权限指令
import Auth from "./directives/auth";
Vue.use(Auth);

Vue.config.productionTip = false;

// 组件库的全局注册
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);

// 方法挂载到this里面
Vue.prototype.$Notification = notification;
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
