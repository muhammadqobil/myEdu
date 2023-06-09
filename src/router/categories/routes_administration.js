
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
      icon: 'fas fa-person-chalkboard',
      title: 'fp_captions.l_teachers',
      description: 'fp_captions.l_teachers',
    }
  },
  {
    path: 'week-days',
    name: 'week-days',
    component: () => import('pages/myEdu/PageWeekDays.vue'),
    meta: {
      icon: 'mdi-calendar-today',
      title: 'Hafta kunlari',
      description: 'fp_captions.l_teachers',
    }
  },
  {
    path: 'groups',
    name: 'groups',
    component: () => import('pages/myEdu/PageGroups.vue'),
    meta: {
      icon: 'mdi-account-group-outline',
      title: 'Guruhlar',
      description: 'fp_captions.l_teachers',
    }
  },
  {
    path: 'students',
    name: 'students',
    component: () => import('pages/myEdu/PageStudents.vue'),
    meta: {
      icon: 'mdi-account-school-outline',
      title: 'O\'quvchilar',
      description: 'O\'quvchilar',
    }
  },
]

const administration = {
  path: '/administration',
  name: 'administration',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'Boshqaruv',
    description: 'Boshqaruv',
    icon: 'mdi-bank',
  },
  children: modules
}

export default administration;
