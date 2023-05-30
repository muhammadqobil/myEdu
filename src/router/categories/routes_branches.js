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
      icon: 'mdi-home-edit-outline',
      title: 'fp_captions.l_rooms',
      description: 'fp_captions.l_rooms',
    }
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('pages/myEdu/PageUsers.vue'),
    meta: {
      icon: 'mdi-account-group',
      title: 'fp_captions.l_users',
      description: 'fp_captions.l_users',
    }
  },
  {
    path: 'subjects',
    name: 'subjects',
    component: () => import('pages/myEdu/PageSubjects.vue'),
    meta: {
      icon: 'mdi-book-open-variant',
      title: 'fp_captions.l_subjects',
      description: 'fp_captions.l_subjects',
    }
  },
  {
    path: 'teachers',
    name: 'teachers',
    component: () => import('pages/myEdu/PageTeachers.vue'),
    meta: {
      icon: 'mdi-account-tie-hat',
      title: 'fp_captions.l_teachers',
      description: 'fp_captions.l_teachers',
    }
  },
  {
    path: 'week-days',
    name: 'week-days',
    component: () => import('pages/myEdu/PageWeekDays.vue'),
    meta: {
      icon: 'mdi-account-tie-hat',
      title: 'Hafta kunlari',
      description: 'fp_captions.l_teachers',
    }
  },
  {
    path: 'groups',
    name: 'groups',
    component: () => import('pages/myEdu/PageGroups.vue'),
    meta: {
      icon: 'mdi-account-tie-hat',
      title: 'Guruhlar',
      description: 'fp_captions.l_teachers',
    }
  },

]

const branches = {
  path: '/week-days-controller',
  name: 'week-days-controller',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'modules.c_managing',
    description: 'modules.c_admining_desc',
    icon: 'mdi-bank',
  },
  children: modules
}

export default branches;
