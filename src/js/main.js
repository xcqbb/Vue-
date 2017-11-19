import Vue from 'vue';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Common from '../component/common';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';
import VueRouter from 'vue-router';
// 这个axios 如果在这导入，那么其他的模块想要使用 还要重新导入
import axios from 'axios';
// 为了解决这个问题 把axios对象添加到Vue的原型中去，那么其他模块也可以用这个 axios对象了
Vue.prototype.axios = axios;



// mint-ui vue-router 都是vue的插件所有的vue插件都要用use方法启用，如果不是vue插件那就不用了
Vue.use(MintUi);
Vue.use(Common);
Vue.use(VueRouter);

// 导入跟组件
import AppComponent from '../component/App.vue';
// 导入路由配置对象
import routerConfig from '../component/router/index.js'
console.log(routerConfig);

new Vue({
    el: '#app',
    render(createNode) {
        return createNode(AppComponent);
    },
    // 本来应该在这 写router: new VueRouter({}) 配置项的但是模块化开发，为了能够简洁一些还是放在router文件夹下的index.js下
    router: new VueRouter(routerConfig)
});