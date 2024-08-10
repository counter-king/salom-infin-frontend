<script setup>
// Core
import {computed} from "vue"
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate"
import {formatUserFullName} from "@/utils"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
// Components
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

const curator = computed(() => {
  let basicSigner = props.composeModel && props.composeModel.signers && props.composeModel.signers.length && props.composeModel?.signers.find(item => item.type === 'basic_signer')
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
      empDepName: item.top_level_department.name,
      empPositionName: item.position.name,
      destinations: props.composeModel.__companies,
      startDate: props.composeModel.start_date,
      endDate: props.composeModel.end_date
    }))
  }
  else {
    return props.composeModel?.notices?.map(item => ({
      empFullName: item.user.full_name,
      empDepName: item.user.top_level_department.name,
      empPositionName: item.user.position.name,
      destinations: item.destinations,
      startDate: item.start_date,
      endDate: item.end_date
    }))
  }
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === 'signer')
})

const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
</script>

<template>
  <div class="business-trip-notice-template-view">
    <div class="mb-[10px]">
      <div class="flex">
        <img src="@/assets/img/sqb_logo.png" alt="Logo" class="w-[114px] h-full" />
        <div class="ml-2">
          <div class="text-[8px] font-bold">"O'ZBEKISTON SANOAT-QURILISH BANKI" AKSIYADORLIK TIJORAT BANKI</div>
          <div class="text-[8px] font-bold mt-[2px]">АКЦИОНЕРНЫЙ КОММЕРЧЕСКИЙ БАНК "УЗБЕКСКИЙ ПРОМЫШЛЕННО-СТРОИТЕЛЬНЫЙ БАНК"</div>
        </div>
      </div>
    </div>

    <div class="w-full rounded-[6px] bg-greyscale-50 text-sm font-semibold px-3 py-1" style="color: #003D64">
      {{ author?.top_level_department.name }}
    </div>

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

    <div class="text-justify mt-4" v-html="props.composeModel?.content"></div>

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
                {{ destination.name }} <span v-if="index !== item.destinations.length - 1">,</span>
              </span>
            </div>
          </td>
          <td class="border-2 p-1 w-[100px]">{{ item.startDate }} <br> {{ item.endDate }} </td>
        </tr>
      </table>
    </div>

    <div class="mt-6 pb-2 px-4">
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

    <div class="flex flex-col my-4 text-xs font-light">
      <span><span class="font-medium">Ijrochi:</span> {{ formatUserFullName(author) }}</span>
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
