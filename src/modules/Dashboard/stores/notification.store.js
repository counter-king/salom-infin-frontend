// Core
import { defineStore } from 'pinia'
import { PlaneIcon } from "@/components/Icons";
import { BY_PLANE } from "@/modules/Documents/modules/SendDocuments/constants";

export const useNotificationStore = defineStore('dashboard-notification-stores', {
  state: () => ({
    tempData: [
      {
        id: 1,
        title: 'Bugun ishga kech qoldingiz',
        time: new Date(),
        buttonLabel: 'Sababini ko\'rsating',
        icon: '/images/dashboard/alarm-clock.svg'
      },
      {
        id: 2,
        title: 'Sizda imzolash uchun xat bor',
        time: new Date(),
        buttonLabel: 'Imzolash',
        icon: '/images/dashboard/bookmark-tabs.svg',
        route: {
          name: 'SignIndex',
          query: {
            signed: 'none'
          }
        }
      },
      {
        id: 3,
        title: 'Sizda kelishish uchun xat bor',
        time: new Date(),
        buttonLabel: 'Tekshirish',
        icon: '/images/dashboard/bookmark-tabs.svg',
        route: {
          name: 'ApprovalIndex',
          query: {
            approved: 'none'
          }
        }
      },
      {
        id: 4,
        title: 'Sizda ko\'rib chiqish uchun xat bor',
        time: new Date(),
        buttonLabel: 'Ko\'rib chiqish',
        icon: '/images/dashboard/bookmark-tabs.svg',
        route: {
          name: 'ReviewIndex',
          query: {
            is_read: 'False'
          }
        }
      },
      {
        id: 5,
        title: 'Sizda topshiriq bor',
        time: new Date(),
        buttonLabel: 'Bajarish',
        icon: '/images/dashboard/bookmark-tabs.svg',
        route: {
          name: 'AssignmentIndex',
          query: {
            is_read: 'False'
          }
        }
      }
    ],
    reasonList: [
      {
        id: 1,
        title: 'traffic-jam',
        icon: PlaneIcon,
        value: BY_PLANE,
        name_uz: 'Tirbandlik',
        name_ru: 'Пробка (дорожная пробка)'
      },
    ]
  }),
})
