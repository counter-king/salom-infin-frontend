const LeaderPanel = [
  {
    path: 'leader-panel',
    name: 'LeaderPanelIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'LeaderPanelMainIndex' },
    children: [
      {
        path: 'employee',
        name: 'LeaderPanelMainIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/AttendanceEmployee/index.vue'),
        redirect: { name: 'AttendanceEmployee' },
        children : [
          {
            path: 'attendance',
            name: 'AttendanceEmployee',
            meta: {
              isAuthRequired: true,
            },
            component: () => import('../views/AttendanceEmployee/WithReasonList.vue'),
          },
          {
            path: 'absence',
            name: 'AbsenceEmployee',
            meta: {
              isAuthRequired: true,
            },
            component: () => import('../views/AttendanceEmployee/NoReasonList.vue'),
          }
        ]
      },
      {
        path: 'employees-timesheet',
        name: 'EmployeesTimesheetIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/EmployeesTimesheet/List.vue'),
        children:[]
      },
      {
        path: 'action-history',
        name: 'ActionHistoryIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/ActionHistory/index.vue'),
        children:[]
      }
    ]
  }
]

export default LeaderPanel