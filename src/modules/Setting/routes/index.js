// import Profile from "../modules/Profile/routes"

const Settings = [
  {
    path: "settings",
    name: "SettingsIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
    redirect: { name: "ProfileIndex" },
    children: [
      // Профиль
      {
        path: "profile",
        name: "ProfileIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Profile/index.vue"),
      },
      // Документ оборот
      {
        path: "document-turnover",
        name: "DocumentTurnoverIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/index.vue"),
        redirect: { name: "DocumentTypeIndex" },
        children: [
          // Тип документа
          {
            path: "document-type",
            name: "DocumentTypeIndex",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/DocumentTurnover/DocumentType/index.vue"),
          },
          // Вид документа
          {
            path: "document-view",
            name: "DocumentViewIndex",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/DocumentTurnover/DocumentView/index.vue"),
          },
          // Журнал
          {
            path: "magazine",
            name: "MagazineIndex",
            meta: {
              isAuthRequired: true
            },
            component: () => import("../views/DocumentTurnover/Magazine/index.vue"),
          },
        ]
      },
      // Мои устройства
      {
        path: "my-devices",
        name: "MyDevicesIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/MyDevices/index.vue"),
      },
      // Уведомления
      {
        path: "notifications",
        name: "NotificationsIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/Notifications/index.vue"),
      },
      // Техника и оборудованияw
      {
        path: "machinery-equipment",
        name: "MachineryEquipmentIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/MachineryEquipment/index.vue"),
      },
      // Общие настройки
      {
        path: "general-settings",
        name: "GeneralSettingsIndex",
        meta: {
          isAuthRequired: true
        },
        component: () => import("../views/GeneralSettings/index.vue"),
      }
    ]
  }
]

export default Settings
