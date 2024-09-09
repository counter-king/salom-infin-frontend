import Profile from '../modules/Profile/routes'
import BusinessTrip from "@/modules/HR/modules/BusinessTrip/routes"
import Agreements from '../modules/Agreements/routes'

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
      // Profile
      ...Profile,
      // Business Trip
      ...BusinessTrip,
      // Agreements
      ...Agreements
    ]
  }
]

export default HR
