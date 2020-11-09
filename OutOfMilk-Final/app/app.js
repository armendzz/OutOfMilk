import Vue from "nativescript-vue";
import RadListView from 'nativescript-ui-listview/vue'

import Home from "./components/Home";
Vue.use(RadListView);
new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
