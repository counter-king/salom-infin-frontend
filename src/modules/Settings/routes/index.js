const Settings = [
  {
    path: "settings",
    name: "SettingsIndex",
    meta: { isAuthRequired: true },
    component: () => import("../views/index.vue"),
    redirect: { name: "ProfileIndex" },
    children: [
      // DocumentFlow
      {
        path: "document-flow",
        name: "DocumentFlowIndex",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/DocumentFlow/index.vue"),
        redirect: { name: "DocumentTypesIndex" },
        children: [
          {
            path: "document-types",
            name: "DocumentTypesIndex",
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/DocumentFlow/DocumentTypes/index.vue"),
          },
          {
            path: "magazines",
            name: "MagazinesIndex",
            meta: { isAuthRequired: true },
            component: () => import("../views/DocumentFlow/Magazines/index.vue"),
          },
        ]
      },
      // Correspondents
      {
        path: "correspondents",
        name: "CorrespondentsIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Correspondents/index.vue"),
        redirect: { name: "IndividualIndex" },
        children: [
          {
            path: "individual",
            name: "IndividualIndex",
            meta: {
              isAuthRequired: true,
              navigation: true
            },
            component: () => import("../views/Correspondents/Individual/index.vue"),
          },
          {
            path: "organizations",
            name: "OrganizationsIndex",
            meta: {
              isAuthRequired: true,
              navigation: true
            },
            component: () => import("../views/Correspondents/Organizations/index.vue"),
          },
        ]
      },
      // Structure
      {
        path: 'structure',
        name: 'StructureIndex',
        redirect: { name: "DepartmentsIndex" },
        meta: { isAuthRequired: true },
        component: () => import("../views/Structure/index.vue"),
        children: [
          {
            path: 'departments',
            name: 'DepartmentsIndex',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Structure/Departments/index.vue"),
            children: []
          },
          {
            path: 'branches',
            name: 'BranchesIndex',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Structure/Branches/index.vue"),
            children: []
          },
          {
            path: 'positions',
            name: 'PositionsIndex',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Structure/Positions/index.vue"),
            children: []
          }
        ]
      },
      // Users
      {
        path: "users",
        name: "UsersIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Users/index.vue"),
        redirect: { name: "EmployeesIndex" },
        children: [
          {
            path: "employees",
            name: "EmployeesIndex",
            navigation: true,
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Users/Employees/index.vue"),
          },
          {
            path: "assistants",
            name: "AssistantsIndex",
            navigation: true,
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Users/Assistants/index.vue"),
          },
          {
            path: "top-signers",
            name: "TopSignersIndex",
            navigation: true,
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
            component: () => import("../views/Users/TopSigners/index.vue"),
          },
        ]
      },
      // ShortDescription
      {
        path: "short-descriptions",
        name: "ShortDescriptionsIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/ShortDescriptions/index.vue"),
      },
      // Profile
      {
        path: "profile",
        name: "ProfileIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Profile/index.vue"),
      },
      // Devices
      {
        path: "devices",
        name: "DevicesIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Devices/index.vue"),
      },
      // Notifications
      {
        path: "notifications",
        name: "NotificationsIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Notifications/index.vue"),
      },
      // Equipments
      {
        path: "equipments",
        name: "EquipmentsIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/Equipments/index.vue"),
      },
      // General Settings
      {
        path: "general-settings",
        name: "GeneralSettingsIndex",
        meta: { isAuthRequired: true },
        component: () => import("../views/GeneralSettings/index.vue"),
      }
    ]
  }
];
export default Settings;