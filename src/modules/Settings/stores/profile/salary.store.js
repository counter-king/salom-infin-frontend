// Core
import { defineStore } from 'pinia'
import AES256 from 'aes-everywhere'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import { fetchVerifyNumber } from '@/modules/Auth/services'
import { fetchSetPasscode, fetchCheckPasscode, fetchSalary, fetchSalaryStatistic } from '../../services/profile/salary.service'
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
      header: 'В руки',
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
          )
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
          phone_number: authStore.phone
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
    async getSalary(date = new Date().setDate('01')) {
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
    async getSalaryStatistic(date = new Date().getFullYear()) {
      try {
        this.statisticContentLoading = true

        let { data } = await fetchSalaryStatistic({
          passcode: getStorageItem('PASSCODE'),
          date
        })
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
