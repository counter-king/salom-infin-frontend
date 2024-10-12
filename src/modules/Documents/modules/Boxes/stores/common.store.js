// Core
import { defineStore } from "pinia"
// Components
import {
  ArrowRightDownIcon,
  CheckCircleIcon,
  EyeIcon,
  History2Icon,
  InboxUnreadIcon,
  Pen2Icon,
  DocumentTextIcon
} from '@/components/Icons'
// Store
import { useDocFlowStore } from '../../Registration/stores/docflow.store'
// Service
import {
  fetchCreateResolution,
  fetchResolutionList,
  fetchResolutionById,
  fetchUpdateResolutionById,
  fetchDeleteResolutionById
} from "../services/common.service"
// Utils
import { clearModel, isObject, setValuesToKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { RESOLUTION_TYPES, RESOLUTION_CREATE_TYPES, COLOR_TYPES } from '@/enums'
export const useBoxesCommonStore = defineStore('boxes-common', {
  state: () => ({
    routes: {
      title: 'boxes',
      icon: InboxUnreadIcon,
      link: 'BoxesIndex',
      children: [
        // На рассмотрении
        {
          title: 'for-review',
          icon: History2Icon,
          link: 'ReviewIndex',
          children: [],
          count: null,
          name: 'unread_for_review',
          permission: 'boxes-for-review-list'
        },
        // Моё поручение
        {
          title: 'my-assignment',
          icon: ArrowRightDownIcon,
          link: 'AssignmentIndex',
          children: [],
          count: null,
          name: 'unread_assignments',
          permission: 'boxes-my-assignment-list'
        },
        // На подпись
        {
          title: 'for_signing',
          icon: Pen2Icon,
          link: 'SignIndex',
          children: [],
          count: null,
          name: 'for_signature',
          permission: 'boxes-signers-list'
        },
        // На согласовании
        {
          title: 'for-approval',
          icon: EyeIcon,
          link: 'ApprovalIndex',
          children: [],
          count: null,
          name: 'for_approval',
          permission: 'boxes-approvers-list'
        },
        // На контроль
        {
          title: 'to-control',
          icon: CheckCircleIcon,
          link: 'ControlIndex',
          children: [],
          count: null,
          name: 'for_control',
          permission: 'boxes-my-controls-list'
        },
      ],
      count: null,
      permission: 'boxes'
    },
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
    responsibleIndex: 0,
    resolution: {
      signed: false,
      receipt_date: null,
      deadline: null,
      content: null,
      assignees: [],
      reviewer: null
    },
    componentKey: 0
  }),
  getters: {
    /*
    *
    * */
    getCreatedResolutionsList: state => !!state.createdResolutionsList.items.length
  },
  actions: {
    /**
     * Создать резолюцию
     * */
    async actionCreateResolution({ resolutionListId, reviewId, parentId, resolutionCreateType }) {
      const docFlowStore = useDocFlowStore()
      let { __assignees, __controllers } = this.resolutionModel
      let assignees = __assignees.map((item, index) => {
        return {
          user: item.id,
          is_responsible: this.responsibleIndex === index
            ? true :
            item.id === this.responsibleIndex
        }
      })

      let controllers = __controllers.length
        ? __controllers.map(item => ({ user: item.id, is_controller: true }))
        : []
      /*
      * is_project_resolution должен быть true в разделе на рассмотрение
      * должен быть false в разделе мои поручение
      * */
      this.resolutionModel.is_project_resolution = RESOLUTION_CREATE_TYPES.ASSIGNMENT !== resolutionCreateType

      if(this.resolutionModel.type === RESOLUTION_TYPES.CONTROL) {
        this.resolutionModel.assignees = [...controllers, ...assignees]
      }
      else {
        this.resolutionModel.assignees = assignees
      }

      this.resolutionModel.reviewer = reviewId
      this.resolutionModel.parent = parentId

      try {
        let { data } = await fetchCreateResolution(this.resolutionModel)
        await this.actionResolutionsList({ id: resolutionListId })
        await docFlowStore.actionGetTree(resolutionListId)
        await this.actionSetActiveResolution({
          signed: false,
          receipt_date: null,
          deadline: data.deadline,
          content: data.content,
          assignees: data.assignees,
          reviewer: data.reviewer.user
        })
        dispatchNotify(null, 'Резолюция создано', COLOR_TYPES.SUCCESS)
        clearModel(this.resolutionModel, ['type'])
        // Сбросим нумерацию
        this.actionSetResponsibleIndex(0)
        return Promise.resolve()
      } catch (error) {
        // dispatchNotify('Ошибка', 'Ошибка создание резолюции', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Получает список созданных резолюции
    * */
    async actionResolutionsList({ id, params }) {
      let { data } = await fetchResolutionList({ document_id: id, params })
      this.createdResolutionsList.items = data.results.map((item, index) => ({
        label: `Резолюция #${ index + 1 }`,
        icon: DocumentTextIcon,
        resolution: item
      }))
    },
    /*s
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

      let responsibleUser = assignees.find(item => item.is_responsible)
      this.actionSetResponsibleIndex(responsibleUser)
    },
    /*
    * Изменить созданную резолюцию по id
    * */
    async actionUpdateByIdResolution({ resolutionListId, resolutionCreateType }) {
      const docFlowStore = useDocFlowStore()

      let { __assignees, __controllers } = this.resolutionModel
      let assignees = __assignees.map(assigner => {
        if(assigner.hasOwnProperty("__userId")) {
          return {
            id: assigner.id,
            user: assigner.__userId,
            is_responsible: assigner.__userId === this.responsibleIndex
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
          if(assigner.hasOwnProperty("__userId")) {
            return {
              id: assigner.id,
              user: assigner.__userId,
              is_controller: assigner.is_controller
            }
          } else {
            return {
              user: assigner.id,
              is_controller: true
            }
          }
        })
      : []

      this.resolutionModel.assignees = [...controllers, ...assignees]

      /*
      * is_project_resolution должен быть true в разделе на рассмотрение
      * должен быть false в разделе мои поручение
      * */
      this.resolutionModel.is_project_resolution = RESOLUTION_CREATE_TYPES.ASSIGNMENT !== resolutionCreateType

      try {
        let { data } = await fetchUpdateResolutionById({ id: this.resolutionModel.id, body: this.resolutionModel })
        await docFlowStore.actionGetTree(resolutionListId)
        await this.actionSetActiveResolution({
          signed: false,
          receipt_date: null,
          deadline: data.deadline,
          content: data.content,
          assignees: data.assignees,
          reviewer: data.reviewer.user
        })
        dispatchNotify(null, 'Резолюция изменен', COLOR_TYPES.SUCCESS)
        clearModel(this.resolutionModel, ['type'])
        return Promise.resolve()
      } catch (error) {
        // dispatchNotify('Ошибка', 'Ошибка изменение резолюции', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Удалить созданную резолюцию
    * */
    async actionDeleteGetByIdResolution({ id, resolutionListId, comment }) {
      const docFlowStore = useDocFlowStore()

      try {
        await fetchDeleteResolutionById({ id, comment })
        dispatchNotify(null, 'Резолюция удален', COLOR_TYPES.SUCCESS)
        await this.actionResolutionsList({ id: resolutionListId })
        await docFlowStore.actionGetTree(resolutionListId)
        await this.actionSetActiveResolution({
          signed: false,
          receipt_date: null,
          deadline: null,
          content: null,
          assignees: [],
          reviewer: null
        })
        clearModel(this.resolutionModel, ['type'])
        // Сбросим нумерацию
        this.actionSetResponsibleIndex(0)
        return Promise.resolve()
      } catch(error) {
        // dispatchNotify('Ошибка', 'Ошибка удаление резолюции', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Назначить пользователя отв. исполнителем
    * */
    actionSetResponsibleIndex(payload) {
      if(payload === null || payload === undefined) {
        dispatchNotify(null, 'Ответственный исполнитель не найден', COLOR_TYPES.ERROR)

        return
      }

      if(isObject(payload.user)) {
        this.responsibleIndex = payload.user.id
      }
      else {
        this.responsibleIndex = payload
      }
    },
    /*
    *
    * */
    async actionSetActiveResolution({ signed, receipt_date, deadline, content, assignees, reviewer }) {
      Object.assign(this.resolution, { signed, receipt_date, deadline, content, assignees, reviewer })
    },
    /*
    *
    * */
    actionRerenderComponent() {
      this.componentKey += 1
    }
  }
})
