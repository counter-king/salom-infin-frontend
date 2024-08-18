// Core
import { defineStore } from 'pinia'

export const useHandbookStore = defineStore('handbook', {
  state: () => ({
    list: [
      {
        fio: 'Курбанов Нодир Собирович',
        position: 'Nursing Assistant',
        status: 'Рабочий',
        ip_phone: '67-00',
        corp_mail: 'bill.sanders@example.com',
        dep_name: 'Департамент информационных технологий',
        sub: {
          dep_name: 'Департамент информационных технологий',
          department: 'Отдел технической поддержки',
          is_main: 'Головной офис'
        }
      },
      {
        fio: 'Сизый Лилия',
        position: 'Web Designer',
        status: 'Отпуск',
        ip_phone: '67-00',
        corp_mail: 'nevaeh.simmons@example.com',
        dep_name: 'Департамент информационных технологий',
        sub: {
          dep_name: 'Департамент информационных технологий',
          department: 'Отдел технической поддержки',
          is_main: 'Головной офис'
        }
      },
      {
        fio: '222 Сизый Лилия',
        position: '22 Web Designer',
        status: 'Отпуск',
        ip_phone: '67-00',
        corp_mail: 'nevaeh.simmons@example.com',
        dep_name: 'Департамент ннннн',
        sub: {
          dep_name: 'Департамент ннннн',
          department: 'Отдел ннннн',
          is_main: 'Головной офис'
        }
      },
      {
        fio: '333 Сизый Лилия',
        position: '33 Web Designer',
        status: 'Отпуск',
        ip_phone: '67-00',
        corp_mail: 'nevaeh.simmons@example.com',
        dep_name: 'Департамент фффф',
        sub: {
          dep_name: 'Департамент фффф',
          department: 'Отдел фффф',
          is_main: 'Пойтахт филиал'
        }
      },
    ],
    headers: [
      {
        header: 'fio',
        field: 'fio',
        active: true
      },
      {
        header: 'position',
        field: 'position',
        active: true
      },
      {
        header: 'status',
        field: 'status',
        width: '225px',
        active: true
      },
      {
        header: 'ip-phone',
        field: 'ip_phone',
        width: '225px',
        active: true
      },
      {
        header: 'corp-mail',
        field: 'corp_mail',
        width: '225px',
        active: true
      }
    ]
  }),
  actions: {

  }
})
