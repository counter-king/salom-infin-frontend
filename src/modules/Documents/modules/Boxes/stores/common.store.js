// Core
import { defineStore } from "pinia"
// Service
import {
  fetchCreateResolution,
  fetchResolutionList,
  fetchResolutionById,
  fetchUpdateResolutionById,
  fetchDeleteResolutionById
} from "../services/common.service"
// Utils
import { clearModel, setValuesToKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { RESOLUTION_TYPES, RESOLUTION_CREATE_TYPES, COLOR_TYPES } from "@/enums"

export const useBoxesCommonStore = defineStore("boxes-common", {
  state: () => ({
    createdResolutionsList: {
      label: 'created-resolutions',
      items: []
    },
    resolutionModel: {
      id: null,
      assignees: [],
      content: null,
      deadline: null,
      reviewer: null,
      parent: null,
      is_project_resolution: true,
      type: RESOLUTION_TYPES.ASSIGNMENT,
      __assignees: [],
      __controllers: [],
    },
    resolutionsList: []
  }),
  actions: {
    /**
     * Создать резолюцию
     * */
    async actionCreateResolution({ resolutionListId, reviewId, parentId, resolutionCreateType }) {
      let { __assignees, __controllers } = this.resolutionModel
      let assignees = __assignees.map(item => ({ user: item.id, is_responsible: false }))
      let controllers = __controllers.length
        ? __controllers.map(item => ({ user: item.id, is_controller: true }))
        : []
      /*
      * is_project_resolution должен быть true в разделе на рассмотрение
      * должен быть false в разделе входящие
      * */
      if(RESOLUTION_CREATE_TYPES.ASSIGNMENT === resolutionCreateType) {
        this.resolutionModel.is_project_resolution = false
      }

      if(this.resolutionModel.type === RESOLUTION_TYPES.CONTROL) {
        this.resolutionModel.assignees = [...assignees, ...controllers]
      }
      else {
        this.resolutionModel.assignees = assignees
      }

      this.resolutionModel.reviewer = reviewId
      this.resolutionModel.parent = parentId

      try {
        await fetchCreateResolution(this.resolutionModel)
        await this.actionResolutionsList({ id: resolutionListId })
        dispatchNotify('Резолюция создано', null, COLOR_TYPES.SUCCESS)
        clearModel(this.resolutionModel, ['type'])
        return Promise.resolve()
      } catch (error) {
        dispatchNotify('Ошибка', 'Ошибка создание резолюции', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Получает список созданных резолюции
    * */
    async actionResolutionsList({ id, params }) {
      let { data } = await fetchResolutionList({ document_id: id, params })
      this.createdResolutionsList.items = data.results.map((item, index) => ({
        label: `resolution #${ index + 1 }`,
        icon: 'DocumentTextIcon',
        resolution: item
      }))
    },
    /*
    * Получить созданную резолюцию по id
    * */
    async actionGetByIdResolution({ id }) {
      let { data } = await fetchResolutionById({ id })
      setValuesToKeys(this.resolutionModel, data)

      let assignees = data.assignees.filter(item => !item.is_controller)
      this.resolutionModel.__assignees = assignees.map(item => ({ ...item, __userId: item.user.id }))

      let controllers = data.assignees.filter(item => item.is_controller)
      this.resolutionModel.__controllers = controllers.length
        ? controllers.map(item => ({ ...item, __userId: item.user.id }))
        : []
    },
    /*
    * Изменить созданную резолюцию по id
    * */
    async actionUpdateByIdResolution({ resolutionCreateType }) {
      let { __assignees, __controllers } = this.resolutionModel
      let assignees = __assignees.map(assigner => {
        if(assigner.hasOwnProperty("__userId")) {
          return {
            id: assigner.id,
            user: assigner.__userId,
            is_responsible: assigner.is_responsible
          }
        } else {
          return {
            user: assigner.id,
            is_responsible: false
          }
        }
      })
      let controllers = __controllers.length
        ? __controllers.map(assigner => {
          if(assigner.hasOwnProperty("id")) {
            return {
              id: assigner.id,
              user: assigner.__userId,
              is_controller: assigner.is_controller
            }
          } else {
            return {
              user: assigner.id,
              is_controller: false
            }
          }
        })
      : []

      this.resolutionModel.assignees = [...controllers, ...assignees]

      // * is_project_resolution должен быть true в разделе на рассмотрение
      // * должен быть false в разделе входящие
      // * */
      if(RESOLUTION_CREATE_TYPES.ASSIGNMENT === resolutionCreateType) {
        this.resolutionModel.is_project_resolution = false
      }

      try {
        await fetchUpdateResolutionById({ id: this.resolutionModel.id, body: this.resolutionModel })
        dispatchNotify('Резолюция изменен', null, COLOR_TYPES.SUCCESS)
        clearModel(this.resolutionModel, ['type'])
        return Promise.resolve()
      } catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение резолюции', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Удалить созданную резолюцию
    * */
    async actionDeleteGetByIdResolution({ id, comment }) {
      await fetchDeleteResolutionById({ id, comment })
    }
  }
})
