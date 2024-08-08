// Core
import { defineStore } from 'pinia'
import AES256 from 'aes-everywhere'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import { fetchVerifyNumber } from '@/modules/Auth/services'
import { fetchSetPasscode, fetchCheckPasscode } from '../../services/profile/salary.service'

export const useSalaryStore = defineStore('salary-store', {
  state: () => ({
    list: [
      {
        salary_date: 1,
        naming: 1222,
        tax: 1333,
        total_sum: 144444,
        on_hand: 15555555
      },
      {
        salary_date: 2,
        naming: 2222,
        tax: 3333,
        total_sum: 4444,
        on_hand: 5555
      }
    ],
    headers: [
      {
        header: 'Дата зарплаты',
        field: 'salary_date',
        active: true
      },
      {
        header: 'Наименование',
        field: 'naming',
        active: true
      },
      {
        header: 'Налог',
        field: 'tax',
        active: true
      },
      {
        header: 'Общая сумма',
        field: 'total_sum',
        active: true
      },
      {
        header: 'В руки',
        field: 'on_hand',
        active: true
      },
    ],
    listLoading: false,
    totalCount: 0,
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
    async checkPasscode() {
      try {
        let model = {
          passcode: AES256.encrypt(
            this.checkPasscodeModel.passcode,
            'ZuOa1haz0BcpadBJ2wKQlnNbYt3BP38CZpGmDJxTlfFtYrMUOd'
          )
        }

        await fetchCheckPasscode(model)
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
    }
  }
})
