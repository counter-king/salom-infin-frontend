export const DepartmentAssignmentRoutes = [
  {
    path: 'department-assignment',
    name: 'DepartmentAssignment',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    redirect: { name: 'DepartmentAssignmentSettings' },
    component: () => import('../views/DepartmentAssignment/index.vue'),
    children: [
      {
        path: 'settings',
        name: 'DepartmentAssignmentSettings',
        meta: {
          isAuthRequired: true,
        },
        component: () => import('../views/DepartmentAssignment/DepartmentAssignmentSetting/index.vue'),
      }
    ]
  }
]
