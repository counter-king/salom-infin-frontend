import { defineStore } from 'pinia'
import { fetchDashboardComparison, fetchDashboardPayrolls } from '../services'
import { CalendarLinearIcon, FileTextIcon } from '@/components/Icons'
import { generateCleanYAxisLabels } from '@/utils'


export const useHRDashboardStore = defineStore('useHRDashboardStore', {
  state: () => ({
    routes: {
      title: 'dashboard',
      link: 'HrDashboardIndex',
      children: [
        // Общий дашбоард
        {
          title: 'main-dashboard',
          icon: CalendarLinearIcon,
          link: 'HRMain',
          children: [],
        },
        // /Общий дашбоард

        // Финансовый дашбоард
        {
          title: 'financial-dashboard',
          icon: FileTextIcon,
          link: 'HRFinancial',
          children: [],
        },
        // /Финансовый дашбоард
      ]
    },
    payrolls: {
      headers: [
        {
          header: 'naming',
        },
        {
          header: 'finance-dashboard.text-7',
        },
        {
          header: 'finance-dashboard.text-3',
        },
        {
          header: 'finance-dashboard.text-6',
        },
        {
          header: 'finance-dashboard.text-4',
        },
        {
          header: 'finance-dashboard.text-1',
        },
        {
          header: 'finance-dashboard.text-5',
        },
        {
          header: 'total-2'
        }
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
    comparison: {
      data: {},
      axes: [],
      loader: true
    },
  }),
  getters: {

  },
  actions: {
    async actionDashboardPayrolls(params = {}) {
      try {
        const { data } = await fetchDashboardPayrolls(params)

        let dataFromBackend = {
          "branches": [
          {
            "pay_type": "Материальная помощь",
            "amount": 4588132478.77
          },
          {
            "pay_type": "Оплата по договору ГПХ",
            "amount": 14784872376.51
          },
          {
            "pay_type": "Переменное вознаграждение",
            "amount": 178172640653.85
          },
          {
            "pay_type": "Премии к праздникам и мат помощь с/х продукты",
            "amount": 53948500000
          },
          {
            "pay_type": "Прочее",
            "amount": 294216020
          },
          {
            "pay_type": "Разовые выплаты",
            "amount": 8873010000
          },
          {
            "pay_type": "Фиксированное вознаграждение",
            "amount": 287347964272.94
          },
          {
            "pay_type": "Ценные подарки",
            "amount": 70774504.84
          }
        ],
          "head_office": [
          {
            "pay_type": "Выплата членам НС",
            "amount": 6462980180.36
          },
          {
            "pay_type": "Материальная помощь",
            "amount": 2224014838.34
          },
          {
            "pay_type": "Оплата по договору ГПХ",
            "amount": 15947398979.01
          },
          {
            "pay_type": "Переменное вознаграждение",
            "amount": 171032586806.15
          },
          {
            "pay_type": "Премии к праздникам и мат помощь с/х продукты",
            "amount": 53514825000
          },
          {
            "pay_type": "Прочее",
            "amount": 274577571.43
          },
          {
            "pay_type": "Разовые выплаты",
            "amount": 19595848651
          },
          {
            "pay_type": "Фиксированное вознаграждение",
            "amount": 452244971705.46
          },
          {
            "pay_type": "Ценные подарки",
            "amount": 316597908.68
          }
        ]
        }

        // this.payrolls.values = {
        //   branches: [
        //     dataFromBackend.branches[6], // Фиксированное вознаграждение
        //     dataFromBackend.branches[2], // Переменное вознаграждение
        //     dataFromBackend.branches[5], // Разовые выплаты
        //     dataFromBackend.branches[3], // Премии к праздникам и мат помощь с/х продукты
        //     dataFromBackend.branches[0], // Материальная помощь
        //     dataFromBackend.branches[4], // Прочее
        //   ],
        //   branches_all_count: {
        //     amount: dataFromBackend.branches.reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
        //   },
        //   head_office: [
        //     dataFromBackend.head_office[7], // Фиксированное вознаграждение
        //     dataFromBackend.head_office[3], // Переменное вознаграждение
        //     dataFromBackend.head_office[6], // Разовые выплаты
        //     dataFromBackend.head_office[4], // Премии к праздникам и мат помощь с/х продукты
        //     dataFromBackend.head_office[1], // Материальная помощь
        //     dataFromBackend.head_office[5], // Прочее
        //   ],
        //   head_office_all_count: {
        //     amount: dataFromBackend.head_office.reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
        //   }
        // }

        this.payrolls.values = {
          branches: [
            data.branches[6], // Фиксированное вознаграждение
            data.branches[2], // Переменное вознаграждение
            data.branches[5], // Разовые выплаты
            data.branches[3], // Премии к праздникам и мат помощь с/х продукты
            data.branches[0], // Материальная помощь
            data.branches[4], // Прочее
          ],
          branches_all_count: {
            amount: data.branches.reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
          },
          head_office: [
            data.head_office[7], // Фиксированное вознаграждение
            data.head_office[3], // Переменное вознаграждение
            data.head_office[6], // Разовые выплаты
            data.head_office[4], // Премии к праздникам и мат помощь с/х продукты
            data.head_office[1], // Материальная помощь
            data.head_office[5], // Прочее
          ],
          head_office_all_count: {
            amount: data.head_office.reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
          },
        }

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
    async actionDashboardComparison(params = {}) {
      this.comparison.loader = true
      try {
        const { data } = await fetchDashboardComparison(params)

        // const maxAmount = Math.max(
        //   ...data.head_office.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount),
        //   ...data.branches.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount)
        // )
        // const addMaxAmount = (maxAmount + 2e10) / 100
        //
        // this.comparison.axes = generateCleanYAxisLabels(maxAmount)
        // this.comparison.axes = this.comparison.axes.slice(0, this.comparison.axes.length - 1).reverse()
        //
        // this.comparison.data = {
        //   head_office: [
        //     // Фиксированное вознаграждение
        //     {
        //       ...data.head_office[7],
        //       current_amount_percent: `${((data.head_office[7].current_amount / addMaxAmount)).toFixed(1)}%`,
        //       comparison_amount_percent: `${((data.head_office[7].comparison_amount / addMaxAmount)).toFixed(1)}%`
        //     },
        //     // Переменное вознаграждение
        //     {
        //       ...data.head_office[3],
        //       current_amount_percent: `${(data.head_office[3].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.head_office[3].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Разовые выплаты
        //     {
        //       ...data.head_office[6],
        //       current_amount_percent: `${(data.head_office[6].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.head_office[6].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Премии к праздникам и мат помощь с/х продукты
        //     {
        //       ...data.head_office[4],
        //       current_amount_percent: `${(data.head_office[4].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.head_office[4].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Материальная помощь
        //     {
        //       ...data.head_office[1],
        //       current_amount_percent: `${(data.head_office[1].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.head_office[1].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Прочее
        //     {
        //       ...data.head_office[5],
        //       current_amount_percent: `${(data.head_office[5].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.head_office[5].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     }
        //   ],
        //   branches: [
        //     // Фиксированное вознаграждение
        //     {
        //       ...data.branches[6],
        //       current_amount_percent: `${(data.branches[6].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[6].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Переменное вознаграждение
        //     {
        //       ...data.branches[2],
        //       current_amount_percent: `${(data.branches[2].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[2].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Разовые выплаты
        //     {
        //       ...data.branches[5],
        //       current_amount_percent: `${(data.branches[5].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[5].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Премии к праздникам и мат помощь с/х продукты
        //     {
        //       ...data.branches[3],
        //       current_amount_percent: `${(data.branches[3].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[3].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Материальная помощь
        //     {
        //       ...data.branches[0],
        //       current_amount_percent: `${(data.branches[0].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[0].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Прочее
        //     {
        //       ...data.branches[4],
        //       current_amount_percent: `${(data.branches[4].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(data.branches[4].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //   ],
        // }


        const dataFromBackend = {
          branches: [
            {
              pay_type: "Материальная помощь",
              current_amount: 1070456408,
              comparison_amount: 1517195934.97,
              difference: -446739526.97,
              pay_type_id: 5
            },
            {
              pay_type: "Оплата по договору ГПХ",
              current_amount: 3903880270.17,
              comparison_amount: 1273457018.38,
              difference: 2630423251.79,
              pay_type_id: 9
            },
            {
              pay_type: "Переменное вознаграждение",
              current_amount: 29415250902.29,
              comparison_amount: 53891874862.45,
              difference: -24476623960.159996,
              pay_type_id: 3
            },
            {
              pay_type: "Премии к праздникам и мат помощь с/х продукты",
              current_amount: 6201000000,
              comparison_amount: 12614950000,
              difference: -6413950000,
              pay_type_id: 4
            },
            {
              pay_type: "Прочее",
              current_amount: 53357884,
              comparison_amount: 1406000,
              difference: 51951884,
              pay_type_id: 6
            },
            {
              pay_type: "Разовые выплаты",
              current_amount: 3525910000,
              comparison_amount: 365200000,
              difference: 3160710000,
              pay_type_id: 2
            },
            {
              pay_type: "Фиксированное вознаграждение",
              current_amount: 49472838993.96,
              comparison_amount: 87227600491.1,
              difference: -37754761497.14001,
              pay_type_id: 1
            },
            {
              pay_type: "Ценные подарки",
              current_amount: 1834000,
              comparison_amount: 2073992,
              difference: -239992,
              pay_type_id: 8
            }
          ],
          head_office: [
            {
              pay_type: "Выплата членам НС",
              current_amount: 1147872516.53,
              comparison_amount: 1559008082.14,
              difference: -411135565.61000013,
              pay_type_id: 10
            },
            {
              pay_type: "Материальная помощь",
              current_amount: 323400000,
              comparison_amount: 734347456.56,
              difference: -410947456.55999994,
              pay_type_id: 5
            },
            {
              pay_type: "Оплата по договору ГПХ",
              current_amount: 3931412447.93,
              comparison_amount: 1829974771.48,
              difference: 2101437676.4499998,
              pay_type_id: 9
            },
            {
              pay_type: "Переменное вознаграждение",
              current_amount: 26859966459.91,
              comparison_amount: 43407236709.56,
              difference: -16547270249.649998,
              pay_type_id: 3
            },
            {
              pay_type: "Премии к праздникам и мат помощь с/х продукты",
              current_amount: 5623000000,
              comparison_amount: 11067625000,
              difference: -5444625000,
              pay_type_id: 4
            },
            {
              pay_type: "Прочее",
              current_amount: 0,
              comparison_amount: 30662571.43,
              difference: -30662571.43,
              pay_type_id: 6
            },
            {
              pay_type: "Разовые выплаты",
              current_amount: 4981295000,
              comparison_amount: 2122750000,
              difference: 2858545000,
              pay_type_id: 2
            },
            {
              pay_type: "Фиксированное вознаграждение",
              current_amount: 89749385017.07,
              comparison_amount: 105293535633.45,
              difference: -15544150616.37999,
              pay_type_id: 1
            },
            {
              pay_type: "Ценные подарки",
              current_amount: 122069067.92,
              comparison_amount: 2410760,
              difference: 119658307.92,
              pay_type_id: 8
            }
          ]
        }


        const maxAmount = Math.max(
          ...dataFromBackend.head_office.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount),
          ...dataFromBackend.branches.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount)
        )
        const addMaxAmount = (maxAmount + 2e10) / 100

        this.comparison.axes = generateCleanYAxisLabels(maxAmount)
        this.comparison.axes = this.comparison.axes.slice(0, this.comparison.axes.length - 1).reverse()

        this.comparison.data = {
          head_office: [
            // Фиксированное вознаграждение
            {
              ...dataFromBackend.head_office[7],
              current_amount_percent: `${((dataFromBackend.head_office[7].current_amount / addMaxAmount)).toFixed(1)}%`,
              comparison_amount_percent: `${((dataFromBackend.head_office[7].comparison_amount / addMaxAmount)).toFixed(1)}%`
            },
            // Переменное вознаграждение
            {
              ...dataFromBackend.head_office[3],
              current_amount_percent: `${(dataFromBackend.head_office[3].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.head_office[3].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Разовые выплаты
            {
              ...dataFromBackend.head_office[6],
              current_amount_percent: `${(dataFromBackend.head_office[6].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.head_office[6].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Премии к праздникам и мат помощь с/х продукты
            {
              ...dataFromBackend.head_office[4],
              current_amount_percent: `${(dataFromBackend.head_office[4].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.head_office[4].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Материальная помощь
            {
              ...dataFromBackend.head_office[1],
              current_amount_percent: `${(dataFromBackend.head_office[1].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.head_office[1].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Прочее
            {
              ...dataFromBackend.head_office[5],
              current_amount_percent: `${(dataFromBackend.head_office[5].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.head_office[5].comparison_amount / addMaxAmount).toFixed(1)}%`
            }
          ],
          branches: [
            // Фиксированное вознаграждение
            {
              ...dataFromBackend.branches[6],
              current_amount_percent: `${(dataFromBackend.branches[6].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[6].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Переменное вознаграждение
            {
              ...dataFromBackend.branches[2],
              current_amount_percent: `${(dataFromBackend.branches[2].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[2].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Разовые выплаты
            {
              ...dataFromBackend.branches[5],
              current_amount_percent: `${(dataFromBackend.branches[5].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[5].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Премии к праздникам и мат помощь с/х продукты
            {
              ...dataFromBackend.branches[3],
              current_amount_percent: `${(dataFromBackend.branches[3].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[3].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Материальная помощь
            {
              ...dataFromBackend.branches[0],
              current_amount_percent: `${(dataFromBackend.branches[0].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[0].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Прочее
            {
              ...dataFromBackend.branches[4],
              current_amount_percent: `${(dataFromBackend.branches[4].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(dataFromBackend.branches[4].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
          ],
        }

        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {
        setTimeout(() => {
          this.comparison.loader = false
        }, 500)
      }
    },
  }
})
