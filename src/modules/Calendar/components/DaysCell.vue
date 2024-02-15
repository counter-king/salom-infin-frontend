<script setup>
// Enums
import { EVENT_TYPES } from '../enums'
// Macros
const props = defineProps({
  interval: {
    type: Array,
    default: () => []
  },
  events: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="grid grid-cols-7 grid-rows-5 flex-1">
    <template v-for="{ date, status, events } in props.interval">
      <div
        class="bg-greyscale-50 transition-all hover:bg-greyscale-50 [&:not(:nth-child(7n))]:border-r border-t border-greyscale-200 p-2"
        :class="{ 'bg-white': status === 'now' }"
      >
        <span
          class="text-base font-medium text-gray-2 block text-center"
          :class="{ 'text-primary-900': status === 'now' }"
        >
          {{ date }}
        </span>

        <div class="events-list">
          <template v-if="events.length">
            <template v-for="(event, index) in events">
              <div
                :class="[
                  event.type === EVENT_TYPES.EVENT ? 'bg-info-100' : 'bg-warning-100',
                  index + 1 !== events.length ? 'mb-1' : ''
                ]"
                class="rounded-[6px] cursor-pointer px-2 py-1"
              >
                <span class="block text-[13px] font-semibold text-primary-900 leading-[1]">{{ event.title }}</span>
              </div>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
