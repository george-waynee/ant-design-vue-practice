import Vue from "vue";
import VueRouter from "vue-router";
// 404组件
import NotFound from "../views/404.vue";
// 403组件
import Forbidden from "../views/403.vue";
// 进度条
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import findLast from "lodash/findLast";
// 权限验证
import { check, isLogin } from "../utils/auth.js";
// 提示框
import { notification } from "ant-design-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    redirect: "/user/login",
    children: [
      // 登录
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      // 注册
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      },
      {
        path: "/user/register-result",
        meta: {
          title: "注册结果"
        },
        name: "register.result",
        component: () =>
          import(
            /* webpackChunkName: "user" */
            "../views/User/RegisterResult.vue"
          )
      }
    ]
  },
  {
    path: "/",
    meta: {
      authority: ["user", "admin"]
    },
    redirect: { name: "analysis" }
  },
  // dashboard
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      icon: "dashboard",
      title: "仪表盘",
      authority: ["admin"]
    },
    redirect: { name: "analysis" },
    component: () =>
      // webpackChunkName用来将打包分类，合并包的作用
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/dashboard/analysis",
        name: "analysis",
        meta: {
          title: "分析页"
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
          )
      }
    ]
  },
  // form
  {
    path: "/form",
    name: "form",
    meta: {
      icon: "form",
      title: "表单"
      // authority: ["admin"]
    },
    redirect: { name: "basicform" },
    component: () =>
      // webpackChunkName用来将打包分类，合并包的作用
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/form/basic-form",
        name: "basicform",
        meta: {
          title: "基础表单"
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue")
      },
      {
        path: "/step-form",
        name: "stepform",
        hideChildrenInMenu: true,
        meta: {
          title: "分布表单"
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
        redirect: "/form/step-form/info",
        children: [
          {
            path: "/form/step-form/info",
            hideInMenu: true,
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"
              )
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"
              )
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"
              )
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 前置钩子
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员"
      });
      next({
        path: "/403"
      });
    }
  }
  next();
});

// 后置钩子
router.afterEach(() => {
  NProgress.done();
});

export default router;
