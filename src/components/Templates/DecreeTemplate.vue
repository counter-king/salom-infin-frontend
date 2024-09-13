<script setup>
// Core
import { computed } from "vue"
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate"
import { formatUserFullName } from "@/utils"
// Enums
import { SIGNER_TYPES } from "@/enums"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import QrcodeVue from "qrcode.vue"
import { BaseHeaderTemplate, BasePerformer } from "@/components/Templates/components"

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

const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})

const curators = computed(() => {
  if (props.preview) {
    return [props.composeModel?.__curator]
  }
  const basicSigner = props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return basicSigner ? [basicSigner] : [props.composeModel?.curator].filter(Boolean)
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER)
})
</script>

<template>
  <div class="decree-template-view">

    <base-header-template />

    <div class="flex flex-col text-sm font-medium mt-4">
      <span> № {{ props.composeModel?.register_number }}</span>
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
    </div>

    <div class="flex w-full justify-center text-base font-bold my-5">
      FARMOYISH
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <div class="mt-6 pb-2 px-4">
      <template v-for="item in curators" :key="item.id">
        <base-row class="mb-2 items-center">
          <base-col col-class="w-1/2">
            <span class="text-sm font-semibold block">{{ item.user ? item.user.position.name : item.position.name }}</span>
          </base-col>

          <base-col col-class="w-1/4">
            <qrcode-vue
              v-if="item.is_signed"
              :value="'Work Zone'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </base-col>

          <base-col col-class="w-1/4">
            <span class="text-sm font-semibold block">{{ formatUserFullName(item) }}</span>
          </base-col>
        </base-row>
      </template>

      <template v-for="item in signers" :key="item.id">
        <base-row class="mb-2 items-center">
          <base-col col-class="w-1/2">
            <span class="text-sm font-semibold block">{{ item.user ? item.user.position.name : item.position.name }}</span>
          </base-col>

          <base-col col-class="w-1/4">
            <qrcode-vue
              v-if="item.is_signed"
              :value="'Work Zone'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </base-col>

          <base-col col-class="w-1/4">
            <span class="text-sm font-semibold block">{{ formatUserFullName(item) }}</span>
          </base-col>
        </base-row>
      </template>
    </div>

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
