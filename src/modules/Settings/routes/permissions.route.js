const Permissions = [
  {
    path: 'permissions',
    name: 'PermissionsIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Permissions_Copy/index.vue'),
    children: [
      {
        path: ':id',
        name: 'PermissionContent',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Permissions_Copy/Content.vue'),
      }
    ]
  },
]

export default Permissions
