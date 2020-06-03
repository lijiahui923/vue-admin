import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("views/Login/Login.vue")
  },
  {
    path: "/main",
    name: "Main",
    hidden: false,
    redirect: "index",
    meta: {
      name: "控制台"
    },
    component: () => import("views/Layout/Layout.vue"),
    // 默认显示第一个名字要一致
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("views/Main/Main.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    hidden: false,
    meta: {
      name: "信息管理"
    },
    component: () => import("views/Layout/Layout.vue"),
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("views/News/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("views/News/InfoCategory/index.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hidden: false,
    meta: {
      name: "用户管理"
    },
    component: () => import("views/User/User.vue"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("views/User/User.vue")
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
