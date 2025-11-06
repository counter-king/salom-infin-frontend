// Core
import { defineStore } from 'pinia'
import { helpers, required } from "@vuelidate/validators"
import { dispatchNotify } from "@/utils/notify"
import { COLOR_TYPES } from "@/enums"
// Services
import {
  fetchCreateExceptionEmployees,
  fetchGetExceptionEmployeesList,
  fetchMakeExceptionEmployeesInactive
} from "@/modules/HR/modules/Attendance/services"

export const useExceptionEmployeesStore = defineStore("exceptionEmployees", {
  state:() => ({
    filterParams: {
      page: 1,
      page_size: 10,
    },
    dialog: false,
    deleteDialog: false,
    deleteLoading: false,
    list: [],
    listLoading: false,
    totalCount: 0,
    buttonLoading: false,
    selectedItems: [],
    model: {
      __users: null,
      __comment: null,
    },
    rules: {
      __users: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __comment: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      }
    },
    deactivation_comment: null,
    headers: [
      {
        header: "employee",
        field: "user",
        width: "20%",
        active: true
      },
      {
        header: "branch",
        field: "company",
        width: "15%",
        active: true
      },
      {
        header: "department",
        field: "department",
        width: "20%",
        active: true
      },
      {
        header: "position",
        field: "position",
        active: true
      },
      {
        header: "valid-from",
        field: "valid_from",
        active: true
      },
      {
        header: "valid-to",
        field: "valid_to",
        active: true
      },
      {
        header: "status",
        field: "is_active",
        active: true
      },
    ]
  }),
  actions: {
    async actionGetExceptionEmployees(params = {}) {
      this.listLoading = true
      try {
        const { data } = await fetchGetExceptionEmployeesList(params)
        this.list = data.results
        this.totalCount = data.count
        await Promise.resolve(data)
      } catch (error) {}
      finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionCreateExceptionEmployee(t) {
      this.buttonLoading = true
      try {
        await fetchCreateExceptionEmployees({
          user_ids: this.model.__users.map((user) => user.id),
          comment: this.model.__comment,
        })
        dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
        await this.actionGetExceptionEmployees(this.filterParams)
        this.dialog = false
      } catch (error) {}
      finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionDeactivate(t, route) {
      this.deleteLoading = true
      try {
        await fetchMakeExceptionEmployeesInactive({
          ids: this.selectedItems.map((item) => item.id),
          comment: this.deactivation_comment
        })
        dispatchNotify(null, t('success'), COLOR_TYPES.SUCCESS)
        this.deleteDialog = false
        await this.actionGetExceptionEmployees(route.query)
        this.actionResetModel()
      } catch (error) {}
      finally {
        this.deleteLoading = false
      }
    },
    /** **/
    actionResetModel() {
      const m = this.model
      m.__users = null
      m.__comment = null
      this.selectedItems = []
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "employee",
          field: "user",
          width: "20%",
          active: true
        },
        {
          header: "branch",
          field: "company",
          width: "15%",
          active: true
        },
        {
          header: "department",
          field: "department",
          width: "20%",
          active: true
        },
        {
          header: "position",
          field: "position",
          active: true
        },
        {
          header: "valid-from",
          field: "valid_from",
          active: true
        },
        {
          header: "valid-to",
          field: "valid_to",
          active: true
        },
        {
          header: "status",
          field: "is_active",
          active: true
        },
      ]
    }
  }
})
