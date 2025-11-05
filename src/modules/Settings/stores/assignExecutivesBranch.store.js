// Core
import { defineStore } from 'pinia'
import { helpers, required } from "@vuelidate/validators"
// Enums
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
import { adjustCompanyObjectToArray, adjustUserObjectToArray } from "@/utils"
// Services
import {
  fetchAssignExecutivesBranchList,
  fetchCreateAssignExecutivesBranch
} from "@/modules/Settings/services/assignExecutives.service"

export const useAssignExecutivesBranchStore = defineStore("assignExecutivesBranch", {
  state: () => ({
    dialog: false,
    totalCount: 0,
    listLoading: false,
    buttonLoading: false,
    detailLoading: false,
    assignExecutiveList: [],
    responsibleIndex: null,
    headers: [
      {
        header: "branch",
        field: "branch",
        active: true
      },
      {
        header: "leader",
        field: "leader",
        active: true
      },
      {
        header: "assistants",
        field: "assistants",
        active: true
      },
      {
        header: "actions",
        field: "actions",
        active: true
      },
    ],
    model: {
      __branch: null,
      __users: null
    },
    rules: {
      __branch: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __users: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      }
    }
  }),
  actions: {
    async actionGetAssignExecutivesList(params = {}) {
      this.listLoading = true
      try {
        const {data} = await fetchAssignExecutivesBranchList(params)
        this.assignExecutiveList = data.results
        this.totalCount = data.count
      } catch (error) {
      } finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionManage(row) {
      this.detailLoading = true
      this.dialog = true

      const users = [
        ...(row.leader ? [{id: row.leader.id}] : []),
        ...(row.assistants?.map(u => ({id: u.id})) || []),
      ]

      if (row.leader) this.responsibleIndex = row.leader.id

      this.model.__branch = await adjustCompanyObjectToArray([], row.branch?.id, false)
      this.model.__users = users.length ? await adjustUserObjectToArray(users) : []

      this.detailLoading = false
    },
    /** **/
    async actionCreateAssignExecutivesBranch(t, route) {
      this.buttonLoading = true

      const users = this.model.__users.map(u => u.id)
      const sortedManagers = [
        this.responsibleIndex,
        ...users.filter(id => id !== this.responsibleIndex)
      ]

      const body = {
        object_id: this.model.__branch.id,
        managers_ids: sortedManagers
      }

      try {
        await fetchCreateAssignExecutivesBranch(body)
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
      m.__branch = null
      m.__users = []
      this.responsibleIndex = null
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "branch",
          field: "branch",
          active: true
        },
        {
          header: "leader",
          field: "leader",
          active: true
        },
        {
          header: "assistants",
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

