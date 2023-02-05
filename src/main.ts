import './firebase';
import { createApp } from "vue";
import App from "./App.vue";
import './assets/tailwind.css';
import router from './router';
import { firebaseApp } from './firebase';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { VueFire, VueFireAuth } from 'vuefire';

const app = createApp(App);

app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(autoAnimatePlugin);

app.mount("#app");