const modules = [
  {
    path: 'administration',
    name: 'administration',
    component: () => import('pages/myEdu/PageAttendanceReports.vue'),
    meta: {
      icon: 'mdi-file-document-multiple-outline',
      title: 'Davimat hisoboti',
      description: 'fp_captions.l_teachers',
    }
  },
]

const report = {
  path: '/report',
  name: 'report',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'Hisobotlar',
    description: 'Hisobotlar',
    icon: 'mdi-clipboard-file-outline',
  },
  children: modules
}

export default report;
