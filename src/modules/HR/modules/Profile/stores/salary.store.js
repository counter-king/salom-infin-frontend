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

const defaultStore = {
  salaryList: [],
  salaryStatisticList: [],
  salarySeries: [{
    name: 'Salary',
    data: []
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

export const useSalaryStore = defineStore('salary-store', {
  state: () => ({
    ...defaultStore
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
          date: formatDate(date)
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
          date
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

        this.salarySeries[0].data = data.results.map(salary => salary.monthly_salary)

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
