import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import hooks from '@/router/hooks';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
Object.keys(hooks).forEach(key => {
  router.beforeEach(hooks[key]);
});
export default router;
