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
  },
]

export default Roles
