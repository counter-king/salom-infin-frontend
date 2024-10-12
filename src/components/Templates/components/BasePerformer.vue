<script setup>
const props = defineProps({
  composeModel: {
    type: Object
  },
  author: {
    type: Object
  }
})
// Utils
import {formatUserFullName} from "@/utils"
import {formatDateHour} from "@/utils/formatDate"
</script>

<template>
  <div class="flex flex-col my-4 text-xs font-light">
    <span><span class="font-medium">Ijrochi:</span> {{ formatUserFullName(props.author) }}</span>
    <span><span class="font-medium">Tel:</span> {{ props?.author?.cisco ? props?.author?.cisco : '00-00' }}</span>
    <span>
        <template v-if="props.composeModel?.created_date">
          <span class="font-medium">Kiritildi:</span>
          {{ props.composeModel?.created_date && formatDateHour(props.composeModel.created_date) + '&nbsp' }}
        </template>
        <template v-if="props.composeModel?.is_signed">
          <span class="font-medium">Imzolandi:</span>
          {{ props.composeModel?.modified_date && formatDateHour(props.composeModel.modified_date) }}
        </template>
      </span>
  </div>
</template>

<style scoped>

</style>
