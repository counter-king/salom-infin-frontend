const MyActivities = [
  {
    path: 'my-activites',
    name: 'MyActivitiesIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'MyAttendanceIndex' },
    children: [
      {
        path: 'attendance',
        name: 'MyAttendanceIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/MyAttendance/index.vue'),
        redirect: { name: 'MyCalendar' },
        children: [
          {
            path: 'calendar',
            name: 'MyCalendar',
            meta: {
              isAuthRequired: true,
              navigation: true
            },
            component: () => import('../views/MyAttendance/Calendar.vue')
          },
          {
            path: 'table',
            name: 'MyTable',
            meta: {
              isAuthRequired: true,
              navigation: true
            },
            component: () => import('../views/MyAttendance/Table.vue')
          }
        ]
      },
      {
        path: 'applications',
        name: 'MyApplicationsIndex',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/MyApplications/index.vue')
      }
    ]
  }
]

export default MyActivities