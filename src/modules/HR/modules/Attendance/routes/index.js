const Attendance = [
  {
    path: 'attendance',
    name: 'AttendanceIndex',
    meta: {
      isAuthRequired: true,
    },
    component: () => import('../views/index.vue')
  }
]

export default Attendance
