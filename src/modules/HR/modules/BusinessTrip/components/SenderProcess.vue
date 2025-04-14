<script setup>
// Core
import {computed} from "vue"
// Components
import {RemoveMinusIcon, UnreadLinearIcon} from "@/components/Icons"
import { SenderProcessCard, NextDestinationDisabledCard } from "@/modules/HR/modules/BusinessTrip/components/index"

const props = defineProps({
  verifications: {
    type: Array,
    default: () => []
  }
})

// Computed
const alignment = computed(() => {
  if (!sender.value.is_arrived) {
    return props.verifications.filter(item => item.arrived_at).length % 2 === 0 ? 'right' : 'left'
  } else {
    return props.verifications.length % 2 === 0 ? 'right' : 'left'
  }
})
const isAllReceiversVerified = computed(() => {
  return props.verifications.filter(item => !item.is_sender)?.every(every => every.left_at && every.arrived_at)
})
const isNextDestinationVisible = computed(() => {
  const filteredArray = props.verifications.filter(item => item.arrived_at || item.is_sender)
  const lastItem = filteredArray.length > 0 ? filteredArray[filteredArray.length - 1] : null

  if (!lastItem) return false // Ensure safe access to lastItem properties

  if (lastItem.left_at && !lastItem.is_sender) {
    return true
  }

  return lastItem.is_sender && !lastItem.left_at
})
const sender = computed(() => {
  return props.verifications.find(item => item.is_sender)
})
const stepperColor = computed(() => {
  return isAllReceiversVerified.value && sender?.value?.arrived_at
    ? 'bg-success-500'
    : isAllReceiversVerified.value && !sender?.value?.arrived_at
      ? 'bg-warning-300'
      : 'bg-greyscale-70'   // bg-success-500  bg-warning-300 bg-greyscale-70
})
const iconColor = computed(() => {
  return isAllReceiversVerified.value && sender?.value?.arrived_at
    ? 'text-success-500'
    : isAllReceiversVerified.value && !sender?.value?.arrived_at
      ? 'text-warning-300'
      : 'text-greyscale-300' // text-success-500 text-warning-300 text-greyscale-300
})
const stepperIcon = computed(() => {
  return !isAllReceiversVerified.value || sender?.value?.arrived_at ? UnreadLinearIcon : RemoveMinusIcon
})
</script>

<template>
  <div class="flex gap-x-3">
    <div class="w-[450px] min-h-[80px]">
      <sender-process-card
        v-if="alignment === 'left' && isAllReceiversVerified"
        :verifications="props.verifications"
      />

      <next-destination-disabled-card
        v-if="alignment === 'left' && !isAllReceiversVerified && isNextDestinationVisible"
        :verifications="props.verifications"
      />
    </div>

    <div class="flex flex-col items-center w-8">
      <div
        class="flex justify-center items-center rounded-full w-8 h-8"
        :class="stepperColor"
      >
        <div class="flex justify-center items-center bg-white rounded-full w-6 h-6">
          <base-iconify
            :icon="stepperIcon"
            :class="iconColor"
          />
        </div>
      </div>

      <div
        class="w-2 flex-1"
        :class="stepperColor"
      >
      </div>
    </div>

    <div class="w-[450px] min-h-[80px]">
      <sender-process-card
        v-if="alignment === 'right' && isAllReceiversVerified"
        :verifications="props.verifications"
      />

      <next-destination-disabled-card
        v-if="alignment === 'right' && !isAllReceiversVerified && isNextDestinationVisible"
        :verifications="props.verifications"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
