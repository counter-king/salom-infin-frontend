// Core
import { defineStore } from 'pinia'
// Utils
import { helpers, required } from "@vuelidate/validators"
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentDetail, fetchGetLinkedDocumentsList, fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service"
import {
  adjustObjectToArray, adjustTagObjectToArray,
  adjustTopSignerObjectToArray,
  adjustUserObjectToArray,
  removeKeysWithDoubleUnderscore
} from "@/utils";
import { nextTick } from "vue"
import { withAsync } from "@/utils/withAsync"
// Store
import { useCountStore } from "@/stores/count.store"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { useDecreeStore } from "@/modules/Documents/modules/SendDocuments/stores/decree.store";
import {
  fetchBusinessTripDetail,
  fetchUpdateBusinessTripVerification
} from "@/modules/HR/modules/BusinessTrip/services";
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES } from "@/enums";

export const useExtendBusinessTripStore = defineStore("sd-extend-business-trip-store", {
  state: () => ({
    buttonLoading: false,
    userTripUpdateButtonLoading: false,
    detailLoading: false,
    changingBTDialog: false,
    changingBTLoading: false,
    changingBTModel: null,
    tempVerifications: [],
    tempRegions: [],
    tempGroupIndex: null,
    model: {
      approvers: [],
      company: null,
      content: null,
      curator: null,
      document_type: null,
      document_sub_type: null,
      journal: null,
      notices: [],
      start_date: null,
      end_date: null,
      short_description: "Xizmat safarini o'zgartirish to'g'risida",
      sender: null,
      signers: [],
      files: [],
      __files: [],
      __usersList: [],
      __users: [],
      __notices: [],
      __groups: [
        {
          __notices_to_change: [],
        }
      ],
      __curator: null,
      __approvers: [],
      __signers: [],
    },
    rules: {
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      short_description: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
    }
  }),
  actions: {
    async actionGetParentDocumentDetail(id) {
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)

        await this.actionAdjustModel(data)

      } catch(error) {

      } finally {
        this.detailLoading = false
      }
    },
    /** **/ async actionAdjustModel(data) {
      this.model.__notices = data.notices

      const array = Object.values(
        data.notices.reduce((acc, notice) => {
          const groupId = notice.group_id
          acc[groupId] = acc[groupId] || {group_id: groupId, items: []}
          acc[groupId].items.push(notice)
          return acc
        }, {})
      )

      this.model.__groups = await Promise.all(
        array.map(async (group) => {
          const __users = await Promise.all(
            group.items.map(async (childItem) => {
              const user = await adjustUserObjectToArray([], childItem.user.id, false)
              return {
                ...user,
                business_trip_id: childItem.id
              }
            })
          )

          return {
            __users,
            __notices_to_change: [],
            group_id: group.group_id,
          }
        })
      )
    },
    /** **/
    async actionAddUsersToExtend(group, groupIndex) {
      await nextTick() // wait for v-model to update

      const selectedUsers = this.model.__groups[groupIndex].__users_to_extend || []

      const item = this.model.__notices.find(notice =>
        selectedUsers.some(user => user.id === notice.user.id && notice.group_id === group.group_id)
      )

      if (!item) return

      const groupData = this.model.__groups[groupIndex]
      if (!Array.isArray(groupData.__notices_to_change)) {
        this.$set(groupData, '__notices_to_change', [])
      }
      const alreadyExists = groupData.__notices_to_change.some(n => n.id === item.id || n.parent_id === item.id)

      if (alreadyExists) {
        this.tempGroupIndex = groupIndex
        this.actionClearTempModel()
        return
      }

      this.changingBTModel = item
      this.tempGroupIndex = groupIndex
      this.changingBTLoading = true
      this.changingBTDialog = true

      setTimeout(() => {
        this.changingBTLoading = false
      }, 2000)

      const res = await fetchBusinessTripDetail(item.id)

      this.tempVerifications = res?.data?.verifications.filter(item => !item.is_sender).map(item => ({
        ...item,
        is_visited: item.arrived_at || item.left_at,
      }))
    },
    /** **/
    actionDeleteNoticeToChange(item, itemIndex, groupIndex) {
      this.model.__groups[groupIndex].__notices_to_change.splice(itemIndex, 1)
    },
    /** **/
    actionFillNoticesToChange(){
      if (this.model?.__groups?.[this.tempGroupIndex]?.__notices_to_change) {
        this.model.__groups[this.tempGroupIndex].__notices_to_change.push({
          ...this.changingBTModel,
          __regions: this.tempVerifications.map(item => ({...item.region})),
          __start_date: this.changingBTModel?.start_date,
          __end_date: this.changingBTModel?.end_date,
          __sender_company: this.changingBTModel?.sender_company
        })
      } else {
        console.warn("Target group or __notices_to_change array not found.")
      }
    },
    /** **/
    async actionCreateDocument(body) {
      const model = removeKeysWithDoubleUnderscore(body)
      this.buttonLoading = true
      const {response, error} = await withAsync(fetchCreateDocument, model)
      if (response) {
        this.buttonLoading = false
        await useCountStore().actionCountList()
        return Promise.resolve(response)
      } else {
        this.buttonLoading = false
        return Promise.reject(error)
      }
    },
    /** **/
    async actionUpdateDocument({id, body}) {
      const model = await removeKeysWithDoubleUnderscore(body)
      try {
        this.buttonLoading = true;
        const {data} = await fetchUpdateDocument({id, body: model})
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        await useCountStore().actionCountList()
        this.buttonLoading = false
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id, parent_id) {
      try {
        this.detailLoading = true

        await this.actionGetParentDocumentDetail(parent_id)
        const {data} = await fetchGetDocumentDetail(id)
        const res = await fetchGetLinkedDocumentsList(data.id)

        useBusinessTripStore().decreeModel.content = res?.data?.to_composes[0]?.from_compose?.content || ''
        useBusinessTripStore().decreeModel.id = res?.data?.to_composes[0]?.from_compose?.id || null

        const groups = await Promise.all(this.model.__groups.map(async item => {
          const matchingNotices = data.notices.filter(notice =>
            item.__users.some(user => user.id === notice.user?.id && notice.group_id === item.group_id)
          )

          if (matchingNotices.length) {
            item.__notices_to_change = await Promise.all(
              matchingNotices.map(async n => ({
                user: n.user,
                __regions: await adjustObjectToArray('regions', n.locations),
                __start_date: n.start_date,
                __end_date: n.end_date,
                tags: n.tags,
                __sender_company: n.sender_company,
                business_trip_id: n.id,
                parent_id: n.parent,
              }))
            )
          }

          return item
        }))

        this.model.__curator = await adjustTopSignerObjectToArray([], data.curator.id, false)
        this.model.__signers = await adjustUserObjectToArray(data.signers)
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.short_description = data.short_description
        this.model.content = data.content

      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      } finally {
        this.detailLoading = false
      }
    },
    /** **/
    async actionUpdateUserTrip() {
      this.actionFillNoticesToChange()
      this.actionClearTempModel()
      // this.userTripUpdateButtonLoading = true
      //
      // const body = {
      //   regions: this.tempVerifications.map(item => (item?.region?.id || null)),
      //   end_date: this.changingBTModel?.end_date
      // }
      // try {
      //   await fetchUpdateBusinessTripVerification({ id: this.changingBTModel?.id, body })
      //   this.actionFillNoticesToChange()
      //   this.actionClearTempModel()
      //   dispatchNotify(null, "Muvaffaqiyatli!", COLOR_TYPES.SUCCESS)
      //
      //
      // } catch (error) {
      //   console.error(error)
      // } finally {
      //   this.userTripUpdateButtonLoading = false
      // }
    },
    /** **/
    actionResetBTModel() {
      this.model = {
        approvers: [],
        company: null,
        content: null,
        curator: null,
        document_type: null,
        document_sub_type: null,
        journal: null,
        notices: [],
        start_date: null,
        end_date: null,
        short_description: "Xizmat safarini o'zgartirish to'g'risida",
        sender: null,
        signers: [],
        files: [],
        __files: [],
        __usersList: [],
        __users: [],
        __notices: [],
        __groups: [
          {
            __notices_to_change: [],
          }
        ],
        __curator: null,
        __approvers: [],
        __signers: [],
      }
    },
    /** **/
    actionClearTempModel() {
      this.changingBTDialog = false
      this.changingBTLoading = false
      this.changingBTModel = null
      this.tempVerifications = []
      this.tempRegions = []
      this.model.__groups[this.tempGroupIndex].__users_to_extend = []
    },
    /** **/
    actionClearUserToExtend() {
      const index = this.model.__groups[this.tempGroupIndex].__users_to_extend.findIndex(user => user.id === this.changingBTModel?.user?.id)
      this.model.__groups[this.tempGroupIndex].__users_to_extend.splice(index, 1)
    }
  }
})
