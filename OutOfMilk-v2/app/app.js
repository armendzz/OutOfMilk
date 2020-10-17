import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import BackendService from "./services/backend-service";


const backendService = new BackendService();
Vue.prototype.$backendService = backendService;


Vue.use(RadSideDrawer);

Vue.config.silent = (TNS_ENV === 'production');



new Vue({
  render (h) {
      return h(
        App,
        [
          h(DrawerContent, { slot: 'drawerContent' }),
          h(Home, { slot: 'mainContent' }),
          h(Login, { slot: 'loginContent' }),
        ],
      )
    }
}).$start();

