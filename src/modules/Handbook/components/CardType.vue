<script setup>
import { ref, useTemplateRef, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useChatStore } from '@/modules/Chat/stores'
import { useDashboardContactStore } from "@/modules/Dashboard/stores/contact.store"
import {
  CallMedicineRoundedBoldIcon,
  LetterBoldIcon,
  StarLinearIcon,
  StarBoldIcon,
  ChatLineIcon
} from '@/components/Icons'
import { UserStatusChip } from '@/components/Chips'
import { CHAT_ROUTE_NAMES } from '@/modules/Chat/constatns'
import { isDateGreaterOrEqualToday } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { formatDate } from '@/utils/formatDate'
import { COLOR_TYPES } from '@/enums'

const router = useRouter()
const { t, locale } = useI18n()
const chatStore = useChatStore()
const contactStore = useDashboardContactStore()
const fullNameRefs = useTemplateRef('fullName')
const positionRefs = useTemplateRef('position')
const departmentRefs = useTemplateRef('department')

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  isSearch: {
    type: Boolean
  },
  totalCount: {
    type: Number
  }
})

const itemId = ref(0)
const itemChatId = ref(0)
const itemShowTooltip = ref(-1)

const flatDeepItems = computed(() => props.isSearch ? props.value : collectUsersFromArray(props.value))

const handleFavouriteClick = async (item) => {
  itemId.value = item.id
  try {
    if (item.is_selected && item.favourite_id) {
      await contactStore.actionDeleteContactFromFavourites(item.favourite_id)
      item.favourite_id = null
      item.is_selected = false
      dispatchNotify(null, t('successfully-deleted'), COLOR_TYPES.SUCCESS)
    } else {
      const { data } = await contactStore.actionAddContactToFavourites({user: item.id})
      item.is_selected = true
      item.favourite_id = data.id
      item.private_chat_id = data.private_chat_id
      dispatchNotify(null, t('successfully-added'), COLOR_TYPES.SUCCESS)
    }
  }
  catch (error) {

  }
  finally {
    itemId.value = 0
  }
}
const moveToChat = async (item) => {
  if(!!item.private_chat_id) {
    await router.push({
      name: CHAT_ROUTE_NAMES.PRIVATE,
      params: { id: item.private_chat_id }
    })
  } else {
    await createChat(item)
  }
}
const createChat = async (user) => {
  itemChatId.value = user.id
  try {
    const data = await chatStore.actionCreatePrivateChat({ member_id: user?.id })
    await router.push({
      name: CHAT_ROUTE_NAMES.PRIVATE,
      params: { id: data.chat_uid },
      query: { tab: undefined }
    })
  } catch(err) {
    dispatchNotify(null, t('error'), COLOR_TYPES.ERROR)
  }
  finally {
    itemChatId.value = 0
  }
}
const checkTruncate = (index, refs) => {
  const currentRef = refs[index]

  if(currentRef.scrollWidth > currentRef.clientWidth) {
    itemShowTooltip.value = index
  }
}

function collectUsersFromArray(departments) {
  let result = []

  for (const dep of departments) {
    result.push(...collectUsers(dep))
  }

  return result
}

function collectUsers(department) {
  let result = []

  if (Array.isArray(department.users)) {
    result.push(...department.users)
  }

  if (Array.isArray(department.children)) {
    for (const child of department.children) {
      result.push(...collectUsers(child))
    }
  }

  return result
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <template v-for="(item, index) in flatDeepItems" :key="item.id">
      <div class="group flex flex-col bg-white shadow-button hover:shadow-button-hover rounded-[20px] overflow-hidden relative transition-shadow">
        <div class="flex flex-1 gap-4 p-5">
          <div class="w-14 h-14 relative">
            <base-avatar
              :label="item?.full_name"
              :color="item?.color ?? '#635AFF'"
              :image="item?.avatar?.url"
              :meta="item"
              shape="circle"
              detail-dialog
              avatar-classes="w-14 h-14"
            >
              <span class="text-xl font-medium uppercase text-white">{{ item?.full_name[0] }}</span>
            </base-avatar>

            <div
              class="absolute bottom-0 border-[3px] border-greyscale-50 right-0 min-w-4 min-h-4 w-4 h-4 rounded-full bg-greyscale-300"
              :class="{'!bg-success-500': item.is_user_online}"
            />
          </div>

          <div class="flex-1 min-w-0">
            <h1
              ref="fullName"
              class="min-w-0 font-semibold text-greyscale-900 text-lg truncate mb-1 pr-6"
              @mouseenter="checkTruncate(index, fullNameRefs)"
              @mouseleave="() => itemShowTooltip = -1"
            >
              <template v-if="itemShowTooltip === index">
                <span
                  class="truncate"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white text-center -my-1'>${item.full_name}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                >
                  {{ item.full_name }}
                </span>
              </template>

              <template v-else>
                <span class="truncate">{{ item.full_name }}</span>
              </template>
            </h1>

            <div class="flex gap-x-2">
              <user-status-chip
                :name="item.status.name"
                :status="{ id: item.status.code }"
                border
                circle
              />

              <div
                v-if="item.leave_end_date && item.status?.code !== 'A' && isDateGreaterOrEqualToday(item.leave_end_date)"
                class="bg-greyscale-50 border border-greyscale-200 rounded-[6px] px-2 text-sm text-greyscale-500"
              >
                {{ t('to', { count: formatDate(item.leave_end_date) }) }}
              </div>
            </div>

            <h2
              ref="position"
              class="min-w-0 font-medium text-greyscale-500 truncate mt-2"
              @mouseenter="checkTruncate(index, positionRefs)"
              @mouseleave="() => itemShowTooltip = -1"
            >
              <template v-if="itemShowTooltip === index">
                <span
                  class="truncate"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white text-center -my-1'>${item.position?.name}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                >
                  {{ item.position?.name }}
                </span>
              </template>

              <template v-else>
                <span class="truncate">{{ item.position?.name }}</span>
              </template>
            </h2>

            <h2
              ref="department"
              class="min-w-0 font-medium text-greyscale-400 text-sm truncate mt-1"
              @mouseenter="checkTruncate(index, departmentRefs)"
              @mouseleave="() => itemShowTooltip = -1"
            >
              <template v-if="itemShowTooltip === index">
                <span
                  class="truncate"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white text-center -my-1'>${item.department?.name}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                >
                  {{ item.department?.name }}
                </span>
              </template>

              <template v-else>
                <span class="truncate">{{ item.department?.name }}</span>
              </template>
            </h2>
          </div>
        </div>

        <div class="flex items-center gap-6 bg-greyscale-50 group-hover:bg-primary-10 transition-colors border-t border-t-greyscale-100 py-3 px-6">
          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />
            <span class="font-medium text-greyscale-900 text-sm">{{ item.cisco ?? '-' }}</span>
          </div>

          <a
            :href="`mailto:${item.email}`"
            class="flex items-center gap-[10px]"
            :class="item.email ? 'underline underline-offset-2' : ''"
          >
            <base-iconify :icon="LetterBoldIcon" class="text-greyscale-400" />
            <span class="font-medium text-greyscale-900 text-sm">{{ item.email ?? '-' }}</span>
          </a>
        </div>

        <div class="flex flex-col absolute top-4 right-4 space-y-3">
          <button
            type="button"
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white -my-1'>${item.is_selected && item.favourite_id ? t('remove-from-favourites') : item.is_selected ? t('favourites') : t('add-to-favourites')}</h4>`,
              escape: true,
              autoHide: false
            }"
            @click="handleFavouriteClick(item)"
          >
            <template v-if="itemId === item.id">
              <base-spinner root-classes="!w-6 !h-6" />
            </template>

            <template v-else>
              <template v-if="item.is_selected">
                <base-iconify :icon="StarBoldIcon" class="text-warning-500" />
              </template>

              <template v-else>
                <base-iconify :icon="StarLinearIcon" class="text-greyscale-300 hover:text-warning-500" />
              </template>
            </template>
          </button>

          <button
            type="button"
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white text-center -my-1'>${t('compose-message')}</h4>`,
              escape: true,
              autoHide: false
            }"
            @click="moveToChat(item)"
          >
            <template v-if="itemChatId === item.id">
              <base-spinner root-classes="!w-6 !h-6" />
            </template>

            <template v-else>
              <base-iconify :icon="ChatLineIcon" class="text-greyscale-300 hover:text-primary-500" />
            </template>
          </button>
        </div>
      </div>
    </template>
</div>
</template>

<style scoped>

</style>
