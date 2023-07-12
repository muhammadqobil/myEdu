import {branches , report} from "src/router/categories";
import administration from "./categories/routes_administration";
const routes = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  {
    path: '',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {path: '/login', name: 'login', component: () => import('pages/LoginPage.vue')},
    ]
  },
  administration,
  branches,
  report,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
