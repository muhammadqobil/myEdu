const modules = [
  {
    path: 'branches',
    name: 'branches',
    component: () => import('pages/myEdu/PageBranches.vue'),
    meta: {
      icon: 'mdi-bank',
      title: 'Профиль "Налогоплательщик"',
      description: 'modules.users_description',
    }
  }
]

const branches = {
  path: '/branches',
  name: 'branches',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'modules.c_admining',
    description: 'modules.c_admining_desc',
    icon: 'mdi-bank',
  },
  children: modules
}

export default branches;
