<script setup>
// Core
import { computed } from "vue";
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate";
import { formatUserFullName } from "@/utils";
// Store
import {useAuthStore} from "@/modules/Auth/stores"
// Components
import QrcodeVue from "qrcode.vue";


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
</script>

<template>
  <div class="inner-letter-template">
<!--    <pre>{{ composeModel }}</pre>-->
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

    <div class="text-justify" v-html="props.composeModel?.content"></div>

    <div class="mt-6 pb-2 px-4">
      <template v-for="item in props.composeModel?.signers" :key="item.id">
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
