import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../views/Store.vue";
import Items from "../views/Items.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";


Vue.use(VueRouter);
// eslint-disable-next-line

const routes = [
  {
    path: "/",
    name: "App",
    meta: {
      requiresVisitor: false,
    },

    beforeEnter(to, from, next) {
      let isLogged = new Boolean();
      if (localStorage.getItem("user_access_token") === null) {
        isLogged = false;
      } else {
        isLogged = true;
      }
      if (isLogged) {
        next("/store");
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
    meta: {
      requiresVisitor: false,
    },

  },

  {
    path: "/store/:id",
    name: "Items",
    component: Items,
    meta: {
      requiresVisitor: false,
    },
 
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresVisitor: false,
    },
 
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },

  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  
  },
  {
    path: "*",
    beforeEnter(to, from, next) {
      let isLogged = new Boolean();
      if (localStorage.getItem("user_access_token") === null) {
        isLogged = false;
      } else {
        isLogged = true;
      }
      if (isLogged) {
        next("/store");
      } else {
        next("/login");
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let isLogged = new Boolean();
  if (localStorage.getItem("user_access_token") === null) {
    isLogged = false;
  } else {
    isLogged = true;
  }

  if (isLogged) {
    if (to.meta.requiresVisitor) {
      next("/store");
    } else {
      next();
    }
    next();
  } else {
    if (to.meta.requiresVisitor) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
