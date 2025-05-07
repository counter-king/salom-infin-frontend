const BusinessTrip = [
  {
    path: 'trip',
    name: 'BusinessTripMainIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "BusinessTripIndex" },
    children: [
      {
        path: "business-trip",
        name: "BusinessTripIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/BussinessTripIndex.vue"),
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
      },
      //  settings
      {
        path: "settings",
        name: "BusinessTripSettings",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/Settings/index.vue"),
        redirect: { name: "GeographicalHandbook" },
        children: [
          {
            path: "geographical-handbook",
            name: "GeographicalHandbook",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/Settings/GeographicalHandbook.vue")
          },
          {
            path: "trip-purpose",
            name: "TripPurpose",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/Settings/TripPurpose.vue")
          },
          {
            path: "history",
            name: "TripHistory",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/Settings/History.vue")
          }
        ]
      }
    ]
  },
]

export default BusinessTrip
