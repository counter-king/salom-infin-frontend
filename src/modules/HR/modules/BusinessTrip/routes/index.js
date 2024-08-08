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
      }
    ]
  }
]

export default BusinessTrip
