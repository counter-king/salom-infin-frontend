import { defineStore } from "pinia"
import {
  fetchUsersList,
  fetchEmployeeGroupsList,
  fetchEmployeeGroupsCreate
} from "@/services/users.service"

export const useUsersStore = defineStore("users", {
  state: () => ({
    usersList: [],
    employeeGroupsList: []
  }),
  actions: {
    /**
     * Возвращает список пользователей
     * @returns Promise
     * */
    async actionUsersList(payload = {}) {
      let { data } = await fetchUsersList(payload.params)
      this.usersList = data.results

      return Promise.resolve(data.results)
    },
    /**
     * Возвращает список группа сотрудников
     * @returns Promise
     * */
    async actionEmployeeGroupList(payload = {}) {
      let { data } = await fetchEmployeeGroupsList(payload.params)
      this.employeeGroupsList = data.results

      return Promise.resolve(data.results)
    },
    /**
     * Создать список групп сотрудников
     * @returns {Object}
     * */
    async actionEmployeeGroupCreate(payload) {
      let { data } = await fetchEmployeeGroupsCreate(payload)
      this.employeeGroupsList.push(data)
    }
  }
})
