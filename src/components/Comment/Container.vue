<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Store
import { useCommentStore } from '@/stores/comments.store'
// Composable
const commentStore = useCommentStore()
// Reactive
const contentLoading = ref(true)
// Components
import { CommentItem, CommentFooter } from '@/components/Comment/'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  objectId: {
    type: Number
  }
})
// Hooks
onMounted(async () => {
  try {
    contentLoading.value = true
    await commentStore.actionCommentsList({ object_id: props.objectId })
  }
  finally {
    setTimeout(() => {
      contentLoading.value = false
    }, 500)
  }
})
</script>

<template>
	<div class="comment-wrapper-view flex flex-col bg-greyscale-50 relative h-full">
    <template v-if="contentLoading">
      <base-spinner content />
    </template>

    <template v-else>
      <template v-if="!commentStore.commentsList.length">
        <div class="flex items-center justify-center h-full">
          <h1 class="text-xl font-medium text-primary-900">{{ t('no-comment') }}</h1>
        </div>
      </template>

      <template v-else>
        <div class="comment-container flex-1 pt-5 px-10 border-l border-greyscale-200 overflow-y-auto">
          <template v-for="comment in commentStore.commentsList">
            <comment-item
              :item="comment"
              :object-id="props.objectId"
              class="mb-2"
            />
          </template>
        </div>
      </template>

      <comment-footer :object-id="objectId" />
    </template>
	</div>
</template>

<style>

</style>
