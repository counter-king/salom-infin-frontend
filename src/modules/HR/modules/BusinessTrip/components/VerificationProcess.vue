<script setup>
// Components
import { UnreadLinearIcon, RemoveMinusIcon } from "@/components/Icons"
import { VerificationProcessCard, VerificationDisabledCard } from "@/modules/HR/modules/BusinessTrip/components/index"
import {computed} from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  verifications: {
    type: Array,
    default: () => []
  },
  index: {
    type: [Number, String],
    default: null
  }
})

// Computed
const iconColor = computed(() => {
  return props.item.arrived_at === null && props.item.left_at === null
    ? 'text-greyscale-300'
    : props.item.arrived_at && props.item.left_at === null
      ? 'text-warning-300'
      : 'text-success-500'
})
const stepperColor = computed(() => {
  return props.item.arrived_at === null && props.item.left_at === null
    ? 'bg-greyscale-70'
    : props.item.arrived_at && props.item.left_at === null
      ? 'bg-warning-300'
      : 'bg-success-500'
})
const itemVisible = computed(() => {
  return props.item.arrived_at || props.item.left_at
})
const isSenderOffice = computed(() => {
  return props.verifications[0].id === props.item.id
})
const disabledCardVisible = computed(() => {
  return isSenderOffice.value || (!isSenderOffice.value && props.verifications[props.index - 1].left_at)
})
const stepperIcon = computed(() => {
  return props.item.left_at === null && props.item.arrived_at ? RemoveMinusIcon : UnreadLinearIcon
})
</script>

<template>
  <div class="verification-process">
    <div class="flex gap-x-3">
      <div class="w-[350px] min-h-[130px]">
        <verification-process-card
          v-if="props.item.direction === 'left' && props.item.arrived_at"
          :item="props.item"
          :verifications="props.verifications"
          :index="props.index"
        />

<!--        <verification-disabled-card-->
<!--          v-else-if="props.item.direction === 'left' && disabledCardVisible"-->
<!--          :item="props.item"-->
<!--          :verifications="props.verifications"-->
<!--          :index="props.index"-->
<!--        />-->
      </div>

      <div
        class="flex flex-col items-center w-8">
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

      <div class="w-[350px] min-h-[130px]">
        <verification-process-card
          v-if="props.item.direction === 'right' && props.item.arrived_at"
          :item="props.item"
          :verifications="props.verifications"
          :index="props.index"
        />

<!--        <verification-disabled-card-->
<!--          v-else-if="props.item.direction === 'right' && disabledCardVisible"-->
<!--          :item="props.item"-->
<!--          :verifications="props.verifications"-->
<!--          :index="props.index"-->
<!--        />-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
