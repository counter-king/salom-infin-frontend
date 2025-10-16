// Routes
import Permissions from './permissions.route'
import Roles from './roles.routes'
// import Profile from './profile.route'

const Settings = [
  {
    component: () => import("../views/index.vue"),
    meta: { isAuthRequired: true },
    name: "SettingsIndex",
    path: "settings",
    // redirect: { name: "ProfileIndex" },
    children: [
      // DocumentFlow
      {
        component: () => import("../views/DocumentFlow/index.vue"),
        meta: { isAuthRequired: true, navigation: true },
        name: "DocumentFlowIndex",
        path: "document-flow",
        redirect: { name: "DocumentTypesIndex" },
        children: [
          {
            component: () => import("../views/DocumentFlow/DocumentTypes/index.vue"),
            meta: { isAuthRequired: true },
            name: "DocumentTypesIndex",
            path: "document-types",
          },
          {
            component: () => import("../views/DocumentFlow/DeliveryTypes/index.vue"),
            meta: { isAuthRequired: true },
            name: "DeliveryTypesIndex",
            path: "delivery-types",
          },
          {
            component: () => import("../views/DocumentFlow/Magazines/index.vue"),
            meta: { isAuthRequired: true },
            name: "MagazinesIndex",
            path: "magazines",
          },
          {
            component: () => import("../views/DocumentFlow/DocumentTitles/index.vue"),
            meta: { isAuthRequired: true },
            name: "DocumentTitlesIndex",
            path: "document-titles",
          },
        ]
      },
      // Correspondents
      {
        component: () => import("../views/Correspondents/index.vue"),
        meta: { isAuthRequired: true, navigation: true },
        name: "CorrespondentsIndex",
        path: "correspondents",
        redirect: { name: "PhysicalIndex" },
        children: [
          {
            component: () => import("../views/Correspondents/Physical/index.vue"),
            meta: { isAuthRequired: true },
            name: "PhysicalIndex",
            path: "physical",
          },
          {
            component: () => import("../views/Correspondents/Entrepreneur/index.vue"),
            meta: { isAuthRequired: true },
            name: "EntrepreneurIndex",
            path: "entrepreneur",
          },
          {
            component: () => import("../views/Correspondents/Legal/index.vue"),
            meta: { isAuthRequired: true },
            name: "LegalIndex",
            path: "legal",
          },
          {
            component: () => import("../views/Correspondents/Regions/index.vue"),
            meta: { isAuthRequired: true },
            name: "RegionsIndex",
            path: "regions",
          },
          {
            component: () => import("../views/Correspondents/Districts/index.vue"),
            meta: { isAuthRequired: true },
            name: "DistrictsIndex",
            path: "districts",
          },
        ]
      },
      // Structure
      {
        component: () => import("../views/Structure/index.vue"),
        meta: { isAuthRequired: true },
        name: 'StructureIndex',
        path: 'structure',
        redirect: { name: "DepartmentsIndex" },
        children: [
          {
            children: [],
            component: () => import("../views/Structure/Departments/index.vue"),
            name: 'DepartmentsIndex',
            path: 'departments',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
          },
          {
            children: [],
            component: () => import("../views/Structure/Department/index.vue"),
            name: 'DepartmentIndex',
            path: 'departments/:id',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
          },
          {
            children: [],
            component: () => import("../views/Structure/Branches/index.vue"),
            name: 'BranchesIndex',
            path: 'branches',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
          },
          {
            children: [],
            component: () => import("../views/Structure/Positions/index.vue"),
            name: 'PositionsIndex',
            path: 'positions',
            meta: {
              isAuthRequired: true,
              navigation: true,
            },
          }
        ]
      },
      // Users
      {
        component: () => import("../views/Users/index.vue"),
        meta: { isAuthRequired: true, navigation: true },
        name: "UsersIndex",
        path: "users",
        redirect: { name: "EmployeesIndex" },
        children: [
          {
            component: () => import("../views/Users/Employees/index.vue"),
            meta: { isAuthRequired: true },
            name: "EmployeesIndex",
            navigation: true,
            path: "employees",
          },
          {
            path: 'employees/:id',
            name: 'EmployeesID',
            meta: {
              isAuthRequired: true,
              navigation: false
            },
            component: () => import('../views/Users/Employees/Show.vue'),
            children: [
              {
                path: ':permissionId',
                name: 'EmployeesIDPermissionId',
                meta: {
                  isAuthRequired: true
                },
                component: () => import('../views/Users/Employees/Content.vue'),
              }
            ]
          },
          {
            component: () => import("../views/Users/Assistants/index.vue"),
            meta: { isAuthRequired: true },
            name: "AssistantsIndex",
            navigation: true,
            path: "assistants",
          },
          {
            component: () => import("../views/Users/TopSigners/index.vue"),
            meta: { isAuthRequired: true },
            name: "TopSignersIndex",
            navigation: true,
            path: "top-signers",
          },
        ]
      },
      // Permissions
      ...Permissions,
      // Roles
      ...Roles,
      // ShortDescription
      {
        component: () => import("../views/ShortDescriptions/index.vue"),
        meta: { isAuthRequired: true },
        name: "ShortDescriptionsIndex",
        path: "short-descriptions",
      },
      // Profile
      // ...Profile,
      // {
      //   component: () => import("../views/Profile/List.vue"),
      //   meta: { isAuthRequired: true },
      //   name: "ProfileIndex",
      //   path: "profile",
      // },
      // Devices
      {
        component: () => import("../views/Devices/index.vue"),
        meta: { isAuthRequired: true },
        name: "DevicesIndex",
        path: "devices",
      },
      // Notifications
      {
        component: () => import("../views/Notifications/index.vue"),
        meta: { isAuthRequired: true },
        name: "NotificationsIndex",
        path: "notifications",
      },
      // Equipments
      {
        component: () => import("../views/Equipments/index.vue"),
        meta: { isAuthRequired: true },
        name: "EquipmentsIndex",
        path: "equipments",
      },
      // General Settings
      {
        component: () => import("../views/GeneralSettings/index.vue"),
        meta: { isAuthRequired: true },
        name: "GeneralSettingsIndex",
        path: "general-settings",
      }
    ]
  }
];
export default Settings;
