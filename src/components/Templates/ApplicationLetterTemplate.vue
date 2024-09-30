<script setup>
// Utils
import { formatUserFullName } from "@/utils"
import { formatDateHour } from "@/utils/formatDate"
// Components
import { BaseSignersTemplate } from "@/components/Templates/components"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})
// Composable
const SDStore = useSDStore()
</script>

<template>
  <div class="application-letter-template">
    <div class="flex justify-end">
      <div class="flex flex-col items-end" style="width: 70%;">
        <div class="text-sm font-bold text-end">“O‘zsanoatqurilishbank” ATB  </div>
        <div class="text-sm font-bold text-end">{{ props.composeModel?.curator?.position?.name }}</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel && props.composeModel.curator && formatUserFullName(props.composeModel?.curator) }}га</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel?.author?.top_level_department?.name }} </div>
        <div class="text-sm font-bold text-end">{{ props.composeModel?.author?.position?.name }}</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel && props.composeModel.author && formatUserFullName(props.composeModel?.author) }}дан</div>
      </div>
    </div>

    <div class="flex justify-center text-base font-bold my-8">
      АРИЗА
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <base-signers-template :signers="props.composeModel?.signers" />

    <div class="flex flex-col my-4 text-xs font-light">
      <span><span class="font-medium">Ijrochi:</span> {{ props.composeModel?.author && formatUserFullName(props.composeModel?.author) }}</span>
      <span><span class="font-medium">Tel:</span> +99899 777 77 77 (1234)</span>
      <span>
        <span class="font-medium">Kiritildi:</span>
        {{ props.composeModel?.created_date && formatDateHour(props.composeModel.created_date) + '&nbsp' }}
        <template v-if="props.composeModel?.is_signed">
          <span class="font-medium">Imzolandi:</span>
          {{ props.composeModel?.modified_date && formatDateHour(props.composeModel.modified_date) }}
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
