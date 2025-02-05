<script setup>
// Core
import { computed } from "vue"
// Components
import { NextDestinationDisabledCard } from "@/modules/HR/modules/BusinessTrip/components/index"
import { RemoveMinusIcon } from "@/components/Icons";

const props = defineProps({
  verifications: {
    type: Array,
    default: () => []
  }
})

// Computed
const alignment = computed(() => {
  return props.verifications.length % 2 === 0 ? 'right' : 'left'
})
</script>

<template>
  <div class="flex gap-x-3">
    <div class="w-[350px] min-h-[80px]">
      <next-destination-disabled-card v-if="alignment === 'right'" />
    </div>

    <div class="flex flex-col items-center w-8">
      <div
        class="flex justify-center items-center rounded-full w-8 h-8"
        :class="`bg-warning-300`"
      >
        <div class="flex justify-center items-center bg-white rounded-full w-6 h-6">
          <base-iconify
            :icon="RemoveMinusIcon"
            :class="`text-warning-300`"
          />
        </div>
      </div>

      <div
        class="w-2 flex-1"
        :class="`bg-warning-300`"
      >
      </div>
    </div>

    <div class="w-[350px] min-h-[80px]">
      <next-destination-disabled-card v-if="alignment === 'left'" />
    </div>
  </div>
</template>

<style scoped>

</style>
