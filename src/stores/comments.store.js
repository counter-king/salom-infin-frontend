// Core
import { defineStore } from 'pinia'
// Service
import {
  fetchCommentsList,
  fetchSendComment,
  fetchUpdateComment,
  fetchReplyComment,
  fetchDeleteComment
} from '@/services/comment.service'
import { COMMENT_ACTIONS } from "@/enums";

export const useCommentStore = defineStore("comments", {
  state: () => ({
    commentsList: [],
    // content_type: null
    // replied_to: null
    commentModel: {
      description: null,
      file: null
    },
    commentSendLoading: false,
    commentUpdateLoading: false,
    disableMoreClicks: false
  }),
  actions: {
    /**
    * Получить список комментариев
    * */
    async actionCommentsList({ object_id }) {
      let { data } = await fetchCommentsList({ object_id })
      this.commentsList = data.results
    },
    /*
    * CRUD комментарий
    * */
    async actionCrudComment(payload) {
      if(this.disableMoreClicks) {
        return
      }

      try {
        switch(payload.type) {
          case COMMENT_ACTIONS.CREATE: // CREATE
            await this.actionPrevent(true)
            await fetchSendComment(payload)
            break;
          case COMMENT_ACTIONS.EDIT: // EDIT
            await this.actionUpdatePrevent(true)
            await fetchUpdateComment({ id: payload.id, data: payload })
            break;
          default: // REPLY
            await this.actionUpdatePrevent(true)
            await fetchReplyComment(payload)
        }
      } finally {
        await this.actionCommentsList({ object_id: payload.object_id })
        await this.actionPrevent(false)
        await this.actionUpdatePrevent(false)
      }
    },
    /*
    * Удалить комментарий
    * */
    async actionDeleteComment(id) {
      await fetchDeleteComment(id)
    },
    /**
		* Загрузить файлы
		* */
    async actionAttachFiles(payload) {

    },
    /**
    * Открыть текстовое поле (изменить или ответить)
    * */
    openEditOrReplyArea({ item, action }) {
      this.commentsList.forEach(comment => comment[action] = false)
			item[action] = true
    },
    /**
		* Закрыть текстовое поле (изменить или ответить)
		* */
    closeEditOrReplyArea({ item, action }) {
      item[action] = false
    },
    /*
    *
    * */
    async actionPrevent(payload) {
      this.commentSendLoading = payload
      this.disableMoreClicks = payload
    },
    /*
    *
    * */
    async actionUpdatePrevent(payload) {
      this.commentUpdateLoading = payload
      this.disableMoreClicks = payload
    }
  }
})
