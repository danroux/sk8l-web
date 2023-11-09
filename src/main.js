// npm install vue
// <script src="https://cdn.jsdelivr.net/npm/vue@3.3/dist/vue.global.js"></script>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
