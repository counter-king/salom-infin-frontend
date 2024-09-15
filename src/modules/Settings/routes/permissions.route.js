const Permissions = [
  {
    path: 'permissions',
    name: 'PermissionsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Permissions/index.vue'),
    children: [
      {
        path: ':id',
        name: 'PermissionContent',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Permissions/Content.vue'),
      }
    ]
  },
]

export default Permissions
