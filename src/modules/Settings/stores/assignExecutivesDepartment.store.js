// Core
import { defineStore } from 'pinia'
import { helpers, required } from "@vuelidate/validators"
// Enums
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
import { adjustDepartmentObjectToArray, adjustUserObjectToArray } from "@/utils"
// Services
import {
  fetchAssignExecutivesDepartmentList,
  fetchCreateAssignExecutivesDepartment
} from "@/modules/Settings/services/assignExecutives.service"
import { useAuthStore } from "@/modules/Auth/stores";

export const useAssignExecutivesDepartmentStore = defineStore("assignExecutivesDepartment", {
  state:() => ({
    dialog: false,
    totalCount: 0,
    listLoading: false,
    buttonLoading: false,
    detailLoading: false,
    assignExecutiveList: [],
    responsibleIndex: null,
    headers: [
      {
        header: "department",
        field: "department",
        width: "40%",
        active: true
      },
      {
        header: "leader",
        field: "leader",
        active: true
      },
      {
        header: "deputy",
        field: "assistants",
        active: true
      },
      {
        header: "actions",
        field: "actions",
        active: true
      },
    ],
    departmentId: null,
    model: {
      __department: null,
      __users: null
    },
    rules: {
      __department: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __users: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      }
    }
  }),
  actions: {
    async actionGetAssignExecutivesList(params = {}) {
      const currentUser = useAuthStore().currentUser
      this.listLoading = true
      try {
        const { data } = await fetchAssignExecutivesDepartmentList({
          ...params,
          company: currentUser.company?.id
        })
        this.assignExecutiveList = data.results
        this.totalCount = data.count
      }catch (error) {}
      finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionManage(row) {
      this.departmentId = row.department?.id
      this.detailLoading = true
      this.dialog = true

      const users = [
        ...(row.leader ? [{id: row.leader.id}] : []),
        ...(row.assistants?.map(u => ({id: u.id})) || []),
      ]

      if (row.leader) this.responsibleIndex = row.leader.id

      this.model.__department = await adjustDepartmentObjectToArray([], row.department?.id, false)
      this.model.__users = users.length ? await adjustUserObjectToArray(users) : []

      this.detailLoading = false
    },
    /** **/
    async actionCreateAssignExecutivesDepartment(t, route) {
      this.buttonLoading = true

      const users = this.model.__users.map(u => u.id)
      const sortedManagers = [
        this.responsibleIndex,
        ...users.filter(id => id !== this.responsibleIndex)
      ]

      const body = {
        object_id: this.model.__department.id,
        managers_ids: sortedManagers
      }

      try {
        await fetchCreateAssignExecutivesDepartment(body)
        this.dialog = false
        dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
        await this.actionGetAssignExecutivesList(route.query)
      } catch (error) {
        await Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    actionResetModel() {
      const m = this.model
      m.__department = null
      m.__users = []
      this.responsibleIndex = null
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "department",
          field: "department",
          width: "40%",
          active: true
        },
        {
          header: "leader",
          field: "leader",
          active: true
        },
        {
          header: "deputy",
          field: "assistants",
          active: true
        },
        {
          header: "actions",
          field: "actions",
          active: true
        },
      ]
    }
  }
})
