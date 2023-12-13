<script setup>
// Core
import { ref } from 'vue'
// Store
import { useCommentStore } from '@/stores/comments.store'
// Utils
import { normalizeText } from '@/utils'
import { COMMENT_ACTIONS, CONTENT_TYPES } from '@/enums'
// Composable
const commentStore = useCommentStore()
// Macros
const props = defineProps({
  objectId: {
    type: Number
  }
})
// Reactive
const message = ref('')
// Methods
const sendMessage = async (event) => {
  if(event.keyCode === 13 && event.shiftKey) {
    return
  }

  if(event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault()

    if(!message.value.trim()) {
      message.value = ''
      return
    }

    try {
      await commentStore.actionCrudComment({
        object_id: props.objectId,
        content_type: CONTENT_TYPES.DOC_FLOW,
        description: normalizeText(message.value),
        file: null,
        type: COMMENT_ACTIONS.CREATE
      })
      message.value = ''
    } catch (error) {

    }
  }
}
</script>

<template>
	<div class="comment-footer-view border-t border-greyscale-200">
    <div class="flex items-center py-[5px] px-2 bg-white overflow-hidden">
      <base-textarea
        v-model="message"
        rows="1"
        root-class="bg-white !border-none focus:shadow-none"
        class="flex-1 !mb-0"
        @keydown="sendMessage($event)"
      />

      <base-button
        label="Отправить"
        rounded
        :loading="commentStore.commentSendLoading"
        @click="sendMessage($event)"
      />
    </div>
	</div>
</template>

<style>

</style>
