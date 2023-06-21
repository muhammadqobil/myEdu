const modules = [
  {
    path: 'administration',
    name: 'administration',
    component: () => import('pages/myEdu/PageAdministration.vue'),
    meta: {
      icon: 'mdi-account-star-outline',
      title: 'Qabulxona',
      description: 'fp_captions.l_teachers',
    }
  },
]

const branches = {
  path: '/week-days-controller',
  name: 'week-days-controller',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'Monitoring',
    description: 'Monitoring',
    icon: 'mdi-bank',
  },
  children: modules
}

export default branches;
