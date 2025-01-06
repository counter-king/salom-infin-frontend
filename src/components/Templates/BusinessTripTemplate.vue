<script setup>
// Core
import { computed } from "vue"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Utils
import { formatDate } from "@/utils/formatDate"
import {
  returnBTClass,
  returnBTDateTimeToISO,
  returnBTDepartureTime,
  returnBTRoute, returnBTRouteType
} from "@/modules/Documents/modules/SendDocuments/utils"
// Enums
import { SIGNER_TYPES } from "@/enums"
// Components
import {
  BaseBusinessTripTables,
  BaseDepartmentName,
  BaseHeaderTemplate,
  BasePerformer,
  BaseSignersTemplate
} from "@/components/Templates/components"
import QrcodeVue from "qrcode.vue"

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

// Composable
const SDStore = useSDStore()

// Computed
const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
const curator = computed(() => {
  let basicSigner = props.composeModel && props.composeModel.signers && props.composeModel.signers.length && props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return  props.preview ?
    props.composeModel.__curator :
    {
      ...props.composeModel.curator,
      is_signed: basicSigner ? basicSigner.is_signed : null,
      performers: basicSigner ? basicSigner.performers : null
    }
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER)
})
</script>

<template>
  <div class="business-trip-v2-template letter-template">
    <base-header-template />

    <base-department-name
      :dep-name="author?.top_level_department?.name"
    />

    <div class="flex flex-col text-sm font-medium mt-4">
      <span> № {{ props.composeModel?.register_number }}</span>
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
    </div>

    <div class="flex w-full items-center justify-between mt-1">
      <div class="flex flex-col">
        <template v-if="curator && curator.is_signed && curator.performers">
          <qrcode-vue
            :value="'Work Zone'"
            :size="50"
            level="L"
            render-as="svg"
          />
          <div class="text-sm mt-1">
            <span class="font-bold">Topshiriq: </span>
            <span v-for="(performer, index) in curator.performers">{{ performer && performer.first_name && performer.first_name[0] }}. {{ performer.last_name }}<span v-if="index !== curator.performers.length - 1">, &nbsp;</span></span>
          </div>
        </template>
      </div>
      <div class="flex flex-col items-end text-sm font-semibold text-right my-4">
        <span>{{ curator?.position?.name }}</span>
        <span>{{ curator?.first_name[0] }}. {{ curator?.last_name }}ga</span>
      </div>
    </div>

    <div class="flex w-full justify-center text-base font-bold my-5">
      BILDIRISHNOMA
    </div>

    <div class="text-sm italic text-justify my-4 indent-8">
      Qisqacha mazmuni: {{ props.composeModel?.short_description }}
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <base-business-trip-tables :compose-model="composeModel" :preview="preview" />

    <base-signers-template :signers="signers" />

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />

<!--    <pre>{{ composeModel }}</pre>-->
  </div>
</template>

<style scoped>

</style>
