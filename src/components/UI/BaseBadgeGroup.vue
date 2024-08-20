<script setup>
// Core
import {computed, ref, unref} from "vue"

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  max: {
    type: Number,
    default: 1
  },
})

const opRef = ref(null)

// Computed
const list = computed(() => props.items.slice(0, props.max))
const rest = computed(() => props.items.slice(props.max))

// Methods
const onRestClick = (event) => {
  event.stopImmediatePropagation()
  toggle(event)
}
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
</script>

<template>
  <div class="base-badge-group flex gap-x-[6px]">
    <div
      v-for="item in list"
      class="bg-greyscale-50 px-3 rounded-[90px] border text-primary-900 text-xs font-medium"
    >
      {{ item.name }}
    </div>

    <div
      v-if="rest && rest.length"
      class="bg-greyscale-50 px-3 rounded-[90px] border text-primary-900 text-xs font-medium"
      aria-controls="overlay_menu"
      @click="onRestClick($event)"
    >
      +{{ rest.length }}
    </div>

    <base-overlay-panel
      ref="opRef"
      menu-class="bg-white mt-6 custom"
      no-angle
    >
      <div class="flex flex-col p-3 gap-y-1 shadow">
        <div
          v-for="item in rest"
          class="text-primary-900 text-xs font-medium"
        >
          {{ item.name }}
        </div>
      </div>
    </base-overlay-panel>
  </div>
</template>

<style scoped>

</style>
