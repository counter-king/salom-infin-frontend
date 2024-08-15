<script setup>
// Core
import { ref, computed } from 'vue'
// Components
import { AltArrowUpIcon, AltArrowDownIcon } from '@/components/Icons'
import FieldGroups from './FieldGroups.vue'
// Utils
import { combineKeys } from '@/utils'
// Macros
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  headers: {
    type: Array,
    default: () => []
  },
  max: {
    type: Number,
    default: 5
  }
})
// Reactive
const count = ref(1)
// Computed
const value = computed(() => combineKeys(props.headers, props.data))
const visible = computed(() => count.value & 1 ? value.value.slice(0, props.max) : value.value)
</script>

<template>
  <div class="field-group-collapse-view bg-greyscale-50 relative border border-greyscale-90 rounded-xl py-4 px-5">
    <slot>
      <field-groups :headers="props.headers" :data="visible" />
    </slot>

    <button
      type="button"
      class="flex items-center justify-center w-8 h-8 bg-greyscale-70 rounded-lg border border-greyscale-200 absolute top-5 right-5 p-1"
      @click="count++"
    >
      <template v-if="count & 1">
        <base-iconify :icon="AltArrowDownIcon" />
      </template>

      <template v-else>
        <base-iconify :icon="AltArrowUpIcon" />
      </template>
    </button>
  </div>
</template>
