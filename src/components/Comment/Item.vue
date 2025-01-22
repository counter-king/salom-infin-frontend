<script setup>
// Components
import { CommentEdit } from '@/components/Comment'
// Components
import { Pen2Icon } from '@/components/Icons'
import { CommentItem } from '@/components/Comment'
// Store
import { useAuthStore } from '@/modules/Auth/stores'
import { useCommentStore } from '@/stores/comments.store'
// Utils
import { formatDateHour } from '@/utils/formatDate'
import { COMMENT_ACTIONS } from '@/enums'
// Composable
const authStore = useAuthStore()
const commentStore = useCommentStore()
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => null
  },
  objectId: {
    type: Number
  }
})
</script>

<template>
  <div v-if="props.item" class="comment-item-view flex gap-4">
    <base-avatar
      :label="props.item.created_by.full_name"
      :color="props.item.created_by.color"
      :image="props.item.created_by?.avatar?.url"
      shape="circle"
      avatar-classes="w-8 h-8"
    />

    <div class="flex-1">
      <div class="bg-white shadow-button py-3 px-4 rounded-2xl rounded-tl-none">
        <div class="flex items-center justify-between text-xs mb-1">
          <h1 class="text-primary-500 font-semibold">{{ props.item.created_by.full_name }}</h1>
          <span class="text-primary-900 font-medium">{{ formatDateHour(props.item.created_date) }}</span>
        </div>

        <p class="text-sm font-semibold text-primary-900" v-html="props.item.description"></p>
      </div>

      <div class="flex items-center text-sm font-medium text-greyscale-500 my-2">
        <template v-if="props.item.created_by.id === authStore.currentUser.id">
          <div
            class="group flex cursor-pointer"
            @click="commentStore.openEditOrReplyArea({ item: props.item, action: COMMENT_ACTIONS.REPLY })"
          >
            <base-icon name="ForwardIcon" class="text-transparent fill-greyscale-300 -scale-x-100 mr-1 group-hover:fill-primary-500" />
            <span class="group-hover:text-primary-500">Ответить</span>
          </div>

          <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full mx-2"></div>
        </template>

        <div class="group flex cursor-pointer">
          <base-icon name="ForwardIcon" class="text-transparent fill-greyscale-300 -scale-x-100 mr-1 group-hover:fill-primary-500" />
          <span class="group-hover:text-primary-500">{{ props.item.replies.length }} ответов</span>
        </div>

        <template v-if="props.item.created_by.id === authStore.currentUser.id">
          <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full mx-2"></div>

          <div
            class="group flex cursor-pointer"
            @click="commentStore.openEditOrReplyArea({ item: props.item, action: COMMENT_ACTIONS.EDIT })"
          >
            <base-iconify :icon="Pen2Icon" class="!w-4 mr-1 group-hover:text-primary-500" />
            <span class="group-hover:text-primary-500">Редактировать</span>
          </div>
        </template>
      </div>

      <!-- Ответить комментарий -->
      <template v-if="props.item[COMMENT_ACTIONS.REPLY]">
        <comment-edit
          :item="props.item"
          :object-id="props.objectId"
        />
      </template>
      <!-- /Ответить комментарий -->

      <!-- Изменить комментарий -->
      <template v-if="props.item[COMMENT_ACTIONS.EDIT]">
        <comment-edit
          :item="props.item"
          :object-id="props.objectId"
          :type="COMMENT_ACTIONS.EDIT"
        />
      </template>
      <!-- /Изменить комментарий -->

      <template v-if="props.item.replies && props.item.replies.length">
        <template v-for="reply in props.item.replies">
          <comment-item
            :item="reply"
            :object-id="props.objectId"
            class="mt-3"
          />
        </template>
      </template>
    </div>
  </div>
</template>
