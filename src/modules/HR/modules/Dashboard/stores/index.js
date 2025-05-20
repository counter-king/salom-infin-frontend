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
          header: 'Ценные подарки'
        },
        {
          header: 'Выплата пенсионерам (не сотр. Банка)'
        },
        {
          header: 'Выплата членам НС'
        },
        {
          header: 'Оплата по дог. ГПХ'
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

        console.log('payrolls/summary', data)

        // let dataFromBackend = {
        //   "branches": [
        //     {
        //       "pay_type": "Материальная помощь",
        //       "amount": 1070456408,
        //       "pay_type_id": 5
        //     },
        //     {
        //       "pay_type": "Оплата по договору ГПХ",
        //       "amount": 3903880270.17,
        //       "pay_type_id": 9
        //     },
        //     {
        //       "pay_type": "Переменное вознаграждение",
        //       "amount": 29415250902.29,
        //       "pay_type_id": 3
        //     },
        //     {
        //       "pay_type": "Премии к праздникам и мат помощь с/х продукты",
        //       "amount": 6201000000,
        //       "pay_type_id": 4
        //     },
        //     {
        //       "pay_type": "Прочее",
        //       "amount": 53357884,
        //       "pay_type_id": 6
        //     },
        //     {
        //       "pay_type": "Разовые выплаты",
        //       "amount": 3525910000,
        //       "pay_type_id": 2
        //     },
        //     {
        //       "pay_type": "Фиксированное вознаграждение",
        //       "amount": 49472838993.96,
        //       "pay_type_id": 1
        //     },
        //     {
        //       "pay_type": "Ценные подарки",
        //       "amount": 1834000,
        //       "pay_type_id": 8
        //     },
        //     {
        //       "pay_type": "Выплата пенсионерам (не сотр. Банка)",
        //       "amount": 200,
        //       "pay_type_id": 7
        //     }
        //   ],
        //   "head_office": [
        //     {
        //       "pay_type": "Выплата членам НС",
        //       "amount": 1147872516.53,
        //       "pay_type_id": 10
        //     },
        //     {
        //       "pay_type": "Материальная помощь",
        //       "amount": 323400000,
        //       "pay_type_id": 5
        //     },
        //     {
        //       "pay_type": "Оплата по договору ГПХ",
        //       "amount": 3931412447.93,
        //       "pay_type_id": 9
        //     },
        //     {
        //       "pay_type": "Переменное вознаграждение",
        //       "amount": 26859966459.91,
        //       "pay_type_id": 3
        //     },
        //     {
        //       "pay_type": "Премии к праздникам и мат помощь с/х продукты",
        //       "amount": 5623000000,
        //       "pay_type_id": 4
        //     },
        //     {
        //       "pay_type": "Разовые выплаты",
        //       "amount": 4981295000,
        //       "pay_type_id": 2
        //     },
        //     {
        //       "pay_type": "Фиксированное вознаграждение",
        //       "amount": 89749385017.07,
        //       "pay_type_id": 1
        //     },
        //     {
        //       "pay_type": "Ценные подарки",
        //       "amount": 122069067.92,
        //       "pay_type_id": 8
        //     },
        //     {
        //       "pay_type": "Выплата пенсионерам (не сотр. Банка)",
        //       "amount": 200,
        //       "pay_type_id": 7
        //     }
        //   ]
        // }
        //
        // this.payrolls.values = {
        //   branches: [
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 8) ?? { amount: '-' }, // Ценные подарки
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 7) ?? { amount: '-' }, // Выплата пенсионерам (не сотр. Банка)
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 10) ?? { amount: '-' }, // Выплата членам НС
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 9) ?? { amount: '-' }, // Оплата по дог. ГПХ
        //     dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' }, // Прочее
        //   ],
        //   branches_all_count: {
        //     amount: dataFromBackend.branches
        //       .filter(({ pay_type_id }) => pay_type_id !== 9)
        //       .reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
        //   },
        //   head_office: [
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 8) ?? { amount: '-' }, // Ценные подарки
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 7) ?? { amount: '-' }, // Выплата пенсионерам (не сотр. Банка)
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 10) ?? { amount: '-' }, // Выплата членам НС
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 9) ?? { amount: '-' }, // Оплата по дог. ГПХ
        //     dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' }, // Прочее
        //   ],
        //   head_office_all_count: {
        //     amount: dataFromBackend.head_office
        //     .filter(({ pay_type_id }) => pay_type_id !== 8 && pay_type_id !== 9 && pay_type_id !== 10)
        //     .reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
        //   }
        // }

        this.payrolls.values = {
          branches: [
            data.branches.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
            data.branches.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
            data.branches.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
            data.branches.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
            data.branches.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
            data.branches.find(({ pay_type_id }) => pay_type_id === 8) ?? { amount: '-' }, // Ценные подарки
            data.branches.find(({ pay_type_id }) => pay_type_id === 7) ?? { amount: '-' }, // Выплата пенсионерам (не сотр. Банка)
            data.branches.find(({ pay_type_id }) => pay_type_id === 10) ?? { amount: '-' }, // Выплата членам НС
            data.branches.find(({ pay_type_id }) => pay_type_id === 9) ?? { amount: '-' }, // Оплата по дог. ГПХ
            data.branches.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' }, // Прочее
          ],
          branches_all_count: {
            amount: data.branches
            // .filter(({ pay_type_id }) => pay_type_id !== 8 && pay_type_id !== 9)
            .reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
          },
          head_office: [
            data.head_office.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
            data.head_office.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
            data.head_office.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
            data.head_office.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
            data.head_office.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
            data.head_office.find(({ pay_type_id }) => pay_type_id === 8) ?? { amount: '-' }, // Ценные подарки
            data.head_office.find(({ pay_type_id }) => pay_type_id === 7) ?? { amount: '-' }, // Выплата пенсионерам (не сотр. Банка)
            data.head_office.find(({ pay_type_id }) => pay_type_id === 10) ?? { amount: '-' }, // Выплата членам НС
            data.head_office.find(({ pay_type_id }) => pay_type_id === 9) ?? { amount: '-' }, // Оплата по дог. ГПХ
            data.head_office.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' }, // Прочее
          ],
          head_office_all_count: {
            amount: data.head_office
            // .filter(({ pay_type_id }) => pay_type_id !== 8 && pay_type_id !== 9 && pay_type_id !== 10)
            .reduce((a, b) => parseInt(a) + parseInt(b.amount), '0'),
          }
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

        const maxAmount = Math.max(
          ...data.head_office.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount),
          ...data.branches.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount)
        )
        const addMaxAmount = (maxAmount + 2e10) / 100

        this.comparison.axes = generateCleanYAxisLabels(maxAmount)
        this.comparison.axes = this.comparison.axes.slice(0, this.comparison.axes.length - 1).reverse()

        let model = {
          branches: {
            1: data.branches.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
            3: data.branches.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
            2: data.branches.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
            4: data.branches.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
            5: data.branches.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
            6: data.branches.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' } // Прочее
          },
          head_office: {
            1: data.head_office.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
            3: data.head_office.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
            2: data.head_office.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
            4: data.head_office.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
            5: data.head_office.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
            6: data.head_office.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' } // Прочее
          }
        }

        this.comparison.data = {
          head_office: [
            // Фиксированное вознаграждение
            {
              ...model.head_office[1],
              current_amount_percent: `${((model.head_office[1].current_amount / addMaxAmount)).toFixed(1)}%`,
              comparison_amount_percent: `${((model.head_office[1].comparison_amount / addMaxAmount)).toFixed(1)}%`
            },
            // Переменное вознаграждение
            {
              ...model.head_office[3],
              current_amount_percent: `${(model.head_office[3].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.head_office[3].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Разовые выплаты
            {
              ...model.head_office[2],
              current_amount_percent: `${(model.head_office[2].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.head_office[2].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Премии к праздникам и мат помощь с/х продукты
            {
              ...model.head_office[4],
              current_amount_percent: `${(model.head_office[4].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.head_office[4].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Материальная помощь
            {
              ...model.head_office[5],
              current_amount_percent: `${(model.head_office[5].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.head_office[5].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Прочее
            {
              ...model.head_office[6],
              current_amount_percent: `${(model.head_office[6].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.head_office[6].comparison_amount / addMaxAmount).toFixed(1)}%`
            }
          ],
          branches: [
            // Фиксированное вознаграждение
            {
              ...model.branches[1],
              current_amount_percent: `${(model.branches[1].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[1].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Переменное вознаграждение
            {
              ...model.branches[3],
              current_amount_percent: `${(model.branches[3].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[3].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Разовые выплаты
            {
              ...model.branches[2],
              current_amount_percent: `${(model.branches[2].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[2].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Премии к праздникам и мат помощь с/х продукты
            {
              ...model.branches[4],
              current_amount_percent: `${(model.branches[4].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[4].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Материальная помощь
            {
              ...model.branches[5],
              current_amount_percent: `${(model.branches[5].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[5].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
            // Прочее
            {
              ...model.branches[6],
              current_amount_percent: `${(model.branches[6].current_amount / addMaxAmount).toFixed(1)}%`,
              comparison_amount_percent: `${(model.branches[6].comparison_amount / addMaxAmount).toFixed(1)}%`
            },
          ],
        }


        // const dataFromBackend = {
        //   branches: [
        //     {
        //       pay_type: "Материальная помощь",
        //       current_amount: 1070456408,
        //       comparison_amount: 1517195934.97,
        //       difference: -446739526.97,
        //       pay_type_id: 5
        //     },
        //     {
        //       pay_type: "Оплата по договору ГПХ",
        //       current_amount: 3903880270.17,
        //       comparison_amount: 1273457018.38,
        //       difference: 2630423251.79,
        //       pay_type_id: 9
        //     },
        //     {
        //       pay_type: "Переменное вознаграждение",
        //       current_amount: 29415250902.29,
        //       comparison_amount: 53891874862.45,
        //       difference: -24476623960.159996,
        //       pay_type_id: 3
        //     },
        //     {
        //       pay_type: "Премии к праздникам и мат помощь с/х продукты",
        //       current_amount: 6201000000,
        //       comparison_amount: 12614950000,
        //       difference: -6413950000,
        //       pay_type_id: 4
        //     },
        //     {
        //       pay_type: "Прочее",
        //       current_amount: 53357884,
        //       comparison_amount: 1406000,
        //       difference: 51951884,
        //       pay_type_id: 6
        //     },
        //     {
        //       pay_type: "Разовые выплаты",
        //       current_amount: 3525910000,
        //       comparison_amount: 365200000,
        //       difference: 3160710000,
        //       pay_type_id: 2
        //     },
        //     {
        //       pay_type: "Фиксированное вознаграждение",
        //       current_amount: 49472838993.96,
        //       comparison_amount: 87227600491.1,
        //       difference: -37754761497.14001,
        //       pay_type_id: 1
        //     },
        //     {
        //       pay_type: "Ценные подарки",
        //       current_amount: 1834000,
        //       comparison_amount: 2073992,
        //       difference: -239992,
        //       pay_type_id: 8
        //     }
        //   ],
        //   head_office: [
        //     {
        //       pay_type: "Выплата членам НС",
        //       current_amount: 1147872516.53,
        //       comparison_amount: 1559008082.14,
        //       difference: -411135565.61000013,
        //       pay_type_id: 10
        //     },
        //     {
        //       pay_type: "Материальная помощь",
        //       current_amount: 323400000,
        //       comparison_amount: 734347456.56,
        //       difference: -410947456.55999994,
        //       pay_type_id: 5
        //     },
        //     {
        //       pay_type: "Оплата по договору ГПХ",
        //       current_amount: 3931412447.93,
        //       comparison_amount: 1829974771.48,
        //       difference: 2101437676.4499998,
        //       pay_type_id: 9
        //     },
        //     {
        //       pay_type: "Переменное вознаграждение",
        //       current_amount: 26859966459.91,
        //       comparison_amount: 43407236709.56,
        //       difference: -16547270249.649998,
        //       pay_type_id: 3
        //     },
        //     {
        //       pay_type: "Премии к праздникам и мат помощь с/х продукты",
        //       current_amount: 5623000000,
        //       comparison_amount: 11067625000,
        //       difference: -5444625000,
        //       pay_type_id: 4
        //     },
        //     {
        //       pay_type: "Прочее",
        //       current_amount: 0,
        //       comparison_amount: 30662571.43,
        //       difference: -30662571.43,
        //       pay_type_id: 6
        //     },
        //     {
        //       pay_type: "Разовые выплаты",
        //       current_amount: 4981295000,
        //       comparison_amount: 2122750000,
        //       difference: 2858545000,
        //       pay_type_id: 2
        //     },
        //     {
        //       pay_type: "Фиксированное вознаграждение",
        //       current_amount: 89749385017.07,
        //       comparison_amount: 105293535633.45,
        //       difference: -15544150616.37999,
        //       pay_type_id: 1
        //     },
        //     {
        //       pay_type: "Ценные подарки",
        //       current_amount: 122069067.92,
        //       comparison_amount: 2410760,
        //       difference: 119658307.92,
        //       pay_type_id: 8
        //     }
        //   ]
        // }
        //
        // const maxAmount = Math.max(
        //   ...dataFromBackend.head_office.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount),
        //   ...dataFromBackend.branches.map(i => i.current_amount > i.comparison_amount ? i.current_amount : i.comparison_amount)
        // )
        // const addMaxAmount = (maxAmount + 2e10) / 100
        //
        // this.comparison.axes = generateCleanYAxisLabels(maxAmount)
        // this.comparison.axes = this.comparison.axes.slice(0, this.comparison.axes.length - 1).reverse()
        //
        // let model = {
        //   branches: {
        //     1: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
        //     3: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
        //     2: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
        //     4: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
        //     5: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
        //     6: dataFromBackend.branches.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' } // Прочее
        //   },
        //   head_office: {
        //     1: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 1) ?? { amount: '-' }, // Фиксированное вознаграждение
        //     3: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 3) ?? { amount: '-' }, // Переменное вознаграждение
        //     2: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 2) ?? { amount: '-' }, // Разовые выплаты
        //     4: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 4) ?? { amount: '-' }, // Премии к праздникам и мат помощь с/х продукты
        //     5: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 5) ?? { amount: '-' }, // Материальная помощь
        //     6: dataFromBackend.head_office.find(({ pay_type_id }) => pay_type_id === 6) ?? { amount: '-' } // Прочее
        //   }
        // }
        //
        // this.comparison.data = {
        //   head_office: [
        //     // Фиксированное вознаграждение
        //     {
        //       ...model.head_office[1],
        //       current_amount_percent: `${((model.head_office[1].current_amount / addMaxAmount)).toFixed(1)}%`,
        //       comparison_amount_percent: `${((model.head_office[1].comparison_amount / addMaxAmount)).toFixed(1)}%`
        //     },
        //     // Переменное вознаграждение
        //     {
        //       ...model.head_office[3],
        //       current_amount_percent: `${(model.head_office[3].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.head_office[3].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Разовые выплаты
        //     {
        //       ...model.head_office[2],
        //       current_amount_percent: `${(model.head_office[2].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.head_office[2].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Премии к праздникам и мат помощь с/х продукты
        //     {
        //       ...model.head_office[4],
        //       current_amount_percent: `${(model.head_office[4].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.head_office[4].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Материальная помощь
        //     {
        //       ...model.head_office[5],
        //       current_amount_percent: `${(model.head_office[5].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.head_office[5].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Прочее
        //     {
        //       ...model.head_office[6],
        //       current_amount_percent: `${(model.head_office[6].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.head_office[6].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     }
        //   ],
        //   branches: [
        //     // Фиксированное вознаграждение
        //     {
        //       ...model.branches[1],
        //       current_amount_percent: `${(model.branches[1].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[1].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Переменное вознаграждение
        //     {
        //       ...model.branches[3],
        //       current_amount_percent: `${(model.branches[3].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[3].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Разовые выплаты
        //     {
        //       ...model.branches[2],
        //       current_amount_percent: `${(model.branches[2].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[2].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Премии к праздникам и мат помощь с/х продукты
        //     {
        //       ...model.branches[4],
        //       current_amount_percent: `${(model.branches[4].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[4].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Материальная помощь
        //     {
        //       ...model.branches[5],
        //       current_amount_percent: `${(model.branches[5].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[5].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //     // Прочее
        //     {
        //       ...model.branches[6],
        //       current_amount_percent: `${(model.branches[6].current_amount / addMaxAmount).toFixed(1)}%`,
        //       comparison_amount_percent: `${(model.branches[6].comparison_amount / addMaxAmount).toFixed(1)}%`
        //     },
        //   ],
        // }

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
