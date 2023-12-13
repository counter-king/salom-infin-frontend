<script setup>
// Core
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
// Store
import { useCommentStore } from '@/stores/comments.store'
// Utils
import { normalizeText } from '@/utils'
import { COMMENT_ACTIONS, CONTENT_TYPES, CORRESPONDENT } from '@/enums'
// Composable
const commentStore = useCommentStore()
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  objectId: {
    type: Number
  },
  type: {
    type: String,
    default: COMMENT_ACTIONS.REPLY
  }
})
// Reactive
const rootRef = ref(null)
// Computed
const message = ref(props.type === COMMENT_ACTIONS.EDIT
  ? props.item.description
  : ''
)
// Hooks
onMounted(() => {
  onClickOutside(
    rootRef,
    () => commentStore.closeEditOrReplyArea(
      {
        item: props.item,
        action: props.type
      }
    )
  )
})
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
      let model = {
        ...props.item,
        description: normalizeText(message.value)
      }

      switch(props.type) {
        case COMMENT_ACTIONS.EDIT: // Edit
          await commentStore.actionCrudComment({
            ...model,
            type: COMMENT_ACTIONS.EDIT
          })
          break;
        default: // Reply
          await commentStore.actionCrudComment({
            ...model,
            replied_to: props.item.id,
            type: COMMENT_ACTIONS.REPLY
          })
      }
      message.value = ''
    } catch (error) {

    }
  }
}
</script>

<template>
  <div ref="rootRef" class="flex gap-4">
    <base-avatar
      :label="props.item.created_by.full_name"
      :color="props.item.created_by.color"
      shape="circle"
      avatar-classes="w-8 h-8"
    />

    <div class="flex-1">
      <base-textarea
        v-model="message"
        :loading="commentStore.commentUpdateLoading"
        rows="1"
        root-class="bg-white shadow-button"
        @keydown="sendMessage($event)"
      />
    </div>
  </div>
</template>

<style>

</style>
