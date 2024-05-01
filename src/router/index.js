// npm install vue-router
// <!-- https://www.jsdelivr.com/package/npm/vue-router -->
// <script src="https://cdn.jsdelivr.net/npm/vue-router@4.2/dist/vue-router.global.min.js"></script>
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import JobPodListView from '../views/JobPodListView.vue';
import JobListView from '../views/JobListView.vue';
import CronJob from '../components/CronJob.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/jobs/:namespace',
    component: JobListView,
    name: 'jobList',
  },
  {
    path: '/cronjob/:namespace/:name',
    component: CronJob,
    props: true,
    name: 'cronDetails',
  },
  {
    path: '/cronjob/:namespace/:cronjobName/pods/', component: JobPodListView, props: true, name: 'jobPodList',
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   component: NotFoundComponent
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
