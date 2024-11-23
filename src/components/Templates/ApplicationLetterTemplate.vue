<script setup>
// Core
import { computed } from "vue"
// Utils
import { formatUserFullName, hostName } from "@/utils"
import { formatDateHour } from "@/utils/formatDate"
// Components
import { BasePerformer, BaseSignersTemplate } from "@/components/Templates/components"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
import { useAuthStore } from "@/modules/Auth/stores"

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})
// Composable
const SDStore = useSDStore()

// Computed
const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
</script>

<template>
  <div class="application-letter-template letter-template">
    <div class="flex justify-end">
      <div class="flex flex-col items-end" style="width: 70%;">
        <div class="text-sm font-bold text-end"> {{ hostName() === 'vercel' ? '"Hamkorbank" ATB' : '“O‘zsanoatqurilishbank” ATB' }}</div>
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

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
