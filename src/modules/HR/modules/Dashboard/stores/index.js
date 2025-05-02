import { defineStore } from 'pinia'
import { fetchDashboardPayrolls } from '../services'
import { CalendarLinearIcon, FileTextIcon } from '@/components/Icons'

export const useHRDashboardStore = defineStore('useHRDashboardStore', {
  state: () => ({
    routes: {
      title: 'dashboard',
      // icon: InboxUnreadIcon,
      link: 'HrDashboardIndex',
      children: [
        // Общий дашбоард
        {
          title: 'Общий дашбоард',
          icon: CalendarLinearIcon,
          link: 'HRMain',
          children: [],
          count: null,
          // name: 'unread_for_review',
          // permission: 'boxes-for-review-list'
        },
        // /Общий дашбоард

        // Финансовый дашбоард
        {
          title: 'Финансовый дашбоард',
          icon: FileTextIcon,
          link: 'HRFinancial',
          children: [],
          count: null,
          // name: 'unread_for_review',
          // permission: 'boxes-for-review-list'
        },
        // /Финансовый дашбоард
      ]
    },
    payrolls: {
      headers: [
        {
          header: 'Наименование',
        },
        {
          header: 'Фиксированное вознаграждение',
        },
        {
          header: 'Переменное вознаграждение',
        },
        {
          header: 'Разовые выплаты',
        },
        {
          header: 'Премии к праздникам и мат помощь с/х продукты',
        },
        {
          header: 'Материальная помощь',
        },
        {
          header: 'Прочее',
        },
        // {
        //   header: 'Выплата членам НС',
        // },
        // {
        //   header: 'Оплата по договору ГПХ',
        // },
        // {
        //   header: 'Премии к праздникам',
        // },
        // {
        //   header: "Ценные подарки",
        //
      ],
      values: null
    },
  }),
  getters: {

  },
  actions: {
    async actionDashboard(params = {}) {
      try {
        const data = await fetchDashboardPayrolls(params)

        console.log('data', data)

        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {

      }
    },
    /**
     *
     * */
    async actionDashboardPayrolls(params = {}) {
      try {
        const { data } = await fetchDashboardPayrolls(params)

        console.log('data', data)

        let dataFromBackend = {
          branches: [
            {
              pay_type: "Материальная помощь",
              amount: 4588132478.77
            },
            {
              pay_type: "Оплата по договору ГПХ",
              amount: 14784872376.51
            },
            {
              pay_type: "Переменное вознаграждение",
              amount: 178172640653.85
            },
            {
              pay_type: "Премии к праздникам и мат помощь с/х продукты",
              amount: 53948500000
            },
            {
              pay_type: "Прочее",
              amount: 294216020
            },
            {
              pay_type: "Разовые выплаты",
              amount: 8873010000
            },
            {
              pay_type: "Фиксированное вознаграждение",
              amount: 287347964272.94
            },
            {
              pay_type: "Ценные подарки",
              amount: 70774504.84
            }
          ],
          head_office: [
            {
              pay_type: "Выплата членам НС",
              amount: 6462980180.36
            },
            {
              pay_type: "Материальная помощь",
              amount: 2224014838.34
            },
            {
              pay_type: "Оплата по договору ГПХ",
              amount: 15947398979.01
            },
            {
              pay_type: "Переменное вознаграждение",
              amount: 171032586806.15
            },
            {
              pay_type: "Премии к праздникам и мат помощь с/х продукты",
              amount: 53514825000
            },
            {
              pay_type: "Прочее",
              amount: 274577571.43
            },
            {
              pay_type: "Разовые выплаты",
              amount: 19595848651
            },
            {
              pay_type: "Фиксированное вознаграждение",
              amount: 452244971705.46
            },
            {
              pay_type: "Ценные подарки",
              amount: 316597908.68
            }
          ]
        }

        this.payrolls.values = {
          branches: [
            data.branches[6], // Фиксированное вознаграждение
            data.branches[2], // Переменное вознаграждение
            data.branches[5], // Разовые выплаты
            data.branches[3], // Премии к праздникам и мат помощь с/х продукты
            data.branches[0], // Материальная помощь
            data.branches[4], // Прочее
          ],
          head_office: [
            data.head_office[7], // Фиксированное вознаграждение
            data.head_office[3], // Переменное вознаграждение
            data.head_office[6], // Разовые выплаты
            data.head_office[4], // Премии к праздникам и мат помощь с/х продукты
            data.head_office[1], // Материальная помощь
            data.head_office[5], // Прочее
          ],
        }

        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {

      }
    }
  }
})
