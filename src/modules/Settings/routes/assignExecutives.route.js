export const AssignExecutivesRoutes = [
  {
    path: "assign-executives",
    name: "AssignExecutivesIndex",
    meta: {
      isAuthRequired: true,
      navigation: true,
    },
    redirect: { name: "AssignExecutivesDepartment" },
    component: () => import('../views/AssignExecutives/index.vue'),
    children: [
      {
        path: "department",
        name: "AssignExecutivesDepartment",
        meta: {
          isAuthRequired: true,
          navigation: true,
        },
        component: () => import('../views/AssignExecutives/Department/index.vue'),
      },
      {
        path: "branch",
        name: "AssignExecutivesBranch",
        meta: {
          isAuthRequired: true,
          navigation: true,
        },
        component: () => import('../views/AssignExecutives/Branch/index.vue'),
      }
    ]
  }
]
