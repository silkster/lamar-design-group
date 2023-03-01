import { createRouter, createWebHistory } from 'vue-router';
import Contact from '@/views/Contact.vue';
import Home from '@/views/Home.vue';

import namedRoutes from './namedRoutes.js';

export const routes = [
  {
    ...namedRoutes.home,
    component: Home,
    meta: {
      header: { isFixed: true },
    },
  },
  {
    ...namedRoutes.contact,
    component: Contact,
    meta: {
      logo: 'small',
      header: {
        isWhite: true,
      },
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
});

export default router;
