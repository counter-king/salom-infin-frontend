// Core
import { defineStore } from 'pinia'
import AES256 from 'aes-everywhere'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import { fetchVerifyNumber } from '@/modules/Auth/services'
import { fetchSetPasscode, fetchCheckPasscode, fetchSalary, fetchSalaryStatistic } from '../services/salary.service'
// Utils
import { saveStorageItem, getStorageItem } from '@/utils/storage'
import { formatDate } from '@/utils/formatDate'
import {ref} from "vue";
import {formatNumberWithFloat} from "@/utils";

const defaultStore = {
  salaryList: [],
  salaryStatisticList: [],
  salarySeries: [{
    name: 'Salary',
    data: [],
    list: []
  }],
  headers: [
    {
      header: 'Наименование',
      field: 'pay_name',
      active: true
    },
    {
      header: 'Описания',
      field: 'paid',
      active: true
    },
  ],
  isLoggedIn: false,
  contentLoading: false,
  statisticContentLoading: false,
  setPasscodeModel: {
    passcode: null
  },
  checkPasscodeModel: {
    passcode: null
  },
  verifyNumberModel: {
    phone_number: null,
    otp_code: null
  }
}

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь ', 'Ноябрь', 'Декабрь']

export const useSalaryStore = defineStore('salary-stores', {
  state: () => ({
    ...defaultStore,
    salaryOptions: {
      chart: {
        height: 275,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Статистика',
        align: 'left',
        style: {
          fontSize: '16px',
          fontFamily: 'SFProDisplay-Semibold',
          color: '#191F3F'
        }
      },
      stroke: {
        curve: 'straight',
        lineCap: 'round',
        colors: ['#635AFF'],
        width: 4
      },
      grid: {
        borderColor: '#E2E8F0',
        strokeDashArray: 10,
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 1
        },
      },
      markers: {
        size: 6,
        strokeWidth: 3,
        colors: '#635AFF',
        hover: {
          size: 10,
          sizeOffset: 10
        }
      },
      tooltip: {
        custom({ series, seriesIndex, dataPointIndex, w }) {
          return `<div class="min-w-[110px] bg-primary-900 rounded-lg text-white text-center py-[6px] px-2">
        <span class=" opacity-80">${w.globals.categoryLabels[dataPointIndex]}</span>
        <div class="flex gap-1 justify-center text-sm">
          <span class="font-medium">${ formatNumberWithFloat(series[seriesIndex][dataPointIndex])}</span>
          <span class="font-regular">сум</span>
        </div>
      </div>`
        }
      },
      xaxis: {
        categories: months,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return String(parseInt(value)).length <= 9 ? `${value / 1e6} млн` : `${value / 1e9} млрд`
          },
        }
      }
    }
  }),
  actions: {
    async setPasscode() {
      const authStore = useAuthStore()

      try {
        let model = {
          passcode: AES256.encrypt(
            this.setPasscodeModel.passcode,
            'ZuOa1haz0BcpadBJ2wKQlnNbYt3BP38CZpGmDJxTlfFtYrMUOd'
          ),
          phone_number: authStore.currentUser.phone
        }

        await fetchSetPasscode(model)
        await authStore.actionUserProfile()
        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
    },
    /**
     *
     * */
    async login() {
      try {
        let model = {
          passcode: AES256.encrypt(
            this.checkPasscodeModel.passcode,
            'ZuOa1haz0BcpadBJ2wKQlnNbYt3BP38CZpGmDJxTlfFtYrMUOd'
          )
        }

        await fetchCheckPasscode(model)
        saveStorageItem('PASSCODE', model.passcode)
        this.isLoggedIn = true
        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
    },
    /**
     *
     * */
    async verifyNumber() {
      const authStore = useAuthStore()

      try {
        let model = {
          ...this.verifyNumberModel,
          phone_number: authStore.currentUser.phone
        }

        await fetchVerifyNumber(model)
        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
    },
    /**
     *
     * */
    async getSalary(date = new Date(new Date().setDate('01'))) {
      try {
        this.contentLoading = true

        let { data } = await fetchSalary({
          passcode: getStorageItem('PASSCODE'),
          date: formatDate(date),
          page_size: 50
        })
        this.salaryList = data.results
        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {
        setTimeout(() => {
          this.contentLoading = false
        }, 500);
      }
    },
    /**
     *
     * */
    async getSalaryStatistic(date = new Date().getFullYear().toString()) {
      try {
        this.statisticContentLoading = true

        let { data } = await fetchSalaryStatistic({
          passcode: getStorageItem('PASSCODE'),
          date,
          page_size: 50
        })
        // const model = [
        //   {
        //     "month_value": "1",
        //     "monthly_salary": "500000000"
        //   },
        //   {
        //     "month_value": "2",
        //     "monthly_salary": "300000000"
        //   },
        //   {
        //     "month_value": "3",
        //     "monthly_salary": "400000000"
        //   },
        //   {
        //     "month_value": "4",
        //     "monthly_salary": "100000000"
        //   },
        //   {
        //     "month_value": "5",
        //     "monthly_salary": "1000000000"
        //   },
        //   {
        //     "month_value": "6",
        //     "monthly_salary": "700000000"
        //   },
        //   {
        //     "month_value": "7",
        //     "monthly_salary": "200000000"
        //   },
        //   {
        //     "month_value": "8",
        //     "monthly_salary": "800000000"
        //   },
        //   {
        //     "month_value": "9",
        //     "monthly_salary": "500000000"
        //   },
        //   {
        //     "month_value": "10",
        //     "monthly_salary": "1500000000"
        //   },
        //   {
        //     "month_value": "11",
        //     "monthly_salary": "2500000000"
        //   },
        //   {
        //     "month_value": "12",
        //     "monthly_salary": "900000000"
        //   }
        // ]
        //
        // this.salarySeries[0].data = date === '2025'
        //   ? model.slice(0, 4).map(salary => salary.monthly_salary)
        //   : data.results.map(salary => salary.monthly_salary)

        const monthRange = {
          start: data.results[0]?.month_value - 1 ?? '0',
          end: data.results[data.results.length - 1]?.month_value ?? '0'
        }

        this.salaryOptions.xaxis.categories = months.slice(monthRange.start, monthRange.end)
        this.salarySeries[0].data = data.results.map(salary => salary.monthly_salary)
        this.salarySeries[0].list = data.results

        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {
        setTimeout(() => {
          this.statisticContentLoading = false
        }, 500);
      }
    },
    /**
     *
     * */
    resetStore() {
      Object.assign(this, defaultStore)
    }
  }
})
