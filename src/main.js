// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRouter from 'vue-router'
// import VueResource from './resource'
import VueResource from 'vue-resource'
import 'common/stylus/index'

// Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = '/root';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  VueResource,
  // VueRouter,
  components: { App },
  template: '<App/>'
});

router.push('/goods'); // 设置默认为/goods页面（router.go('')在此处无效）


