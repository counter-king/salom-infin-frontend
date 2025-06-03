const TimesheetSystem = [
  {
    path: 'timesheet-system',
    name: 'TimesheetSystemIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'StateIndex' },
    children: [
      {
        path: 'state',
        name: 'StateIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/State/index.vue'),
        redirect: { name: 'General' },
        children : [
          {
            path: 'general',
            name: 'General',
            meta: {
              isAuthRequired: true,
            },
            component: () => import('../views/State/General.vue'),
          },
          {
            path: 'face-id',
            name: 'FaceId',
            meta: {
              isAuthRequired: true,
            },
            component: () => import('../views/State/FaceId.vue'),
          },
          {
            path: 'hello-sqb',
            name: 'HelloSQB',
            meta: {
              isAuthRequired: true,
            },
            component: () => import('../views/State/HelloSQB.vue'),
          }
        ]
      },
      {
        path: 'timesheet',
        name: 'TimesheetIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/Timesheet/index.vue'),
        children:[]
      },
      {
        path: 'raports',
        name: 'RaportsIndex',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/Raports/index.vue'),
        children:[]
      }
    ]
  }
]

export default TimesheetSystem