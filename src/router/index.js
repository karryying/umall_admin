import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

function valiRouter(path, next) {
  if (store.state.userInfo.menus_url.includes(path)) {
    next();
    return;
  }
  next("/");
}

Vue.use(Router)
export let indexRouter = [
  {
    path: "/menu",
    name: "菜单管理",
    component: () => import("../pages/menu/menu.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/menu", next);
    }

  },
  {
    path: "/role",
    name: "角色管理",
    component: () => import("../pages/role/role.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/role", next);
    }
  },
  {
    path: "/manager",
    name: "管理员管理",
    component: () => import("../pages/manager/manager.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/manager", next);
    }
  },
  {
    path: "/cate",
    name: "商品分类",
    component: () => import("../pages/cate/cate.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/cate", next);
    }
  },
  {
    path: "/specs",
    name: "商品规格",
    component: () => import("../pages/specs/specs.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/specs", next);
    }
  },
  {
    path: "/member",
    name: "会员管理",
    component: () => import("../pages/member/member.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/member", next);
    }
  },
  {
    path: "/banner",
    name: "轮播图管理",
    component: () => import("../pages/banner/banner.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/banner", next);
    }
  },
  {
    path: "/seckill",
    name: "秒杀活动",
    component: () => import("../pages/seckill/seckill.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/seckill", next);
    }
  },
  {
    path: "/goods",
    name: "商品管理",
    component: () => import("../pages/goods/goods.vue"),
    beforeEnter: (to, from, next) => {
      valiRouter("/goods", next);
    }
  }
]

let router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home.vue")
        },
        ...indexRouter
      ]
    }
  ]
})

// //进行拦截
router.beforeEach((to, from, next) => {
  //如果是去登录就不拦截
  //获取用户登录信息
  let isLogin = store.state.userInfo;
  if (to.path === "/login") {
    next();
    return;
  }

  console.log(isLogin);
  if (!isLogin.id) {
    next("/login");
    return;
  }
  next();
})


export default router
