// Core
import { defineStore } from 'pinia'
import { helpers, required } from "@vuelidate/validators"
// Services
import {
  fetchCreateAssignedEmpBranch,
  fetchCreateAssignedEmpDepartment, fetchDeleteAssignedEmp,
  fetchDeleteAssignedEmpBranch,
  fetchDeleteAssignedEmpDepartment,
  fetchGetAssignedBranchList,
  fetchGetAssignedDepList,
  fetchGetAssignedEmpList,
} from "@/modules/Settings/services/deparmentAssigment.service"
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
import { dispatchNotify } from "@/utils/notify"
import { COLOR_TYPES } from "@/enums"
import { adjustCompanyObjectToArray, adjustDepartmentObjectToArray, adjustUserObjectToArray } from "@/utils"

export const useDepartmentAssignmentStore = defineStore("departmentAssignmentStore", {
  state:() => ({
    empListLoading: false,
    empList: [],
    empTotalCount: 0,
    depBranchListLoading: false,
    depTotalCount: 0,
    depBranchList: [],
    branchList: [],
    buttonLoading: false,
    updateGetLoading: false,
    deletingAssignedEmpId: null,
    deleteDialogVisible: false,
    deleteButtonLoading: false,
    empHeaders: [
      {
        header: "employee",
        field: "employee",
        width: "35%",
        active: true
      },
      {
        header: "position",
        field: "position",
        width: "30%",
        active: true
      },
      {
        header: "status",
        field: "status",
        width: "20%",
        active: true
      },
      {
        header: "actions",
        field: "actions",
        width: "15%",
        active: true
      }
    ],
    depHeaders: [
      {
        header: "structural-division",
        field: "name",
        active: true
      },
      {
        header: "actions",
        field: "actions",
        width: "15%",
        active: true
      },
    ],
    dialog: false,
    model: {
      hr_user: null,
      department_ids: null,
      branch_ids: null,
      __hr_user: null,
      __departments: null,
      __branches: null,
    },
    rules: {}
  }),
  actions: {
    async actionGetAssignedEmpList(params = {}) {
      this.empListLoading  = true
      try {
        const { data } = await fetchGetAssignedEmpList({...params, page: 1, page_size: 50})
        this.empList = data.results
        this.depBranchList = []
      } catch (error) {}
      finally {
        this.empListLoading = false
      }
    },
    /** **/
    initValidationRules() {
      // custom validator — ensures at least one field filled
      const atLeastOneRequired = helpers.withMessage(
        'Нужно заполнить хотя бы одно поле: Департамент или Филиал',
        (value, vm) => {
          const {__departments, __branches} = vm || {}
          return (
            (__departments && __departments.length > 0) ||
            (__branches && __branches.length > 0)
          )
        }
      )

      this.rules = {
        __hr_user: {
          required: helpers.withMessage('Поле не должен быть пустым', required)
        },
        __departments: { atLeastOneRequired },
        __branches: { atLeastOneRequired }
      }
    },
    /** **/
    async actionManage(formType, t, route) {
      const hasDep = this.model.__departments?.length > 0
      const hasBranch = this.model.__branches?.length > 0

      const model = {
        hr_user: this.model.__hr_user.id,
        ...(hasDep && {
          department_ids: this.model.__departments.map(item => item.id)
        }),
        ...(hasBranch && {
          branch_ids: this.model.__branches.map(item => item.id)
        })
      }

      await this.actionCreateAssignedEmp(model, hasDep, hasBranch, t, formType)

      if (formType.value === FORM_TYPE_UPDATE && route.query.hr_user_id) {
        await this.actionGetDepBranchList(route.query.hr_user_id)
      }
    },
    /** **/
    async actionCreateAssignedEmp(model, hasDep, hasBranch, t, formType) {
      try {
        if (hasDep) {
          await fetchCreateAssignedEmpDepartment(model)
        }
        if (hasBranch) {
          await fetchCreateAssignedEmpBranch(model)
        }
        this.dialog = false
        dispatchNotify(null, t('successfully-saved'), COLOR_TYPES.SUCCESS)
        if (formType.value === FORM_TYPE_CREATE) {
          await this.actionGetAssignedEmpList()
          this.depBranchList = []
        }
        await Promise.resolve()
      } catch (error) {
        await Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionGetDepBranchList(hr_user_id = null) {
      if (!hr_user_id) return

      this.depBranchListLoading = true
      this.depBranchList = [] // optional: reset before loading

      const params = {
        hr_user: hr_user_id,
        page: 1,
        page_size: 50,
      }

      try {
        // Fetch both lists in parallel
        const [depRes, branchRes] = await Promise.all([
          fetchGetAssignedDepList(params),
          fetchGetAssignedBranchList(params),
        ])

        // Combine both results in one array
        this.depBranchList = [
          ...(depRes?.data?.results || []).map(item => ({
            dep_item_id: item.id,
            name: item?.department?.name,
            type: 'department',
          })),
          ...(branchRes?.data?.results || []).map(item => ({
            branch_item_id: item.id,
            name: item?.branch?.name,
            type: 'branch',
          })),
        ]

        return {
          departments: depRes?.data?.results.map(item => ({ id: item.department?.id })) || [],
          branches: branchRes?.data?.results.map(item => ({ id: item.branch?.id })) || [],
        }
      } catch (error) {
        await Promise.reject(error)
      } finally {
        this.depBranchListLoading = false
      }
    },
    /** **/
    async actionAdjustModelFields(row) {
      this.updateGetLoading = true
      this.dialog = true
      try {
        // Fetch departments and branches for the selected user
        const body = await this.actionGetDepBranchList(row.id)

        // Adjust and assign model fields
        this.model.__hr_user = await adjustUserObjectToArray([], row.id, false)
        this.model.__departments = await adjustDepartmentObjectToArray(body.departments)
        this.model.__branches = await adjustCompanyObjectToArray(body.branches)
      } catch (error) {
        console.error('Error adjusting model fields:', error)
      } finally {
        // Always stop loading, even if an error occurs
        this.updateGetLoading = false
      }
    },
    /** **/
    async actionDeleteAssignedDepBranch(payload, route, t){
      try {
        if (payload.dep_item_id) {
          await fetchDeleteAssignedEmpDepartment(payload.dep_item_id)
        } else if (payload.branch_item_id) {
          await fetchDeleteAssignedEmpBranch(payload.branch_item_id)
        }
        dispatchNotify(null, t('successfully-deleted'), COLOR_TYPES.SUCCESS)
      } catch (error) {}
      finally {
        if (route.query.hr_user_id) {
          await this.actionGetDepBranchList(route.query.hr_user_id)
        }
      }
    },
    /** **/
    async actionDeleteAssignedEmp(t) {
      this.deleteButtonLoading = true
      try {
        await fetchDeleteAssignedEmp(this.deletingAssignedEmpId)
        await this.actionGetAssignedEmpList()
        this.deleteDialogVisible = false
        dispatchNotify(null, t('successfully-deleted'), COLOR_TYPES.SUCCESS)
      } catch (error) {}
      finally {
        this.deleteButtonLoading = false
      }
    },
    /** **/
    actionResetModel() {
      const m = this.model
      m.hr_user = null
      m.department_ids = null
      m.branch_ids = null
      m.__hr_user = null
      m.__departments = null
      m.__branches = null
    },
    /** **/
    resetEmpHeaders() {
      this.empHeaders = [
        {
          header: "employee",
          field: "employee",
          active: true
        },
        {
          header: "position",
          field: "position",
          active: true
        },
        {
          header: "status",
          field: "status",
          active: true
        },
        {
          header: "actions",
          field: "actions",
          active: true
        }
      ]
    }
  }
})
