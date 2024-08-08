import BusinessTrip from "@/modules/HR/modules/BusinessTrip/routes"

const HR = [
  {
    path: "hr",
    name: "HRIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "BusinessTripIndex" },
    children: [
      // Business Trip
      ...BusinessTrip
    ]
  }
]

export default HR
