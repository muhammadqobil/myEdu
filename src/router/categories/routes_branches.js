const modules = [
  {
    path: 'branches',
    name: 'branches',
    component: () => import('pages/myEdu/PageBranches.vue'),
    meta: {
      icon: 'mdi-bank',
      title: 'modules.branchs',
      description: 'modules.branchs_description',
    }
  },
  {
    path: 'rooms',
    name: 'rooms',
    component: () => import('pages/myEdu/PageRooms.vue'),
    meta: {
      icon: 'mdi-bank',
      title: 'Xonalar',
      description: 'Xonalar',
    }
  }
]

const branches = {
  path: '/branches',
  name: 'branches',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'modules.c_managing',
    description: 'modules.c_admining_desc',
    icon: 'mdi-bank',
  },
  children: modules
}

export default branches;
