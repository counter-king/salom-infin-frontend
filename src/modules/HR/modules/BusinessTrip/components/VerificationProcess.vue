<script setup>
// Components
import { UnreadLinearIcon } from "@/components/Icons"
import { VerificationProcessCard } from "@/modules/HR/modules/BusinessTrip/components/index"

const props = defineProps({
  item: {
    type: Object,
    default: () => {
    }
  },
})
</script>

<template>
  <div class="verification-process">
    <div class="flex gap-x-3">
      <div class="w-[350px] min-h-[130px]">
        <verification-process-card
          v-if="props.item.direction === 'left'"
          :item="props.item"
        />
      </div>

      <div class="flex flex-col items-center w-8">
        <div class="flex justify-center items-center bg-success-500 rounded-full w-8 h-8">
          <div class="flex justify-center items-center bg-white rounded-full w-6 h-6">
            <base-iconify
              :icon="UnreadLinearIcon"
              class="text-success-500"
            />
          </div>
        </div>

        <div class="w-2 bg-success-500 flex-1"></div>
      </div>

      <div class="w-[350px] min-h-[130px]">
        <verification-process-card
          v-if="props.item.direction === 'right'"
          :item="props.item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
