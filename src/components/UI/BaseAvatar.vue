<script setup>
// Core
import { ref, unref, nextTick } from 'vue'
import Avatar from 'primevue/avatar'
import { ActionChip } from '@/components/Chips'
import { UserWithDetail } from '@/components/Users'
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
      :label="props.image ? undefined : props.label[0]"
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
      <slot v-if="!props.image" />
    </Avatar>

    <template v-if="detailDialog">
      <template v-if="overlayVisible">
        <div ref="overlayRef" class="fixed z-10">
          <user-with-detail
            :image="props.image"
            :color="props.color"
            :label="props.label"
            :meta="props.meta"
          />
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
