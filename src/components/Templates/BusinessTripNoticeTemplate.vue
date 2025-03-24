<script setup>
// Core
import {computed} from "vue"
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate"
import { formatUserFullName, returnFirstLetter } from "@/utils"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Enums
import {SIGNER_TYPES} from "@/enums"
// Components
import QrcodeVue from "qrcode.vue"
import {
  BaseDepartmentName,
  BaseHeaderTemplate,
  BasePerformer,
  BaseSignersTemplate
} from "@/components/Templates/components"

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

const notices = computed(() => {
  if (props.preview) {
    return props.composeModel?.__employees.map(item => ({
      empFullName: item.full_name,
      empDepName: item.top_level_department?.name,
      empPositionName: item.position?.name,
      destinations: props.composeModel?.__companies,
      startDate: props.composeModel?.start_date,
      endDate: props.composeModel?.end_date
    }))
  }
  else {
    return props.composeModel?.notices?.map(item => ({
      empFullName: item.user?.full_name,
      empDepName: item.user?.top_level_department?.name,
      empPositionName: item.user?.position?.name,
      destinations: item.destinations,
      startDate: item.start_date,
      endDate: item.end_date
    }))
  }
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER)
})

const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
</script>

<template>
  <div class="business-trip-notice-template-view letter-template">

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
            <span v-for="(performer, index) in curator.performers">{{ performer && performer.first_name && returnFirstLetter(performer.first_name) }}. {{ performer.last_name }}<span v-if="index !== curator.performers.length - 1">, &nbsp;</span></span>
          </div>
        </template>
      </div>
      <div class="flex flex-col items-end text-sm font-semibold text-right my-4">
        <span>{{ curator?.position?.name }}</span>
        <span>{{ returnFirstLetter(curator?.first_name) }}. {{ curator?.last_name }}ga</span>
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

    <div class="employees-table text-sm mt-4">
      <table class="w-full">
        <tr class="text-center">
          <td class="border-2 p-1">№</td>
          <td class="border-2 p-1">F.I.SH</td>
          <td class="border-2 p-1">Departament va lavozim</td>
          <td class="border-2 p-1">Yo'nalish</td>
          <td class="border-2 p-1">Xizmat sanasi</td>
        </tr>

        <tr
          v-if="notices && notices.length"
          v-for="(item, index) in notices"
          class="text-center"
        >
          <td class="border-2 p-1">{{ index + 1 }}</td>
          <td class="border-2 p-1">{{ item.empFullName }}</td>
          <td class="border-2 p-1">{{ item.empDepName }} <br> {{ item.empPositionName }}</td>
          <td class="border-2 p-1">
            <div class="flex flex-col gap-y-1">
              <span
                v-for="(destination, index) in item.destinations"
              >
                {{ destination.name }}<span v-if="index !== item.destinations.length - 1">,</span>
              </span>
            </div>
          </td>
          <td class="border-2 p-1 w-[100px]">{{ item.startDate }} <br> {{ item.endDate }} </td>
        </tr>
      </table>
    </div>

    <base-signers-template :signers="signers" />

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />
  </div>
</template>

<style scoped>

</style>
