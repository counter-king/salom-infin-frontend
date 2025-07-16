<script setup>
// Core
import { computed } from "vue"
// Utils
import { formatUserFullName, hostName, returnFirstLetter } from "@/utils"
import { formatDateHour } from "@/utils/formatDate"
// Components
import { BasePerformer, BaseSignersTemplate } from "@/components/Templates/components"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
import { useAuthStore } from "@/modules/Auth/stores"
import { useRoute } from "vue-router";
import { COMPOSE_DOCUMENT_SUB_TYPES, SIGNER_TYPES } from "../../enums";
import QrcodeVue from "qrcode.vue";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  },
  preview: {
    type: Boolean,
    default: false,
  }
})
// Composable
const SDStore = useSDStore()
const route = useRoute()

// Computed
const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
const curator = computed(() => {
  let basicSigner = props.composeModel && props.composeModel.signers && props.composeModel.signers.length && props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return props.preview ?
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
  <div class="application-letter-template letter-template">
    <div class="flex w-full justify-between mt-1">
      <div class="flex flex-col">
        <template v-if="curator && curator.is_signed && curator.performers">
          <div class="text-sm mb-1 font-bold">
            {{ curator?.position?.name }}
          </div>
          <qrcode-vue
            :value="'Work Zone'"
            :size="50"
            level="L"
            render-as="svg"
            class="ml-1"
          />
          <div class="text-sm mt-1 font-bold">
            {{ curator && formatUserFullName(props.composeModel?.curator) }}
          </div>
        </template>
      </div>
      <div class="flex flex-col items-end text-sm font-semibold text-right">
        <div class="flex flex-col items-end">
          <div class="text-sm font-bold text-end">
            {{ hostName() === 'vercel' ? '"Hamkorbank" ATB' : '“O‘zsanoatqurilishbank” ATB' }}
          </div>
          <div class="text-sm font-bold text-end">{{ curator?.position?.name }}</div>
          <div class="text-sm font-bold text-end">
            {{ curator && formatUserFullName(props.composeModel?.curator) }}ga
          </div>
          <div class="text-sm font-bold text-end">{{ author?.top_level_department?.name }}</div>
          <div class="text-sm font-bold text-end">{{ author?.position?.name }}</div>
          <div class="text-sm font-bold text-end">{{ author && formatUserFullName(author) }}dan</div>
        </div>
      </div>
    </div>


    <div class="flex justify-end">

    </div>

    <div class="flex justify-center text-base font-bold my-8">
      {{ route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.EXPLANATION_LETTER ? 'Tushuntirish xati' : 'ARIZA' }}
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <base-signers-template :signers="signers" />

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
