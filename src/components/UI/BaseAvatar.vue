<script setup>
// Core
import { ref, unref, nextTick } from 'vue'
import Avatar from 'primevue/avatar'
import { ActionChip, StatusChip } from '@/components/Chips'
import {
  BuildingsBoldIcon,
  CallMedicineRoundedBoldIcon,
  CityBoldIcon,
  LetterBoldIcon,
  UsersGroupTwoRoundedBoldIcon
} from '@/components/Icons'
// Macros
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  meta: {
    type: Object,
    default: () => {}
  },
  detailDialog: {
    type: Boolean
  },
  type: {
    type: String,
    default: 'single',
    validator(value) {
      return ['single', 'group'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'large', 'xlarge'].includes(value)
    }
  },
  shape: {
    type: String,
    default: 'circle',
    validator(value) {
      return ['square', 'circle'].includes(value)
    }
  },
  avatarClasses: {
    type: String
  },
  actionChipType: {
    type: Object,
    default: () => {}
  },
  labelClasses: {
    type: String,
    default: 'text-sm leading-none text-white'
  }
})
// Reactive
const overlayRef = ref(null)
const overlayVisible = ref(false)
// Methods
const handleMouseEnter = async (event) => {
  if(props.detailDialog) {
    const elem = event.target
    const { top, left, right, width } = elem.getBoundingClientRect()
    const bottomHeight = document.body.clientHeight - top
    const rightWidth = document.body.clientWidth - right

    overlayVisible.value = true
    await nextTick()
    const overlay = unref(overlayRef)
    const style = overlay.style

    // Bottom calc
    overlay.clientHeight >= bottomHeight ? style.bottom = `${50}px` : style.top = `${top}px`
    // Right calc
    overlay.clientWidth >= rightWidth ? style.right = `${rightWidth + width}px` : style.left = `${left + width}px`
  }
}
</script>

<template>
  <div
    class="app-avatar flex relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="overlayVisible = false"
  >
    <Avatar
      :image="props.image"
      :size="props.size"
      :shape="props.shape"
      :label="props.label[0]"
      :pt="{
        root: {
          style: {
            backgroundColor: `${props.color}`
          },
          class: [
            props.avatarClasses,
          ]
        },
        label: {
          class: props.labelClasses
        },
        image: {
          class: 'object-cover'
        }
      }"
    >
      <slot />
    </Avatar>

    <template v-if="detailDialog">
      <template v-if="overlayVisible">
        <div ref="overlayRef" class="fixed z-10">
          <div class="bg-white !shadow-overlay overflow-hidden !rounded-[20px] w-[477px] mx-2">
            <div class="rounded-[20px] overflow-hidden pb-8">
              <div class="h-[70px] relative rounded-tl-2xl rounded-tr-2xl">
                <div class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-4px)] bg-primary-30 rounded-tl-2xl rounded-tr-2xl"></div>
              </div>

              <div class="relative -mt-10 px-6">
                <div class="flex justify-center items-center w-[72px] h-[72px] rounded-full bg-white">
                  <base-avatar
                    :image="props.image"
                    :color="props.color"
                    :label="props.label[0]"
                    avatarClasses="w-16 h-16"
                  >
                    <span class="text-3xl font-semibold text-white">{{ props.label[0] }}</span>
                  </base-avatar>
                </div>

                <div class="flex items-center mt-1">
                  <div class="flex-1">
                    <h1 class="text-greyscale-900 font-bold text-base">{{ props.label }}</h1>
                    <span class="block text-sm font-medium text-greyscale-500">{{ props.meta?.position?.name ?? '-' }}</span>
                  </div>

                  <status-chip
                    type="handbook"
                    border
                    circle
                    :status="{ code: props.meta?.status?.code }"
                  >
                    {{ props.meta?.status?.name }}
                  </status-chip>
                </div>

                <div class="space-y-3 mt-4">
                  <div class="flex items-center gap-[10px]">
                    <base-iconify :icon="CityBoldIcon" class="text-greyscale-400" />

                    <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.top_level_department?.name ?? '-' }}</span>
                  </div>

                  <div class="flex items-center gap-[10px]">
                    <base-iconify :icon="UsersGroupTwoRoundedBoldIcon" class="text-greyscale-400" />

                    <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.department?.name ?? '-' }}</span>
                  </div>

                  <div class="flex items-center gap-[10px]">
                    <base-iconify :icon="BuildingsBoldIcon" class="text-greyscale-400" />

                    <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.company?.name ?? '-' }}</span>
                  </div>

                  <div class="flex items-center gap-[10px]">
                    <base-iconify :icon="LetterBoldIcon" class="text-greyscale-400" />

                    <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.email ?? '-' }}</span>
                  </div>

                  <div class="flex items-center gap-[10px]">
                    <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />

                    <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.cisco ?? '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>

    <template v-if="props.actionChipType">
      <action-chip :type="props.actionChipType" />
    </template>
  </div>
</template>

<style scoped>

</style>
