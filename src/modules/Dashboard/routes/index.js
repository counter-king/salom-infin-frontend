const Dashboard = [
  {
    path: "dashboard",
    name: "DashboardIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Home.vue"),
  }
]

export default Dashboard
