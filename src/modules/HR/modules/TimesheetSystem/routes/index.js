export const TimesheetSystemRoutes = [
  {
    path: "timesheet",
    name: "TimesheetSystemIndex",
    meta: {
      isAuthRequired: true,
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "TimesheetSystemTable" },
    children: [
      {
        path: "table",
        name: "TimesheetSystemTable",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Table/index.vue"),
      }
    ]
  }
]
