import { createMemoryHistory, createRouter } from 'vue-router';

import index from '@/pages/index.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
