import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// import { loadMicroApp } from 'qiankun';
// registerMicroApps([
//   {
//     name: 'react-app', // app name registered
//     entry: '//127.0.0.1:7001/childApp',
//     container: '#yourContainer',
//     activeRule: '/yourActiveRule',
//   },
//   //   {
//   //     name: 'vue app',
//   //     entry: { scripts: ['//localhost:7100/main.js'] },
//   //     container: '#yourContainer2',
//   //     activeRule: '/yourActiveRule2',
//   //   },
// ]);
// start();
