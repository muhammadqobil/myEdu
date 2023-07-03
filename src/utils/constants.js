export const cfghttp = {
  // BASE_URL: process.env.NODE_ENV === 'production' ? 'api' : 'http://192.168.0.109:8081/api/v1',
  BASE_URL: process.env.NODE_ENV === 'production' ? 'api' : 'http://192.168.48.32:8081/api/v1',
  // BASE_URL: process.env.NODE_ENV === 'production' ? 'api' : 'http://localhost:8081/api/v1',
  BASE_URL_RESOURCE: process.env.NODE_ENV === 'production' ? 'api' : 'http://192.168.48.32:8081/api',
  BASE_TIMEOUT: 20 * 1000,
  UPLOAD_TIMEOUT: 2 * 60 * 1000
}

export const urls = {
  LOGIN: "/home/login",
  BRANCHES: "/admin/branches",
  TEST: "/home/test",
  ROOMS: "/admin/rooms",
  USERS: "/admin/users",
  ROLES: "/admin/roles",
  SUBJECTS: "/admin/subjects",
  TEACHERS: "/admin/teachers",
  WEEK_DAYS: "/admin/weekdays",
  GROUPS: "/admin/groups",
  STUDENTS: "/admin/students",
  ATTENDANCES: "/admin/attendances",
}
