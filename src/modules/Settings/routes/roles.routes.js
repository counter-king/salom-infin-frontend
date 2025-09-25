const Roles = [
  {
    path: 'roles',
    name: 'RolesIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Roles/index.vue'),
  },
  {
    path: 'roles/:id',
    name: 'RolesID',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/Roles/show.vue'),
    children: [
      {
        path: ':permissionId',
        name: 'RolesPermissionId',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Roles/Content.vue'),
      }
    ]
  },
  {
    path: 'role-assignment',
    name: 'RoleAssignmentIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/RoleAssignment/index.vue'),
  },
]

export default Roles
