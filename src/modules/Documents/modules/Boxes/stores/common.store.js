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
import { RESOLUTION_TYPES, RESOLUTION_CREATE_TYPES } from "@/enums"
export const useInnerStore = defineStore("inner", {
  state: () => ({
    resolutionMenuOptions: [],
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
      __assignees_source: [],
      __assignees_copy: [],
      __controllers: [],
      __controllers_source: [],
      __controllers_copy: []
    },
    resolutionsList: []
  }),
  actions: {
    /**
     * Создать резолюцию
     * */
    async actionCreateResolution({ reviewId, parentId, resolutionCreateType }) {
      let { __assignees_source, __controllers_source } = this.resolutionModel
      this.resolutionModel.assignees = [...__controllers_source, ...__assignees_source]
      this.resolutionModel.reviewer = reviewId
      this.resolutionModel.parent = parentId
      /*
      * is_project_resolution должен быть true в разделе на рассмотрение
      * должен быть false в разделе входящие
      * */
      if(RESOLUTION_CREATE_TYPES.ASSIGNMENT === resolutionCreateType) {
        this.resolutionModel.is_project_resolution = false
      }

      await fetchCreateResolution(this.resolutionModel)
    },
    /*
    * Получает список созданных резолюции
    * */
    async actionResolutionsList({ id, params }) {
      let { data } = await fetchResolutionList({ document_id: id, params })
      this.resolutionsList = data.results
    },
    /*
    * Получить созданную резолюцию по id
    * */
    async actionGetByIdResolution({ id }) {
      let { data } = await fetchResolutionById({ id })
      this.resolutionModel.id = data.id
      this.resolutionModel.assignees = data.assignees
      this.resolutionModel.content = data.content
      this.resolutionModel.deadline = data.deadline
      this.resolutionModel.reviewer = data.reviewer
      this.resolutionModel.parent = data.parent
      this.resolutionModel.is_project_resolution = data.is_project_resolution
      this.resolutionModel.type = data.type

      let assignees = data.assignees.filter(item => !item.is_controller)

      this.resolutionModel.__assignees = assignees.map(({ user }) => user.id)
      this.resolutionModel.__assignees_source = this.resolutionModel.__assignees_copy = assignees.map(item => {
        return {
          ...item,
          first_name: item.user.first_name,
          full_name: item.user.full_name,
          color: item.user.color,
          user: item.user.id
        }
      })

      let controllers = data.assignees.filter(item => item.is_controller)

      if(controllers.length) {
        this.resolutionModel.__controllers = controllers.map(({ user }) => user.id)
        this.resolutionModel.__controllers_source = this.resolutionModel.__controllers_copy = controllers.map(item => {
          return {
            ...item,
            first_name: item.user.first_name,
            full_name: item.user.full_name,
            color: item.user.color,
            user: item.user.id
          }
        })
      }
    },
    /*
    * Изменить созданную резолюцию по id
    * */
    async actionUpdateByIdResolution({ resolutionCreateType }) {
      let { __assignees_source, __controllers_source } = this.resolutionModel
      let controllers = []
      let assignees = __assignees_source.map(assigner => {
        if(assigner.hasOwnProperty("id")) {
          return {
            id: assigner.id,
            user: assigner.user,
            is_responsible: assigner.is_responsible,
          }
        } else {
          return {
            user: assigner.id,
            is_responsible: assigner.is_responsible,
          }
        }
      })
      /*
      * is_project_resolution должен быть true в разделе на рассмотрение
      * должен быть false в разделе входящие
      * */
      if(RESOLUTION_CREATE_TYPES.ASSIGNMENT === resolutionCreateType) {
        this.resolutionModel.is_project_resolution = false
      }

      if(__controllers_source && __controllers_source.length) {
        controllers = __controllers_source.map(assigner => {
          if(assigner.hasOwnProperty("id")) {
            return {
              id: assigner.id,
              user: assigner.user,
              is_controller: assigner.is_controller,
            }
          } else {
            return {
              user: assigner.id,
              is_controller: assigner.is_controller,
            }
          }
        })
      }

      this.resolutionModel.assignees = [...controllers, ...assignees]

      await fetchUpdateResolutionById({ id: this.resolutionModel.id, body: this.resolutionModel })
    },
    /*
    * Очистить модель созданную резолюцию по id
    * */
    actionClearResolutionModel() {
      this.resolutionModel = {
        id: null,
        assignees: [],
        content: null,
        deadline: null,
        reviewer: null,
        parent: null,
        is_project_resolution: true,
        type: RESOLUTION_TYPES.ASSIGNMENT,
        __assignees: [],
        __assignees_source: [],
        __assignees_copy: [],
        __controllers: [],
        __controllers_source: [],
        __controllers_copy: []
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
