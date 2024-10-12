<script setup>
// Core
import { computed } from "vue";
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate";
import { formatUserFullName } from "@/utils";
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import QrcodeVue from "qrcode.vue"
import { BaseHeaderTemplate, BasePerformer, BaseSignersTemplate } from "@/components/Templates/components"


const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const receivers = computed(() => {
  return (
    props.composeModel?.receiver?.departments ||
    props.composeModel?.receiver?.organizations ||
    props.composeModel?.receiver?.companies ||
    []
  ).flat();
})

const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})

const SDStore = useSDStore()
</script>

<template>
  <div class="inner-letter-template">
<!--    <pre>{{ composeModel }}</pre>-->
    <base-header-template />

    <div class="w-full rounded-[6px] bg-greyscale-50 text-sm font-semibold px-3 py-1" style="color: #003D64">
      {{ author.top_level_department.name }}
    </div>

    <div class="flex flex-col text-sm font-medium gap-x-2 mt-4">
      <span> № {{ props.composeModel?.register_number }}</span>
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
    </div>

    <div class="flex flex-col items-end text-sm font-semibold text-right gap-y-1 my-4">
      <div class="max-w-[300px]" v-for="receiver in receivers" :key="receiver.id">
        {{ receiver.name }}
      </div>
    </div>

    <div class="flex w-full justify-center text-center text-sm font-semibold my-5">
      XIZMAT YOZISHMASI
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
