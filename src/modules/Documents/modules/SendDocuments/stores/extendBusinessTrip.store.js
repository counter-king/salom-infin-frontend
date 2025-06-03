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

export const useExtendBusinessTripStore = defineStore("sd-extend-business-trip-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
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
            __users
          }
        })
      )
    },
    /** **/
    async actionAddUsersToExtend(group, groupIndex) {
      await nextTick() // wait for v-model to update

      const selectedUsers = this.model.__groups[groupIndex].__users_to_extend || []

      const item = this.model.__notices.find(notice =>
        selectedUsers.some(user => user.id === notice.user.id)
      )



      console.log(item)

      const matchedNotices = this.model.__notices.filter(item =>
        selectedUsers.some(user => user.id === item.user.id)
      )

      console.log(matchedNotices)

      this.model.__groups[groupIndex].__notices_to_change = await Promise.all(
        matchedNotices.map(async (notice) => ({
          ...notice,
          __regions: await adjustObjectToArray('regions', notice.locations),
          __end_date: notice.end_date,
          __start_date: notice.start_date
        }))
      )
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
            item.__users.some(user => user.id === notice.user?.id)
          )

          if (matchingNotices.length) {
            console.log(matchingNotices)
            item.__users_to_extend = item.__users
            item.__notices_to_change = await Promise.all(
              matchingNotices.map(async n => ({
                user: n.user,
                __regions: await adjustObjectToArray('regions', n.locations),
                __start_date: n.start_date,
                __end_date: n.end_date,
                tags: n.tags,
                __sender_company: n.sender_company,
                business_trip_id: n.id
              }))
            )
          }

          return item
        }))

        this.model.__groups = groups.filter(group =>
          group.__users_to_extend && group.__users_to_extend.length > 0
        )

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
    }
  }
})
