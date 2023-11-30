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
    /**
     * Добавить комментарий
     * */
    async actionSendComment(payload) {
      if(this.disableMoreClicks) {
        return
      }

      try {
        await this.actionPrevent(true)
        await fetchSendComment(payload)
        await this.actionCommentsList({ object_id: payload.object_id })
      } finally {
        await this.actionPrevent(false)
      }
    },
    /**
		* Изменить комментарий
		* */
    async actionUpdateComment(payload) {
      if(this.disableMoreClicks) {
        return
      }

      try {
        await this.actionUpdatePrevent(true)
        await fetchUpdateComment({ id: payload.id, data: payload })
        await this.actionCommentsList({ object_id: payload.object_id })
      } finally {
        await this.actionUpdatePrevent(false)
      }
    },
    /**
    * Ответить комментарий
    * */
    async actionReplyComment(payload) {
      if(this.disableMoreClicks) {
        return
      }

      try {
        await this.actionUpdatePrevent(true)
        await fetchReplyComment(payload)
        await this.actionCommentsList({ object_id: payload.object_id })
      } finally {
        await this.actionUpdatePrevent(false)
      }
    },
    /*
    * Удалить комментарий
    * */
    async actionDeleteComment(id) {
      await fetchDeleteComment(id)
      await this.actionCommentsList()
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
    /**
		*
		* */
    async clearModel(model) {
      Object.keys(model).forEach(key => model[key] = null)
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
