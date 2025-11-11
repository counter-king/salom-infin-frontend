<script setup>
// Core
import { computed } from "vue"
// Enums
import { SIGNER_TYPES } from "@/enums"
import { formatUserFullName, formatUzbekDate } from "@/utils"
import QrcodeVue from "qrcode.vue"
// Store
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
import { useAuthStore } from "@/modules/Auth/stores"
import { BasePerformer } from "@/components/Templates/components";

// Props
const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {
    },
    required: true
  },
  preview: {
    type: Boolean,
    default: false,
  }
})

// Composable
const SDStore = useSDStore()

// Computed
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
  return props.preview ? props.composeModel?.__signers.filter(item => item.id !== useAuthStore()?.currentUser?.id) : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER && item?.user?.id !== props.composeModel?.author?.id).map(item => ({
    ...item.user,
    ...item
  }))
})
const author = computed(() => {
  if (props.preview) {
    return useAuthStore().currentUser
  }
  const signer = props.composeModel?.signers.find(
    item => item?.user?.id === props.composeModel?.author?.id
  )
  return signer ? {...signer.user, ...signer} : null
})
</script>

<template>
  <div class="act-template letter-template">
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
            {{ curator && formatUserFullName(curator) }}
          </div>
        </template>
      </div>

      <div class="flex flex-col items-end text-sm font-semibold text-right">
        <div class="flex flex-col items-end">
          <div class="text-sm font-bold text-end">“TАSDIQLАYMАN”</div>
          <div class="text-sm font-bold text-end">
            Markaziy Bank
          </div>
          <div class="text-sm font-bold text-end">{{ curator?.position?.name }}</div>
          <div class="text-sm font-bold text-end">
            {{ curator && formatUserFullName(curator) }}ga
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm text-center mt-4">
      Haq evaziga xizmat koʼrsatish shartnomasi boʼyicha amalga oshirilgan ishlar toʼgʼrisida
    </div>

    <div class="text-sm font-semibold text-center mt-2">DALOLATNOMA № {{ composeModel?.register_number || '__' }}</div>

    <div class="flex justify-between my-4 text-sm">
      <div>{{ preview ? author?.company?.region?.name : author?.company_region_name }}</div>
      <div>
        <span v-if="composeModel?.register_date">
          {{ formatUzbekDate(composeModel.register_date) }}
        </span>
        <span v-else>
          “___” __________ _______ yil
        </span>
      </div>
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="composeModel?.content"></div>

    <div class="text-sm my-2">
      Taraflar mazkur dalolatnoma yuzasidan eʼtiroz bildirmasliklarini tasdiqlaydilar.
    </div>

    <table class="text-sm w-full">
      <tr>
        <th class="font-semibold text-center w-1/2">Amalga oshirilgan ishlarni qabul qildi:</th>
        <th class="font-semibold text-center w-1/2">Amalga oshirdi:</th>
      </tr>
      <tr
        v-for="(signer, index) in signers"
      >
        <td>
          <div class="font-semibold">
            {{ signer?.top_level_department?.name }} - {{ signer?.position?.name }}
          </div>
          <div>
            {{ formatUserFullName(signer) }}
          </div>
          <div class="my-1">
            <qrcode-vue
              v-if="signer?.is_signed"
              :value="'Salom'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </div>
        </td>

        <td v-if="index === 0" :rowspan="signers.length" class="align-top">
          <div class="font-semibold">Ijrochi</div>
          <div>{{ formatUserFullName(author) }}</div>
          <div class="my-1">
            <qrcode-vue
              v-if="author?.is_signed"
              :value="'Salom'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </div>
        </td>
      </tr>
    </table>

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
