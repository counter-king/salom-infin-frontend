const BusinessTrip = [
  {
    path: "business-trip",
    name: "BusinessTripIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "BusinessTripList" },
    children: [
      {
        path: "list",
        name: "BusinessTripList",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/List.vue"),
      },
      {
        path: "show/:id",
        name: "BusinessTripDetail",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Detail.vue")
      }
    ]
  }
]

export default BusinessTrip
