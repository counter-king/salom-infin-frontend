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
        component: () => import("../views/Detail.vue"),
        redirect: { name: "BusinessTripProcess" },
        children: [
          {
            path: "process",
            name: "BusinessTripProcess",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/BusinessTripProcess/Detail.vue")
          },
          {
            path: "advance-report-list",
            name: "BusinessTripAdvanceReportList",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/AdvanceReport/List.vue")
          },
          {
            path: "advance-report-create",
            name: "BusinessTripAdvanceReportCreate",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/AdvanceReport/Create.vue")
          },
          {
            path: "certificate",
            name: "BusinessTripCertificate",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/BusinessTripProcess/Certificate.vue")
          },
        ]
      }
    ]
  }
]

export default BusinessTrip
