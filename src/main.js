import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import './style/global.css';
import Vue3TouchEvents from 'vue3-touch-events';

sync(store, router);

createApp(App).use(Vue3TouchEvents).use(store).use(router).mount('#app');
