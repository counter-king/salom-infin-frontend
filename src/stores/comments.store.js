import { defineStore } from "pinia"
import {
  fetchCommentsList,
  fetchSendComment,
  fetchUpdateComment,
  fetchReplyComment,
  fetchDeleteComment
} from "@/services/comment.service"

export const useCommentStore = defineStore("comments", {
  state: () => ({
    commentsList: [],
    commentModel: {
      content_type: null,
      description: null,
      file: null,
      object_id: null
    },
    editCommentModel: {
      content_type: null,
      description: null,
      file: null,
      object_id: null
    },
    replyCommentModel: {
      content_type: null,
      description: null,
      file: null,
      object_id: null,
      replied_to: null
    }
  }),
  actions: {
    /**
    * Получить список комментариев
    * */
    async actionCommentsList() {
      const { content_type, object_id } = this.commentModel

      let { data } = await fetchCommentsList({ content_type, object_id })
      this.commentsList = data.results
    },
    /**
     * Добавить комментарий
     * */
    async actionSendComment() {
      this.commentModel.description = this.commentModel.description.trim()

      await fetchSendComment(this.commentModel)
      await this.actionCommentsList()
      await this.clearModel(this.commentModel)
    },
    /**
		* Изменить комментарий
		* */
    async actionUpdateComment({ id }) {
      this.editCommentModel.description = this.editCommentModel.description.trim()

      await fetchUpdateComment({ id, data: this.editCommentModel })
      await this.actionCommentsList()
      await this.clearModel(this.editCommentModel)
    },
    /**
    * Ответить комментарий
    * */
    async actionReplyComment() {
      this.replyCommentModel.description = this.replyCommentModel.description.trim()

      await fetchReplyComment(this.replyCommentModel)
      await this.actionCommentsList()
      await this.clearModel(this.replyCommentModel)
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
    }
  }
})
