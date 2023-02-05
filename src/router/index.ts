import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: { requiresAuth: true },
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      meta: { requiresAuth: false },
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        path: '/login',
      };
    }
  }
});

export default router;