const Attendance = [
  {
    path: 'attendance',
    name: 'AttendanceIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    redirect: { name: 'EmployeesAttendanceList' },
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'employees-attendance',
        name: 'EmployeesAttendanceList',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/List.vue'),
      },
      {
        path: 'work-schedule-settings',
        name: 'WorkScheduleSettings',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/WorkScheduleSettings/index.vue'),
      }
    ]
  }
]

export default Attendance
