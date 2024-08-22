const Agreements = [
  {
    path: 'agreements',
    name: 'AgreementsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'AgreementGroups' },
    children: [
      {
        path: 'groups',
        name: 'AgreementGroups',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/groups.vue'),
      },
      {
        path: 'create',
        name: 'AgreementCreate',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/create.vue')
      },
      {
        path: 'created',
        name: 'AgreementCreated',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/created.vue')
      },
      {
        path: 'created/read/:id',
        name: 'AgreementCreatedRead',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/read.vue')
      },
      {
        path: 'groups/list/:item',
        name: 'AgreementGroupsList',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/groups-list.vue'),
        redirect: { name: 'AgreementNotSigned' },
        children: [
          {
            path: 'not-signed',
            name: 'AgreementNotSigned',
            meta: {
              isAuthRequired: true
            },
            component: () => import('../views/not-signed.vue'),
          },
          {
            path: 'signed',
            name: 'AgreementSigned',
            meta: {
              isAuthRequired: true
            },
            component: () => import('../views/signed.vue'),
          },
        ]
      }
    ]
  }
]

export default Agreements
